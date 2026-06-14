// =============================================
// QUIZ — ALGORITMOS
// =============================================

const questoes = [
    {
        pergunta: "O que é um algoritmo?",
        opcoes: [
            "Um software de edição de imagens",
            "Uma sequência lógica e finita de instruções para resolver um problema",
            "Um tipo de banco de dados",
            "Uma linguagem de programação"
        ],
        correta: 1
    },
    {
        pergunta: "Qual estrutura de controle é usada para repetir um bloco de código enquanto uma condição for verdadeira?",
        opcoes: [
            "if / else",
            "switch / case",
            "while / for",
            "try / catch"
        ],
        correta: 2
    },
    {
        pergunta: "O que é uma variável em programação?",
        opcoes: [
            "Um valor fixo que nunca muda",
            "Um espaço na memória que armazena um valor que pode mudar",
            "Um tipo de loop infinito",
            "Uma função sem retorno"
        ],
        correta: 1
    },
    {
        pergunta: "Qual é a complexidade de tempo do algoritmo de busca binária?",
        opcoes: [
            "O(n²)",
            "O(n)",
            "O(log n)",
            "O(1)"
        ],
        correta: 2
    },
    {
        pergunta: "O que é uma pilha (stack) em estrutura de dados?",
        opcoes: [
            "Uma estrutura FIFO — o primeiro a entrar é o primeiro a sair",
            "Uma estrutura LIFO — o último a entrar é o primeiro a sair",
            "Uma lista onde qualquer elemento pode ser acessado diretamente",
            "Um tipo de árvore binária"
        ],
        correta: 1
    },
    {
        pergunta: "O que faz o operador MOD (%) em algoritmos?",
        opcoes: [
            "Divide dois números e retorna o quociente inteiro",
            "Multiplica dois números",
            "Retorna o resto da divisão entre dois números",
            "Eleva um número a uma potência"
        ],
        correta: 2
    },
    {
        pergunta: "Qual das alternativas representa corretamente um pseudocódigo de repetição?",
        opcoes: [
            "SE x > 0 ENTÃO escreva(x)",
            "PARA i DE 1 ATÉ 10 FAÇA escreva(i)",
            "VARIÁVEL x = 10",
            "FUNÇÃO soma(a, b) retorne a"
        ],
        correta: 1
    },
    {
        pergunta: "O que é recursividade em algoritmos?",
        opcoes: [
            "Um algoritmo que nunca termina",
            "Quando uma função chama a si mesma para resolver subproblemas",
            "Um tipo de estrutura de dados circular",
            "Um método de ordenação de vetores"
        ],
        correta: 1
    },
    {
        pergunta: "Qual algoritmo de ordenação tem complexidade média O(n log n)?",
        opcoes: [
            "Bubble Sort",
            "Selection Sort",
            "Insertion Sort",
            "Merge Sort"
        ],
        correta: 3
    },
    {
        pergunta: "O que é uma fila (queue) em estrutura de dados?",
        opcoes: [
            "Uma estrutura LIFO onde o último entra primeiro",
            "Uma estrutura FIFO onde o primeiro a entrar é o primeiro a sair",
            "Uma árvore com nós conectados",
            "Um vetor de tamanho fixo"
        ],
        correta: 1
    }
];

// ---- ESTADO ----
let currentQuestion = 0;
let score = 0;
let timerInterval = null;
let timeLeft = 20;
let answered = false;

// ---- ELEMENTOS ----
const screenStart  = document.getElementById('screen-start');
const screenQuiz   = document.getElementById('screen-quiz');
const screenResult = document.getElementById('screen-result');

const btnStart   = document.getElementById('btn-start-algo');
const btnRetry   = document.getElementById('btn-retry-algo');

const questionCounter = document.getElementById('question-counter');
const scoreDisplay    = document.getElementById('score-display');
const progressBar     = document.getElementById('progress-bar');
const questionText    = document.getElementById('question-text');
const optionsGrid     = document.getElementById('options-grid');
const feedbackBox     = document.getElementById('feedback-box');
const feedbackIcon    = document.getElementById('feedback-icon');
const feedbackText    = document.getElementById('feedback-text');
const timerText       = document.getElementById('timer-text');
const timerSvg        = document.getElementById('timer-svg');

const finalScore    = document.getElementById('final-score');
const resultTitle   = document.getElementById('result-title');
const resultSubtitle= document.getElementById('result-subtitle');
const scoreStars    = document.getElementById('score-stars');
const scoreMessage  = document.getElementById('score-message');
const resultIcon    = document.getElementById('result-icon');

// ---- FUNÇÕES ----
function showScreen(screen) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    screen.classList.add('active');
}

function startQuiz() {
    currentQuestion = 0;
    score = 0;
    showScreen(screenQuiz);
    renderQuestion();
}

function renderQuestion() {
    answered = false;
    const q = questoes[currentQuestion];
    const total = questoes.length;

    questionCounter.textContent = `Questão ${currentQuestion + 1}/${total}`;
    scoreDisplay.innerHTML = `<i class="fas fa-star"></i> ${score} pts`;
    progressBar.style.width = `${(currentQuestion / total) * 100}%`;
    questionText.textContent = q.pergunta;

    feedbackBox.className = 'feedback-box hidden';

    optionsGrid.innerHTML = '';
    q.opcoes.forEach((opcao, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = opcao;
        btn.addEventListener('click', () => selectAnswer(index, btn));
        optionsGrid.appendChild(btn);
    });

    startTimer();
}

function startTimer() {
    clearInterval(timerInterval);
    timeLeft = 20;
    updateTimerUI();

    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerUI();

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            if (!answered) timeOut();
        }
    }, 1000);
}

function updateTimerUI() {
    timerText.textContent = timeLeft;
    const circumference = 276.46;
    const offset = circumference - (timeLeft / 20) * circumference;
    timerSvg.style.strokeDashoffset = offset;

    timerSvg.classList.remove('warning', 'danger');
    if (timeLeft <= 5)       timerSvg.classList.add('danger');
    else if (timeLeft <= 10) timerSvg.classList.add('warning');
}

function selectAnswer(index, btn) {
    if (answered) return;
    answered = true;
    clearInterval(timerInterval);

    const correta = questoes[currentQuestion].correta;
    const allBtns = optionsGrid.querySelectorAll('.option-btn');
    allBtns.forEach(b => b.disabled = true);

    if (index === correta) {
        btn.classList.add('correct');
        score += 10;
        showFeedback(true, '✅ Correto! +10 pontos');
    } else {
        btn.classList.add('wrong');
        allBtns[correta].classList.add('correct');
        showFeedback(false, `❌ Errado! A resposta era: "${questoes[currentQuestion].opcoes[correta]}"`);
    }

    setTimeout(nextQuestion, 2000);
}

function timeOut() {
    answered = true;
    const correta = questoes[currentQuestion].correta;
    const allBtns = optionsGrid.querySelectorAll('.option-btn');
    allBtns.forEach(b => b.disabled = true);
    allBtns[correta].classList.add('correct');
    showFeedback(false, `⏱️ Tempo esgotado! A resposta era: "${questoes[currentQuestion].opcoes[correta]}"`);
    setTimeout(nextQuestion, 2200);
}

function showFeedback(isCorrect, message) {
    feedbackBox.className = `feedback-box ${isCorrect ? 'correct-fb' : 'wrong-fb'}`;
    feedbackText.textContent = message;
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questoes.length) {
        renderQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    showScreen(screenResult);
    finalScore.textContent = score;
    progressBar.style.width = '100%';

    const percent = (score / 100) * 100;
    let stars = '⭐⭐⭐⭐⭐';
    let title = 'Mestre dos Algoritmos! 🏆';
    let subtitle = 'Você domina a lógica computacional!';
    let emoji = '🏆';
    let msg = 'Incrível! Sua lógica de programação é impecável!';

    if (percent < 30) {
        stars = '⭐';
        title = 'Continue Praticando!';
        subtitle = 'A lógica computacional precisa de mais estudo.';
        emoji = '📚';
        msg = 'Revise os conceitos de algoritmos e tente novamente!';
    } else if (percent < 60) {
        stars = '⭐⭐⭐';
        title = 'Bom Começo!';
        subtitle = 'Você está no caminho certo!';
        emoji = '💡';
        msg = 'Continue estudando os fundamentos de algoritmos!';
    } else if (percent < 90) {
        stars = '⭐⭐⭐⭐';
        title = 'Muito Bom!';
        subtitle = 'Você entende bem de algoritmos!';
        emoji = '🚀';
        msg = 'Quase perfeito! Revise os pontos que errou.';
    }

    resultTitle.textContent = title;
    resultSubtitle.textContent = subtitle;
    resultIcon.textContent = emoji;
    scoreStars.textContent = stars;
    scoreMessage.textContent = msg;
}

// ---- EVENTOS ----
btnStart.addEventListener('click', startQuiz);
btnRetry.addEventListener('click', startQuiz);
