const questions = [
    // HARDWARE
    {
        category: "hardware",
        categoryLabel: "🖥️ Hardware",
        question: "Qual componente é considerado o 'cérebro' do computador?",
        options: [
            "HD (Disco Rígido)",
            "Placa-mãe",
            "CPU (Processador)",
            "Memória RAM"
        ],
        correct: 2,
        explanation: "A CPU (Central Processing Unit) é o processador, responsável por executar as instruções e processar dados do computador."
    },
    {
        category: "hardware",
        categoryLabel: "🖥️ Hardware",
        question: "A memória RAM se diferencia do HD porque:",
        options: [
            "É permanente e não perde dados ao desligar",
            "É temporária e volátil, perdendo dados ao desligar",
            "Armazena o sistema operacional",
            "É mais lenta que o HD"
        ],
        correct: 1,
        explanation: "A RAM (Random Access Memory) é volátil, ou seja, armazena dados temporariamente enquanto o computador está ligado."
    },
    {
        category: "hardware",
        categoryLabel: "🖥️ Hardware",
        question: "O que é um SSD?",
        options: [
            "Um tipo de processador mais rápido",
            "Um dispositivo de armazenamento mais rápido que o HD tradicional",
            "Uma memória RAM de alta performance",
            "Um tipo de placa de vídeo"
        ],
        correct: 1,
        explanation: "SSD (Solid State Drive) é um dispositivo de armazenamento sem partes móveis, muito mais rápido e resistente que os HDs tradicionais."
    },

    // SOFTWARE
    {
        category: "software",
        categoryLabel: "💾 Software",
        question: "Qual é a função principal de um sistema operacional?",
        options: [
            "Criar documentos de texto",
            "Gerenciar o hardware e fornecer interface para o usuário",
            "Navegar na internet",
            "Editar fotos e vídeos"
        ],
        correct: 1,
        explanation: "O sistema operacional, como Windows, Linux ou macOS, gerencia recursos do hardware e cria a ponte entre o usuário e a máquina."
    },
    {
        category: "software",
        categoryLabel: "💾 Software",
        question: "Um software de código aberto, também chamado de open source, é aquele que:",
        options: [
            "Custa muito caro para ser licenciado",
            "Tem seu código-fonte disponível para qualquer pessoa estudar e modificar",
            "Só pode ser usado por empresas",
            "Não precisa de instalação"
        ],
        correct: 1,
        explanation: "Software open source tem seu código-fonte aberto ao público, permitindo colaboração, estudo e modificação por qualquer pessoa."
    },
    {
        category: "software",
        categoryLabel: "💾 Software",
        question: "O que é um algoritmo?",
        options: [
            "Um tipo de vírus de computador",
            "Um programa de edição de imagens",
            "Uma sequência lógica e finita de passos para resolver um problema",
            "Uma linguagem de programação"
        ],
        correct: 2,
        explanation: "Algoritmo é uma sequência de passos lógicos e ordenados que descrevem como resolver um problema ou executar uma tarefa."
    },

    // LÓGICA
    {
        category: "logica",
        categoryLabel: "🔢 Lógica",
        question: "No sistema binário, o número binário '1010' equivale a qual número decimal?",
        options: [
            "8",
            "10",
            "12",
            "14"
        ],
        correct: 1,
        explanation: "1010 em binário = 1×8 + 0×4 + 1×2 + 0×1 = 8 + 0 + 2 + 0 = 10 em decimal."
    },
    {
        category: "logica",
        categoryLabel: "🔢 Lógica",
        question: "Na lógica booleana, o resultado de 1 AND 0 é:",
        options: [
            "1",
            "0",
            "Indefinido",
            "2"
        ],
        correct: 1,
        explanation: "A operação AND, ou E lógico, retorna 1 somente se ambos os valores forem 1. Como um deles é 0, o resultado é 0."
    },
    {
        category: "logica",
        categoryLabel: "🔢 Lógica",
        question: "O que é um loop, ou laço de repetição, na programação?",
        options: [
            "Um erro fatal no programa",
            "Uma estrutura que repete um bloco de código enquanto uma condição for verdadeira",
            "Um tipo de variável",
            "Um comando para encerrar o programa"
        ],
        correct: 1,
        explanation: "Loops, como for, while e do-while, são estruturas que repetem instruções enquanto uma condição permanecer verdadeira."
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const categoryScore = {
    hardware: 0,
    software: 0,
    logica: 0
};

const categoryTotal = {
    hardware: 3,
    software: 3,
    logica: 3
};

const currentQEl = document.getElementById('current-q');
const totalQEl = document.getElementById('total-q');
const scoreEl = document.getElementById('score');
const questionTextEl = document.getElementById('question-text');
const categoryTagEl = document.getElementById('category-tag');
const optionsContainer = document.getElementById('options-container');
const nextBtn = document.getElementById('next-btn');
const progressFill = document.getElementById('progress-fill');

const quizContainer = document.getElementById('quiz-container');
const resultContainer = document.getElementById('result-container');
const finalScoreEl = document.getElementById('final-score');
const feedbackTextEl = document.getElementById('feedback-text');
const categoryScoresEl = document.getElementById('category-scores');

function updateProgress() {
    const percentage = (currentQuestion / questions.length) * 100;
    progressFill.style.width = `${percentage}%`;
}

function loadQuestion() {
    answered = false;

    const q = questions[currentQuestion];

    currentQEl.textContent = currentQuestion + 1;
    totalQEl.textContent = questions.length;
    questionTextEl.textContent = q.question;

    categoryTagEl.textContent = q.categoryLabel;
    categoryTagEl.className = `category-tag tag-${q.category}`;

    const oldExplanation = document.getElementById('explanation-box');

    if (oldExplanation) {
        oldExplanation.remove();
    }

    optionsContainer.innerHTML = '';

    q.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');

        optionDiv.className = 'option';
        optionDiv.textContent = option;
        optionDiv.addEventListener('click', () => selectOption(index));

        optionsContainer.appendChild(optionDiv);
    });

    nextBtn.classList.add('hidden');

    updateProgress();
}

function selectOption(selected) {
    if (answered) {
        return;
    }

    answered = true;

    const q = questions[currentQuestion];
    const options = document.querySelectorAll('.option');

    options.forEach(option => {
        option.classList.add('disabled');
    });

    if (selected === q.correct) {
        options[selected].classList.add('correct');

        score++;
        categoryScore[q.category]++;

        scoreEl.textContent = score;
    } else {
        options[selected].classList.add('wrong');
        options[q.correct].classList.add('correct');
    }

    const explanationBox = document.createElement('div');

    explanationBox.id = 'explanation-box';
    explanationBox.className = 'explanation-box';
    explanationBox.innerHTML = `<strong>💡 Explicação:</strong> ${q.explanation}`;

    optionsContainer.after(explanationBox);

    nextBtn.classList.remove('hidden');
}

function nextQuestion() {
    currentQuestion++;

    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    quizContainer.classList.add('hidden');
    resultContainer.classList.remove('hidden');

    finalScoreEl.textContent = score;

    categoryScoresEl.innerHTML = `
        <div class="cat-item hardware">🖥️ Hardware: ${categoryScore.hardware}/${categoryTotal.hardware}</div>
        <div class="cat-item software">💾 Software: ${categoryScore.software}/${categoryTotal.software}</div>
        <div class="cat-item logica">🔢 Lógica: ${categoryScore.logica}/${categoryTotal.logica}</div>
    `;

    let feedback = '';

    if (score === questions.length) {
        feedback = '🏆 Perfeito! Você é um(a) verdadeiro(a) dev!';
    } else if (score >= 7) {
        feedback = '👏 Muito bom! Você está quase expert!';
    } else if (score >= 5) {
        feedback = '📘 Bom esforço! Revise e tente novamente!';
    } else {
        feedback = '📚 Continue estudando! A Informática é o futuro!';
    }

    feedbackTextEl.textContent = feedback;
    progressFill.style.width = '100%';
}

nextBtn.addEventListener('click', nextQuestion);

loadQuestion();
