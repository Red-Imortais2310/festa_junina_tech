const questions = [
    // ÉTICA
    {
        category: "etica",
        categoryLabel: "⚖️ Ética",
        question: "Para Immanuel Kant, uma ação é moralmente correta quando:",
        options: [
            "Gera o maior bem para o maior número de pessoas",
            "Pode ser universalizada como lei para todos os seres racionais",
            "Segue os ensinamentos religiosos",
            "Traz felicidade ao indivíduo"
        ],
        correct: 1,
        explanation: "O imperativo categórico de Kant diz: 'Age apenas segundo uma máxima tal que possas querer que ela se torne lei universal.'"
    },
    {
        category: "etica",
        categoryLabel: "⚖️ Ética",
        question: "O utilitarismo, defendido por Jeremy Bentham e John Stuart Mill, propõe que:",
        options: [
            "A moral é definida por Deus",
            "A ação correta é aquela que maximiza a felicidade do maior número de pessoas",
            "O bem individual supera o bem coletivo",
            "A virtude é o único critério moral"
        ],
        correct: 1,
        explanation: "O utilitarismo avalia as ações pelas suas consequências — é moralmente correto aquilo que gera mais bem-estar para mais pessoas."
    },
    {
        category: "etica",
        categoryLabel: "⚖️ Ética",
        question: "A ética das virtudes, desenvolvida por Aristóteles, tem como conceito central:",
        options: [
            "O dever moral acima de tudo",
            "A busca pela eudaimonia (florescimento humano) através das virtudes",
            "O prazer como bem supremo",
            "A obediência às leis do Estado"
        ],
        correct: 1,
        explanation: "Aristóteles defende que o fim último do ser humano é a eudaimonia, alcançada pela prática das virtudes."
    },

    // POLÍTICA
    {
        category: "politica",
        categoryLabel: "🏛️ Política",
        question: "Thomas Hobbes descreveu o estado de natureza, sem governo, como:",
        options: [
            "Um paraíso de liberdade e paz",
            "'A guerra de todos contra todos', onde a vida é solitária, pobre e breve",
            "Uma democracia direta perfeita",
            "Um estado de cooperação natural"
        ],
        correct: 1,
        explanation: "Para Hobbes, sem o Estado, os homens viveriam em conflito constante. Por isso, criam um contrato social cedendo poder ao Leviatã."
    },
    {
        category: "politica",
        categoryLabel: "🏛️ Política",
        question: "O conceito de 'contrato social' de Jean-Jacques Rousseau afirma que:",
        options: [
            "O poder vem de Deus e é delegado ao rei",
            "A sociedade corrompe o homem naturalmente bom, que deve criar leis baseadas na vontade geral",
            "O mercado deve regular a sociedade",
            "O Estado deve ser abolido"
        ],
        correct: 1,
        explanation: "Rousseau acredita que o homem nasce bom e a sociedade o corrompe. O contrato social legítimo baseia-se na vontade geral do povo."
    },
    {
        category: "politica",
        categoryLabel: "🏛️ Política",
        question: "A separação dos poderes em Executivo, Legislativo e Judiciário foi proposta por:",
        options: [
            "Karl Marx",
            "John Locke e Montesquieu",
            "Platão",
            "Friedrich Nietzsche"
        ],
        correct: 1,
        explanation: "Montesquieu, em 'O Espírito das Leis', desenvolveu a teoria da separação dos poderes para evitar o despotismo."
    },

    // EXISTÊNCIA
    {
        category: "existencia",
        categoryLabel: "🌌 Existência",
        question: "A frase 'Cogito, ergo sum' — Penso, logo existo — é de:",
        options: [
            "Sócrates",
            "Platão",
            "René Descartes",
            "Friedrich Nietzsche"
        ],
        correct: 2,
        explanation: "Descartes usou essa frase como ponto de partida indubitável de sua filosofia: mesmo duvidando de tudo, o ato de duvidar prova que existe um pensador."
    },
    {
        category: "existencia",
        categoryLabel: "🌌 Existência",
        question: "O existencialismo de Jean-Paul Sartre é resumido na frase:",
        options: [
            "'Deus está morto'",
            "'A existência precede a essência'",
            "'O homem é a medida de todas as coisas'",
            "'Conhece-te a ti mesmo'"
        ],
        correct: 1,
        explanation: "Sartre defende que não há natureza humana pré-definida. O ser humano primeiro existe e depois constrói sua essência através de suas escolhas."
    },
    {
        category: "existencia",
        categoryLabel: "🌌 Existência",
        question: "O Mito da Caverna, de Platão, é uma alegoria sobre:",
        options: [
            "A origem do universo",
            "A diferença entre a realidade aparente, as sombras, e o verdadeiro conhecimento, a luz",
            "A vida após a morte",
            "A importância da democracia"
        ],
        correct: 1,
        explanation: "Na alegoria, prisioneiros confundem sombras com a realidade. Representa a passagem da ignorância ao conhecimento filosófico."
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const categoryScore = {
    etica: 0,
    politica: 0,
    existencia: 0
};

const categoryTotal = {
    etica: questions.filter(q => q.category === "etica").length,
    politica: questions.filter(q => q.category === "politica").length,
    existencia: questions.filter(q => q.category === "existencia").length
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
    const pct = (currentQuestion / questions.length) * 100;
    progressFill.style.width = pct + "%";
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

    const oldExp = document.getElementById("explanation-box");

    if (oldExp) {
        oldExp.remove();
    }

    updateProgress();

    optionsContainer.innerHTML = "";

    q.options.forEach((option, index) => {
        const div = document.createElement("div");

        div.className = "option";
        div.textContent = option;

        div.addEventListener("click", function () {
            selectOption(index);
        });

        optionsContainer.appendChild(div);
    });

    nextBtn.classList.add("hidden");
    nextBtn.disabled = true;
    nextBtn.style.removeProperty("display");
}

function selectOption(selected) {
    if (answered) {
        return;
    }

    answered = true;

    const q = questions[currentQuestion];
    const options = document.querySelectorAll(".option");

    options.forEach(option => {
        option.classList.add("disabled");
    });

    if (selected === q.correct) {
        options[selected].classList.add("correct");

        score++;
        categoryScore[q.category]++;

        scoreEl.textContent = score;
    } else {
        options[selected].classList.add("wrong");
        options[q.correct].classList.add("correct");
    }

    const expBox = document.createElement("div");
    expBox.id = "explanation-box";
    expBox.className = "explanation-box";

    const strong = document.createElement("strong");
    strong.textContent = "💡 Explicação: ";

    const text = document.createTextNode(q.explanation);

    expBox.appendChild(strong);
    expBox.appendChild(text);

    optionsContainer.after(expBox);

    nextBtn.classList.remove("hidden");
    nextBtn.disabled = false;
    nextBtn.style.setProperty("display", "block", "important");
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

    const oldExp = document.getElementById("explanation-box");

    if (oldExp) {
        oldExp.remove();
    }

    quizContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");

    finalScoreEl.textContent = score;

    categoryScoresEl.innerHTML = `
        <div class="cat-item etica">⚖️ Ética: ${categoryScore.etica}/${categoryTotal.etica}</div>
        <div class="cat-item politica">🏛️ Política: ${categoryScore.politica}/${categoryTotal.politica}</div>
        <div class="cat-item existencia">🌌 Existência: ${categoryScore.existencia}/${categoryTotal.existencia}</div>
    `;

    const feedbacks = [
        "📚 Continue filosofando! O conhecimento é libertador!",
        "📘 Bom esforço! Revise os pensadores e tente novamente!",
        "👏 Muito bom! Você pensa, logo existe com estilo!",
        "🏆 Perfeito! Sócrates ficaria orgulhoso de você!"
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
