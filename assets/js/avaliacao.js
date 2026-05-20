const avaliacaoEstrela = document.getElementById('avaliacaoEstrela');
const mensagemAvalicacao = document.getElementById('avaliacaoMensagem');
let selecionado = 0;
const mensagens = ['Perfeito! Muito obrigado pela nota máxima!',
                    'Ótimo! O que faria ser 5 estrelas?', 
                    'O que podemos fazer melhor?', 
                    'Lamentamos muito. O que podemos fazer para melhorar?' ]

for (let i = 1; i <= 5; i++) {
  const btn = document.createElement('button');
  btn.className = 'avaliacaoBotao';
  btn.textContent = '★';
  btn.setAttribute('aria-label', 'Nota ' + i);

  const n = i;
  btn.addEventListener('mouseenter', () => colorirBotao(n));
  btn.addEventListener('mouseleave', () => colorirBotao(selecionado));
  btn.addEventListener('click', () => {
    selecionado = n;
    colorirBotao(n);
    if (n === 5) {
      mensagemAvalicacao.textContent = mensagens[0];
    } else if (n >= 3) {
      mensagemAvalicacao.textContent = mensagens[1];
    } else if (n >= 2) {
      mensagemAvalicacao.textContent = mensagens[2];
    } else {
      mensagemAvalicacao.textContent = mensagens[3];
    }
  });

  avaliacaoEstrela.appendChild(btn);
}

function colorirBotao(n) {
  avaliacaoEstrela.querySelectorAll('.avaliacaoBotao').forEach((s, idx) => {
    s.classList.toggle('on', idx < n);
  });
}