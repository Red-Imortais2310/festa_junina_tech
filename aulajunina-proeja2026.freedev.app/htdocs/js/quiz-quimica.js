const questions = [
    // ÁTOMOS
    {
        category: "atomos",
        categoryLabel: "⚛️ Átomos",
        question: "O número atômico de um elemento representa:",
        options: [
            "A quantidade de nêutrons no núcleo",
            "A quantidade de prótons no núcleo",
            "A massa total do átomo",
            "A quantidade de elétrons na última camada"
        ],
        correct: 1,
        explanation: "O número atômico (Z) é a quantidade de prótons no núcleo, que define a identidade química do elemento."
    },
    {
        category: "atomos",
        categoryLabel: "⚛️ Átomos",
        question: "Os elétrons de um átomo estão localizados:",
        options: [
            "No núcleo, junto com os prótons",
            "Na eletrosfera, em torno do núcleo",
            "Dentro dos nêutrons",
            "No centro do átomo"
        ],
        correct: 1,
        explanation: "Os elétrons ocupam a eletrosfera (camadas ao redor do núcleo), enquanto prótons e nêutrons ficam no núcleo."
    },
    {
        category: "atomos",
        categoryLabel: "⚛️ Átomos",
        question: "Isótopos são átomos do mesmo elemento que possuem:",
        options: [
            "Mesmo número de prótons e nêutrons",
            "Mesmo número de prótons, mas diferente número de nêutrons",
            "Diferente número de prótons",
            "Mesma massa atômica"
        ],
        correct: 1,
        explanation: "Isótopos têm o mesmo Z (prótons), mas diferentes números de nêutrons, portanto massas atômicas diferentes. Ex: Carbono-12 e Carbono-14."
    },

    // REAÇÕES
    {
        category: "reacoes",
        categoryLabel: "🔬 Reações",
        question: "Na queima da fogueira junina (combustão), a reação química é:",
        options: [
            "Endotérmica — absorve calor do ambiente",
            "Exotérmica — libera calor para o ambiente",
            "Neutra — não envolve troca de energia",
            "Nuclear — envolve fissão de átomos"
        ],
        correct: 1,
        explanation: "A combustão é uma reação exotérmica: libera energia na forma de calor e luz. É por isso que a fogueira aquece!"
    },
    {
        category: "reacoes",
        categoryLabel: "🔬 Reações",
        question: "Na equação H₂ + O₂ → H₂O, qual é o produto da reação?",
        options: [
            "H₂ (hidrogênio)",
            "O₂ (oxigênio)",
            "H₂O (água)",
            "H₂O₂ (água oxigenada)"
        ],
        correct: 2,
        explanation: "Os reagentes são H₂ e O₂. O produto formado após a reação é H₂O (água)."
    },
    {
        category: "reacoes",
        categoryLabel: "🔬 Reações",
        question: "As cores dos fogos de artifício são produzidas por:",
        options: [
            "Tinta adicionada à pólvora",
            "Sais metálicos que emitem luz colorida quando aquecidos",
            "Filtros de cor na explosão",
            "Gases coloridos comprimidos"
        ],
        correct: 1,
        explanation: "Sais metálicos emitem cores características: estrôncio (vermelho), bário (verde), cobre (azul), sódio (amarelo)."
    },

    // SUBSTÂNCIAS
    {
        category: "substancias",
        categoryLabel: "🧬 Substâncias",
        question: "A água (H₂O) é classificada como:",
        options: [
            "Mistura homogênea",
            "Substância composta (ou composto)",
            "Substância simples",
            "Mistura heterogênea"
        ],
        correct: 1,
        explanation: "H₂O é um composto químico: formado por dois elementos diferentes (H e O) unidos em proporção fixa."
    },
    {
        category: "substancias",
        categoryLabel: "🧬 Substâncias",
        question: "O pH de uma solução ácida é:",
        options: [
            "Igual a 7",
            "Maior que 7",
            "Menor que 7",
            "Igual a 14"
        ],
        correct: 2,
        explanation: "pH < 7 = ácido | pH = 7 = neutro | pH > 7 = básico (alcalino). O suco de limão, por exemplo, tem pH ≈ 2."
    },
    {
        category: "substancias",
        categoryLabel: "🧬 Substâncias",
        question: "Qual das alternativas representa uma mistura heterogênea?",
        options: [
            "Água + sal dissolvido",
            "Ar atmosférico puro",
            "Água + areia",
            "Álcool + água"
        ],
        correct: 2,
        explanation: "Água + areia é uma mistura heterogênea pois é possível distinguir visualmente os componentes."
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const categoryScore = {
    atomos: 0,
    reacoes: 0,
    substancias: 0
};

const categoryTotal = {
    atomos: 3,
    reacoes: 3,
    substancias: 3
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
        <div class="cat-item atomos">⚛️ Átomos: ${categoryScore.atomos}/${categoryTotal.atomos}</div>
        <div class="cat-item reacoes">🔬 Reações: ${categoryScore.reacoes}/${categoryTotal.reacoes}</div>
        <div class="cat-item substancias">🧬 Substâncias: ${categoryScore.substancias}/${categoryTotal.substancias}</div>
    `;

    let feedback = '';

    if (score <= 3) {
        feedback = '📚 Continue estudando! A Química está em tudo!';
    } else if (score <= 5) {
        feedback = '📘 Bom esforço! Revise a tabela periódica e tente novamente!';
    } else if (score <= 7) {
        feedback = '👏 Muito bom! Marie Curie ficaria orgulhosa!';
    } else {
        feedback = '🏆 Perfeito! Você é um(a) químico(a) nato(a)!';
    }

    feedbackTextEl.textContent = feedback;
    progressFill.style.width = '100%';
}

nextBtn.addEventListener('click', nextQuestion);

loadQuestion();
