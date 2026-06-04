// =============================================
// QUIZ — ENGENHARIA DE SOFTWARE
// =============================================

const questoes = [
    {
        pergunta: "O que é Engenharia de Software?",
        opcoes: [
            "A construção de hardware para computadores",
            "A aplicação de princípios de engenharia ao desenvolvimento sistemático de software",
            "O estudo exclusivo de linguagens de programação",
            "A manutenção de servidores físicos"
        ],
        correta: 1
    },
    {
        pergunta: "O que é o modelo Cascata (Waterfall) no desenvolvimento de software?",
        opcoes: [
            "Um modelo ágil com sprints semanais",
            "Um modelo sequencial onde cada fase deve ser concluída antes da próxima começar",
            "Um modelo baseado em microsserviços",
            "Uma metodologia de testes automatizados"
        ],
        correta: 1
    },
    {
        pergunta: "O que significa a sigla SCRUM?",
        opcoes: [
            "Sistema Computacional de Redes Unificadas e Modulares",
            "É um framework ágil para gerenciamento e desenvolvimento de software",
            "Software de Controle de Requisitos e Usuários Multiplataforma",
            "Subconjunto de Comandos de Rede Unificados Modulares"
        ],
        correta: 1
    },
    {
        pergunta: "O que é um requisito funcional em Engenharia de Software?",
        opcoes: [
            "Define como o sistema deve ser construído internamente",
            "Descreve o desempenho e a segurança do sistema",
            "Descreve o que o sistema deve fazer — suas funcionalidades e comportamentos",
            "Define os servidores e infraestrutura necessários"
        ],
        correta: 2
    },
    {
        pergunta: "O que é controle de versão (Git)?",
        opcoes: [
            "Uma ferramenta para criar interfaces gráficas",
            "Um sistema que registra alterações no código ao longo do tempo, permitindo colaboração e histórico",
            "Um gerenciador de banco de dados",
            "Um compilador de linguagens de programação"
        ],
        correta: 1
    },
    {
        pergunta: "O que significa TDD (Test-Driven Development)?",
        opcoes: [
            "Desenvolvimento guiado por documentação técnica",
            "Desenvolvimento guiado por testes — os testes são escritos antes do código",
            "Técnica de Deploy Distribuído",
            "Tecnologia de Desenvolvimento em Nuvem"
        ],
        correta: 1
    },
    {
        pergunta: "O que é um diagrama UML?",
        opcoes: [
            "Uma linguagem de programação orientada a objetos",
            "Um tipo de banco de dados relacional",
            "Uma linguagem de modelagem unificada para visualizar o design de um sistema",
            "Um protocolo de comunicação entre servidores"
        ],
        correta: 2
    },
    {
        pergunta: "O que é refatoração (refactoring) de código?",
        opcoes: [
            "Reescrever todo o sistema do zero",
            "Melhorar a estrutura interna do código sem alterar seu comportamento externo",
            "Adicionar novas funcionalidades ao sistema",
            "Compilar o código em diferentes linguagens"
        ],
        correta: 1
    },
    {
        pergunta: "O que é o princípio SOLID?",
        opcoes: [
            "Um banco de dados orientado a documentos",
            "Um conjunto de 5 princípios para tornar o design de software mais compreensível e flexível",
            "Uma metodologia de gerenciamento de projetos",
            "Um protocolo de segurança em redes"
        ],
        correta: 1
    },
    {
        pergunta: "O que é DevOps?",
        opcoes: [
            "Uma linguagem de programação para sistemas operacionais",
            "Um cargo exclusivo de desenvolvedores sênior",
            "Uma cultura que integra desenvolvimento e operações para entregar software com mais velocidade e qualidade",
            "Um framework de desenvolvimento front-end"
        ],
        correta: 2
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

const btnStart = document.getElementById('btn-start-eng');
const btnRetry = document.getElementById('btn-retry-eng');

const questionCounter  = document.getElementById('question-counter');
const scoreDisplay     = document.getElementById('score-display');
const progressBar      = document.getElementById('progress-bar');
const questionText     = document.getElementById('question-text');
const optionsGrid      = document.getElementById('options-grid');
const feedbackBox      = document.getElementById('feedback-box');
const feedbackText     = document.getElementById('feedback-text');
const timerText        = document.getElementById('timer-text');
const timerSvg         = document.getElementById('timer-svg');

const finalScore     = document.getElementById('final-score');
const resultTitle    = document.getElementById('result-title');
const resultSubtitle = document.getElementById('result-subtitle');
const scoreStars     = document.getElementById('score-stars');
const scoreMessage   = document.getElementById('score-message');
const resultIcon     = document.getElementById('result-icon');

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
    let title = 'Engenheiro(a) Expert! 🏆';
    let subtitle = 'Você domina Engenharia de Software!';
    let emoji = '🏆';
    let msg = 'Perfeito! Você tem um excelente domínio sobre boas práticas de software!';

    if (percent < 30) {
        stars = '⭐';
        title = 'Continue Estudando!';
        subtitle = 'A Engenharia de Software tem muito a ensinar!';
        emoji = '📚';
        msg = 'Revise os conceitos fundamentais e tente novamente!';
    } else if (percent < 60) {
        stars = '⭐⭐⭐';
        title = 'Bom Começo!';
        subtitle = 'Você está evoluindo!';
        emoji = '💡';
        msg = 'Continue estudando metodologias e boas práticas!';
    } else if (percent < 90) {
        stars = '⭐⭐⭐⭐';
        title = 'Muito Bom!';
        subtitle = 'Você entende bem de Engenharia de Software!';
        emoji = '🚀';
        msg = 'Quase lá! Revise os pontos que errou para chegar à perfeição!';
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
