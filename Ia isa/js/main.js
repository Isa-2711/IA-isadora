import { aleatorio } from './aleatorio.js';
import { perguntas } from './perguntas.js';

document.addEventListener('DOMContentLoaded', () => {
    const telaInicial = document.querySelector('.tela-inicial');
    const jogo = document.querySelector('.jogo');
    const caixaPerguntas = document.querySelector('.caixa-perguntas');
    const caixaAlternativas = document.querySelector('.caixa-alternativas');
    const caixaResultado = document.querySelector('.caixa-resultado');
    const textoResultado = document.querySelector('.texto-resultado');
    const progresso = document.querySelector('.progresso');

    const botaoIniciar = document.querySelector('.botao-iniciar');
    const botaoNovamente = document.querySelector('.novamente-btn');

    const nomes = ['Gabriel', 'Letícia', 'Lucas', 'Ana', 'Rafael', 'Marina'];

    let atual = 0;
    let nomeJogador = '';
    let historiaFinal = '';
    let perguntasPartida = [];
    let respondendo = false;

    function embaralhar(lista) {
        const copia = [...lista];
        for (let i = copia.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [copia[i], copia[j]] = [copia[j], copia[i]];
        }
        return copia;
    }

    function iniciarJogo() {
        atual = 0;
        historiaFinal = '';
        respondendo = false;

        nomeJogador = aleatorio(nomes);
        perguntasPartida = embaralhar(perguntas);

        telaInicial.hidden = true;
        caixaResultado.hidden = true;
        jogo.hidden = false;

        mostrarPergunta();
    }

    function mostrarPergunta() {
        if (atual >= perguntasPartida.length) {
            mostrarResultado();
            return;
        }

        respondendo = false;
        const pergunta = perguntasPartida[atual];

        progresso.textContent = `Pergunta ${atual + 1} de ${perguntasPartida.length}`;
        caixaPerguntas.textContent = pergunta.enunciado.replace(/NOME/g, nomeJogador);
        caixaAlternativas.replaceChildren();

        pergunta.alternativas.forEach(alternativa => {
            const botao = document.createElement('button');
            botao.type = 'button';
            botao.textContent = alternativa.texto;

            botao.addEventListener('click', () => {
                responderPergunta(alternativa);
            });

            caixaAlternativas.appendChild(botao);
        });
    }

    function responderPergunta(alternativa) {
        if (respondendo) return;
        respondendo = true;

        caixaAlternativas.querySelectorAll('button').forEach(botao => {
            botao.disabled = true;
        });

        const afirmacao = aleatorio(alternativa.afirmacao);
        historiaFinal += afirmacao.replace(/NOME/g, nomeJogador) + ' ';

        atual++;
        mostrarPergunta();
    }

    function mostrarResultado() {
        jogo.hidden = true;
        caixaResultado.hidden = false;
        textoResultado.textContent = `${nomeJogador}, em 2049... ${historiaFinal.trim()}`;
    }

    if (botaoIniciar) {
        botaoIniciar.addEventListener('click', iniciarJogo);
    }
    if (botaoNovamente) {
        botaoNovamente.addEventListener('click', iniciarJogo);
    }

    console.log('Script do jogo carregado com sucesso!');
});