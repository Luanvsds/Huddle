import { HUDDLE_SYSTEM_INSTRUCTION } from "./constituicao";

const MODELOS_EM_ORDEM = [
  "gemini-3.5-flash-lite",
  "gemini-3.8-flash",
  "gemini-3.7-flash",
  "gemini-3.6-flash",
  "gemini-3.5-flash",
];

const TAMANHO_MAXIMO_MENSAGEM = 500;
const LIMITE_POR_MINUTO = 10;
const historicoDeChamadas = new Map();

function validarMensagem(mensagem) {
  if (typeof mensagem !== "string") return false;
  const limpa = mensagem.trim();
  return limpa.length > 0 && limpa.length <= TAMANHO_MAXIMO_MENSAGEM;
}

function excedeuLimite(identificador) {
  const agora = Date.now();
  const chamadas = historicoDeChamadas.get(identificador) ?? [];
  const chamadasRecentes = chamadas.filter((t) => agora - t < 60_000);
  if (chamadasRecentes.length >= LIMITE_POR_MINUTO) return true;
  chamadasRecentes.push(agora);
  historicoDeChamadas.set(identificador, chamadasRecentes);
  return false;
}

// ===== MOCK DE BLOQUEIO DE SAFETY (só para demonstração/teste) =====
// Ative com a variável de ambiente MOCK_SAFETY_BLOCK=true no .env.local
function respostaBloqueadaSimulada() {
  return {
    promptFeedback: {
      blockReason: "SAFETY",
      safetyRatings: [
        { category: "HARM_CATEGORY_HARASSMENT", probability: "HIGH" },
      ],
    },
    candidates: [],
  };
}

async function chamarGemini(modelo, payload, timeoutMs = 120000) {
  // ---- MOCK: intercepta antes de qualquer chamada real ----
  if (process.env.MOCK_SAFETY_BLOCK === "true") {
    const data = respostaBloqueadaSimulada();

    const motivoBloqueioPrompt = data.promptFeedback?.blockReason;
    if (motivoBloqueioPrompt) {
      const err = new Error(`Prompt bloqueado pelo modelo ${modelo}: ${motivoBloqueioPrompt}`);
      err.status = 422;
      err.tipo = "BLOQUEIO_SAFETY";
      err.motivo = motivoBloqueioPrompt;
      throw err;
    }

    return data;
  }
  // ---- fim do mock ----

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  let response;
  try {
    response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${modelo}:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      }
    );
  } catch (err) {
    if (err.name === "AbortError") {
      const timeoutErr = new Error(`Timeout no modelo ${modelo} após ${timeoutMs}ms`);
      timeoutErr.status = 408;
      timeoutErr.tipo = "TIMEOUT";
      throw timeoutErr;
    }
    throw err;
  } finally {
    clearTimeout(timeout);
  }

  if (!response.ok) {
    const erro = await response.json().catch(() => ({}));
    const err = new Error(`Falha no modelo ${modelo}: ${response.status}`);
    err.status = response.status;
    err.detalhe = erro;
    throw err;
  }

  const data = await response.json();

  const motivoBloqueioPrompt = data.promptFeedback?.blockReason;
  if (motivoBloqueioPrompt) {
    const err = new Error(`Prompt bloqueado pelo modelo ${modelo}: ${motivoBloqueioPrompt}`);
    err.status = 422;
    err.tipo = "BLOQUEIO_SAFETY";
    err.motivo = motivoBloqueioPrompt;
    throw err;
  }

  const finishReason = data.candidates?.[0]?.finishReason;
  if (finishReason === "SAFETY" || finishReason === "RECITATION") {
    const err = new Error(`Resposta bloqueada pelo modelo ${modelo}: ${finishReason}`);
    err.status = 422;
    err.tipo = "BLOQUEIO_SAFETY";
    err.motivo = finishReason;
    throw err;
  }

  return data;
}

async function gerarComFallback(payload) {
  let ultimoErro = null;

  for (const modelo of MODELOS_EM_ORDEM) {
    try {
      const data = await chamarGemini(modelo, payload);
      console.log(`✅ Sucesso com ${modelo}`);
      return { data, modeloUsado: modelo };
    } catch (err) {
      ultimoErro = err;
      console.warn(`⚠️ ${modelo} falhou (status ${err.status})`);
      console.warn(JSON.stringify(err.detalhe, null, 2));

      if (err.tipo === "BLOQUEIO_SAFETY") {
        throw err;
      }

      continue;
    }
  }

  throw Error(`Todos os modelos falharam. Último erro: ${ultimoErro?.message}`);
}

export async function POST(req) {
  const identificador =
    req.headers.get("x-forwarded-for") ?? "anonimo";

  if (excedeuLimite(identificador)) {
    return Response.json(
      {
        error: "Muitas mensagens em pouco tempo.",
        retryAfter: 60
      },
      {
        status: 429
      }
    );
  }

  const { message } = await req.json();

  if (!validarMensagem(message)) {
    return Response.json(
      { error: "Mensagem inválida." },
      { status: 400 }
    );
  }

  const payload = {
    systemInstruction: { parts: [{ text: HUDDLE_SYSTEM_INSTRUCTION }] },
    contents: [
      {
        role: "user",
        parts: [
          {
            text: message.trim()
          }
        ]
      }
    ],
    safetySettings: [
      { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
      { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
      { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
      { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
    ],
    generationConfig: { maxOutputTokens: 1024, temperature: 0.3 },
  };

  try {
    const { data } = await gerarComFallback(payload);

    return Response.json({
      reply:
        data.candidates?.[0]?.content?.parts
          ?.map(part => part.text || "")
          .join("") ?? ""
    });

  } catch (err) {
    console.error(err);

    if (err.tipo === "BLOQUEIO_SAFETY") {
      return Response.json(
        { error: "Seu texto fere nossas cláusulas de segurança." },
        { status: 422 }
      );
    }

    return Response.json({ error: "Erro ao processar sua mensagem." }, { status: 500 });
  }
}