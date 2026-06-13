const questions = [
    // MECÂNICA
    {
        category: "mecanica",
        categoryLabel: "🔧 Mecânica",
        question: "A Segunda Lei de Newton estabelece que a força resultante é igual a:",
        options: [
            "massa × velocidade",
            "massa × aceleração",
            "peso × altura",
            "energia × tempo"
        ],
        correct: 1,
        explanation: "F = m × a. A Segunda Lei de Newton diz que a força resultante sobre um corpo é igual ao produto de sua massa pela aceleração."
    },
    {
        category: "mecanica",
        categoryLabel: "🔧 Mecânica",
        question: "Um balão de festa junina sobe porque:",
        options: [
            "É leve demais para cair",
            "O empuxo do ar é maior que o peso do balão",
            "O vento empurra para cima",
            "O fogo cria uma força magnética"
        ],
        correct: 1,
        explanation: "O Princípio de Arquimedes explica que o empuxo do ar aquecido pode ser maior que o peso do balão, fazendo-o subir."
    },
    {
        category: "mecanica",
        categoryLabel: "🔧 Mecânica",
        question: "A energia cinética de um objeto em movimento depende de:",
        options: [
            "Apenas sua massa",
            "Apenas sua velocidade",
            "Sua massa e o quadrado de sua velocidade",
            "Sua cor e temperatura"
        ],
        correct: 2,
        explanation: "A energia cinética é dada por Ec = ½ × m × v². Ela depende da massa e do quadrado da velocidade."
    },

    // TERMODINÂMICA
    {
        category: "termodinamica",
        categoryLabel: "🔥 Termodinâmica",
        question: "A transferência de calor por contato direto entre corpos é chamada de:",
        options: [
            "Convecção",
            "Irradiação",
            "Condução",
            "Ebulição"
        ],
        correct: 2,
        explanation: "A condução é a transferência de calor por contato direto entre partículas ou corpos."
    },
    {
        category: "termodinamica",
        categoryLabel: "🔥 Termodinâmica",
        question: "A Primeira Lei da Termodinâmica afirma que:",
        options: [
            "O calor sempre flui do frio para o quente",
            "A energia não pode ser criada nem destruída, apenas transformada",
            "O universo tende à desordem máxima",
            "Nenhuma máquina tem 100% de eficiência"
        ],
        correct: 1,
        explanation: "A Primeira Lei da Termodinâmica é uma aplicação da conservação de energia: energia não se cria nem se destrói, apenas se transforma."
    },
    {
        category: "termodinamica",
        categoryLabel: "🔥 Termodinâmica",
        question: "Quando a lenha da fogueira queima, ocorre uma transformação de energia:",
        options: [
            "Elétrica em cinética",
            "Química em térmica e luminosa",
            "Nuclear em mecânica",
            "Potencial em sonora"
        ],
        correct: 1,
        explanation: "Na combustão, a energia química armazenada na madeira é transformada principalmente em energia térmica e luminosa."
    },

    // ONDAS
    {
        category: "ondas",
        categoryLabel: "〰️ Ondas",
        question: "O som é um exemplo de onda:",
        options: [
            "Eletromagnética e transversal",
            "Mecânica e longitudinal",
            "Luminosa e transversal",
            "Gravitacional e estacionária"
        ],
        correct: 1,
        explanation: "O som é uma onda mecânica porque precisa de meio material para se propagar, e longitudinal porque a vibração ocorre na mesma direção da propagação."
    },
    {
        category: "ondas",
        categoryLabel: "〰️ Ondas",
        question: "A frequência de uma onda sonora determina:",
        options: [
            "Sua velocidade",
            "Sua amplitude",
            "Seu timbre",
            "Sua altura, ou seja, se é grave ou agudo"
        ],
        correct: 3,
        explanation: "A frequência determina a altura do som: frequências baixas produzem sons graves, e frequências altas produzem sons agudos."
    },
    {
        category: "ondas",
        categoryLabel: "〰️ Ondas",
        question: "A luz visível é um exemplo de onda:",
        options: [
            "Mecânica e longitudinal",
            "Eletromagnética e transversal",
            "Sonora e estacionária",
            "Gravitacional e transversal"
        ],
        correct: 1,
        explanation: "A luz é uma onda eletromagnética, pois não precisa de meio material para se propagar, e é transversal."
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const categoryScore = {
    mecanica: 0,
    termodinamica: 0,
    ondas: 0
};

const categoryTotal = {
    mecanica: questions.filter(q => q.category === "mecanica").length,
    termodinamica: questions.filter(q => q.category === "termodinamica").length,
    ondas: questions.filter(q => q.category === "ondas").length
};

let quizContainer;
let resultContainer;
let currentQEl;
let totalQEl;
let questionTextEl;
let categoryTagEl;
let optionsContainer;
let nextBtn;
let scoreEl;
let progressFill;
let finalScoreEl;
let categoryScoresEl;
let feedbackTextEl;

function getElements() {
    quizContainer = document.getElementById("quiz-container");
    resultContainer = document.getElementById("result-container");
    currentQEl = document.getElementById("current-q");
    totalQEl = document.getElementById("total-q");
    questionTextEl = document.getElementById("question-text");
    categoryTagEl = document.getElementById("category-tag");
    optionsContainer = document.getElementById("options-container");
    nextBtn = document.getElementById("next-btn");
    scoreEl = document.getElementById("score");
    progressFill = document.getElementById("progress-fill");
    finalScoreEl = document.getElementById("final-score");
    categoryScoresEl = document.getElementById("category-scores");
    feedbackTextEl = document.getElementById("feedback-text");

    if (
        !quizContainer ||
        !resultContainer ||
        !currentQEl ||
        !totalQEl ||
        !questionTextEl ||
        !categoryTagEl ||
        !optionsContainer ||
        !nextBtn ||
        !scoreEl ||
        !progressFill ||
        !finalScoreEl ||
        !categoryScoresEl ||
        !feedbackTextEl
    ) {
        console.error("Erro: um ou mais elementos do HTML não foram encontrados.");
        return false;
    }

    return true;
}

function updateProgress() {
    const percent = (currentQuestion / questions.length) * 100;
    progressFill.style.width = percent + "%";
}

function updateProgressFinal() {
    progressFill.style.width = "100%";
}

function loadQuestion() {
    answered = false;

    const q = questions[currentQuestion];

    currentQEl.textContent = currentQuestion + 1;
    totalQEl.textContent = questions.length;
    questionTextEl.textContent = q.question;

    categoryTagEl.textContent = q.categoryLabel;
    categoryTagEl.className = "category-tag tag-" + q.category;

    const oldExplanation = document.getElementById("explanation-box");

    if (oldExplanation) {
        oldExplanation.remove();
    }

    updateProgress();

    optionsContainer.innerHTML = "";

    q.options.forEach((option, index) => {
        const optionDiv = document.createElement("div");

        optionDiv.className = "option";
        optionDiv.textContent = option;

        optionDiv.addEventListener("click", function () {
            selectOption(index);
        });

        optionsContainer.appendChild(optionDiv);
    });

    nextBtn.classList.add("hidden");
    nextBtn.disabled = true;
}

function selectOption(selected) {
    if (answered) {
        return;
    }

    answered = true;

    const q = questions[currentQuestion];
    const optionElements = document.querySelectorAll(".option");

    optionElements.forEach(option => {
        option.classList.add("disabled");
    });

    if (selected === q.correct) {
        optionElements[selected].classList.add("correct");

        score++;
        categoryScore[q.category]++;

        scoreEl.textContent = score;
    } else {
        optionElements[selected].classList.add("wrong");
        optionElements[q.correct].classList.add("correct");
    }

    const explanationBox = document.createElement("div");
    explanationBox.id = "explanation-box";
    explanationBox.className = "explanation-box";

    const strong = document.createElement("strong");
    strong.textContent = "💡 Explicação: ";

    const text = document.createTextNode(q.explanation);

    explanationBox.appendChild(strong);
    explanationBox.appendChild(text);

    optionsContainer.after(explanationBox);

    nextBtn.classList.remove("hidden");
    nextBtn.disabled = false;
}

function nextQuestion(event) {
    if (event) {
        event.preventDefault();
    }

    if (!answered) {
        return;
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    updateProgressFinal();

    quizContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");

    finalScoreEl.textContent = score;

    categoryScoresEl.innerHTML = `
        <div class="cat-item mecanica">🔧 Mecânica: ${categoryScore.mecanica}/${categoryTotal.mecanica}</div>
        <div class="cat-item termodinamica">🔥 Termodinâmica: ${categoryScore.termodinamica}/${categoryTotal.termodinamica}</div>
        <div class="cat-item ondas">〰️ Ondas: ${categoryScore.ondas}/${categoryTotal.ondas}</div>
    `;

    const feedbacks = [
        "📚 Continue estudando! A Física explica o mundo!",
        "📘 Bom esforço! Revise as leis e tente novamente!",
        "👏 Muito bom! Newton ficaria impressionado!",
        "🏆 Perfeito! Você dominou a Física!"
    ];

    if (score <= 3) {
        feedbackTextEl.textContent = feedbacks[0];
    } else if (score <= 5) {
        feedbackTextEl.textContent = feedbacks[1];
    } else if (score <= 7) {
        feedbackTextEl.textContent = feedbacks[2];
    } else {
        feedbackTextEl.textContent = feedbacks[3];
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const ok = getElements();

    if (!ok) {
        return;
    }

    nextBtn.setAttribute("type", "button");
    nextBtn.addEventListener("click", nextQuestion);

    scoreEl.textContent = score;
    totalQEl.textContent = questions.length;

    quizContainer.classList.remove("hidden");
    resultContainer.classList.add("hidden");

    loadQuestion();
});
