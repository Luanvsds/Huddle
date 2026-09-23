const JOGOS_PERMITIDOS = [
  "The Legend of Zelda",
  "Valorant",
  "League of Legends",
  "God of War"
];

// Ordem de fallback: do melhor modelo disponível até o Flash Lite (500 RPD)
const MODELOS_EM_ORDEM = [
  "gemini-3.5-flash-lite",
  "gemini-3.8-flash",
  "gemini-3.7-flash",
  "gemini-3.6-flash",
  "gemini-3.5-flash",
];

const QUANTIDADE_PERFIS = 4;
const MINIMO_HUDDLE_RECIPROCO = 2;


const schema = {
  type: "array",
  minItems: QUANTIDADE_PERFIS,
  maxItems: QUANTIDADE_PERFIS,
  items: {
    type: "object",
    properties: {
      nome: { type: "string" },
      jogo: { type: "string", enum: JOGOS_PERMITIDOS },
      microfone: { type: "string", enum: ["Disponível", "Indisponível"] },
      gameplay: { type: "string", enum: ["Tryhard", "Gamer", "Competitivo", "Casual"] },
      horario: { type: "string", enum: ["Manhã", "Tarde", "Noite", "Fins de semana"] },
      plataforma: { type: "string", enum: ["PC", "Console", "Mobile"] },
      idioma: { type: "string", enum: ["PT", "EN", "ES"] },
      huddleReciproco: { type: "boolean" },
      mensagemInicial: { type: "string" },
    },
    required: [
      "nome",
      "jogo",
      "microfone",
      "gameplay",
      "horario",
      "plataforma",
      "idioma",
      "huddleReciproco",
      "mensagemInicial",
    ],
  },
};

async function chamarGemini(modelo, payload) {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${modelo}:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }
  );

  if (!response.ok) {
    const erro = await response.json().catch(() => ({}));
    const err = new Error(`Falha no modelo ${modelo}: ${response.status}`);
    err.status = response.status;
    err.detalhe = erro;
    throw err;
  }

  return response.json();
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
      continue;
    }
  }

  throw new Error(`Todos os modelos falharam. Último erro: ${ultimoErro?.message}`);
}


function garantirHuddleMinimo(perfis, minimo = MINIMO_HUDDLE_RECIPROCO) {
  const trues = perfis.filter((p) => p.huddleReciproco === true).length;

  if (trues >= minimo) return perfis;

  let faltam = minimo - trues;
  return perfis.map((p) => {
    if (faltam > 0 && p.huddleReciproco !== true) {
      faltam--;
      return { ...p, huddleReciproco: true };
    }
    return p;
  });
}

function adicionarBanners(perfis) {
  return perfis.map((p) => ({
    ...p,
    banner: `/${p.jogo}.jpg`,
  }));
}

export async function POST(req) {
  const { tema } = await req.json();

  const payload = {
    contents: [
      {
        parts: [
          {
            text: `Gere ${QUANTIDADE_PERFIS} perfis fictícios de jogadores de games,
            todos diferentes entre si (nomes, jogos, gameplay, horário e mensagens variados).
            Contexto: ${tema}.
            IMPORTANTE: no mínimo ${MINIMO_HUDDLE_RECIPROCO} dos ${QUANTIDADE_PERFIS} perfis
            devem ter "huddleReciproco" como true.
            IMPORTANTE2: Os nomes devem ser Nicknames, não nomes de pessoas
            IMPORTANTE3: As mensagens devem ser chamativos EX: Vamos jogar hoje? EX2: Partiu fechar um squad com meu pessoal? Gere de acordo com uma "personalidade", timido, amigável, animado e etc}
            IMPORTANTE4: JAMAIS CITE OUTROS APPS DE CONVERSA! ALÉM DISSO NÃO CITE PESSOAS NO PLURAL, É UMA MENSAGEM PARA OUTRA PESSOA, ENTÃO FALAR "VAMOS GALERA" NÃO FAZ SENTIDO
            IMPORTANTE5: As mensagens devem ser em portugues, independente do idioma do perfil`,
          },
        ],
      },
    ],
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: schema,
    },
  };

  try {
    const { data, } = await gerarComFallback(payload);

    const perfisBrutos = JSON.parse(data.candidates[0].content.parts[0].text);
    const perfisComHuddle = garantirHuddleMinimo(perfisBrutos);
    const perfisFinais = adicionarBanners(perfisComHuddle);

    return Response.json({
      perfis: perfisFinais,
    });
  } catch (err) {
    console.error(err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}