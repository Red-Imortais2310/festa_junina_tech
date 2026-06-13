const questions = [
    // BRASIL
    {
        category: "brasil",
        categoryLabel: "🇧🇷 História do Brasil",
        question: "A Proclamação da República do Brasil ocorreu em:",
        options: [
            "7 de setembro de 1822",
            "13 de maio de 1888",
            "15 de novembro de 1889",
            "22 de abril de 1500"
        ],
        correct: 2,
        explanation: "A República foi proclamada em 15 de novembro de 1889 pelo Marechal Deodoro da Fonseca, encerrando o período imperial."
    },
    {
        category: "brasil",
        categoryLabel: "🇧🇷 História do Brasil",
        question: "O período da história brasileira chamado de 'Estado Novo' foi governado por:",
        options: [
            "Dom Pedro II",
            "Getúlio Vargas",
            "Juscelino Kubitschek",
            "João Goulart"
        ],
        correct: 1,
        explanation: "O Estado Novo, de 1937 a 1945, foi um regime autoritário instaurado por Getúlio Vargas."
    },
    {
        category: "brasil",
        categoryLabel: "🇧🇷 História do Brasil",
        question: "A Lei Áurea, que aboliu a escravidão no Brasil, foi assinada em:",
        options: [
            "1822",
            "1865",
            "1888",
            "1891"
        ],
        correct: 2,
        explanation: "A Lei Áurea foi assinada pela Princesa Isabel em 13 de maio de 1888, abolindo oficialmente a escravidão no Brasil."
    },

    // SÃO JOÃO
    {
        category: "saojoao",
        categoryLabel: "🎪 Festa Junina",
        question: "A Festa Junina tem suas origens em qual continente?",
        options: [
            "África",
            "Ásia",
            "Europa",
            "América do Norte"
        ],
        correct: 2,
        explanation: "As festas juninas têm origem europeia e foram trazidas ao Brasil principalmente pelos portugueses."
    },
    {
        category: "saojoao",
        categoryLabel: "🎪 Festa Junina",
        question: "O santo homenageado na festa de 24 de junho é:",
        options: [
            "Santo Antônio",
            "São Pedro",
            "São João Batista",
            "São Paulo"
        ],
        correct: 2,
        explanation: "O dia 24 de junho é dedicado a São João Batista, uma das principais figuras das festas juninas."
    },
    {
        category: "saojoao",
        categoryLabel: "🎪 Festa Junina",
        question: "O forró, ritmo típico das festas juninas, foi popularizado por qual artista?",
        options: [
            "Luiz Gonzaga",
            "Jackson do Pandeiro",
            "Dominguinhos",
            "Elba Ramalho"
        ],
        correct: 0,
        explanation: "Luiz Gonzaga, conhecido como o Rei do Baião, foi um dos grandes responsáveis por popularizar o forró e a música nordestina no Brasil."
    },

    // COPA DO MUNDO
    {
        category: "copa",
        categoryLabel: "🏆 Copa do Mundo",
        question: "Qual país sediará a Copa do Mundo FIFA 2026?",
        options: [
            "Brasil e Argentina",
            "Estados Unidos, Canadá e México",
            "Alemanha e França",
            "Catar e Emirados"
        ],
        correct: 1,
        explanation: "A Copa do Mundo de 2026 será sediada por Estados Unidos, Canadá e México, sendo a primeira edição com 48 seleções."
    },
    {
        category: "copa",
        categoryLabel: "🏆 Copa do Mundo",
        question: "O Brasil é o maior vencedor da Copa do Mundo com quantos títulos?",
        options: [
            "3 títulos",
            "4 títulos",
            "5 títulos",
            "6 títulos"
        ],
        correct: 2,
        explanation: "O Brasil é pentacampeão mundial, com títulos em 1958, 1962, 1970, 1994 e 2002."
    },
    {
        category: "copa",
        categoryLabel: "🏆 Copa do Mundo",
        question: "A primeira Copa do Mundo da história foi realizada em qual país e ano?",
        options: [
            "Brasil, 1950",
            "França, 1930",
            "Uruguai, 1930",
            "Inglaterra, 1966"
        ],
        correct: 2,
        explanation: "A primeira Copa do Mundo foi realizada no Uruguai em 1930. O próprio Uruguai foi o campeão."
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const categoryScore = {
    brasil: 0,
    saojoao: 0,
    copa: 0
};

const categoryTotal = {
    brasil: 3,
    saojoao: 3,
    copa: 3
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
        <div class="cat-item brasil">🇧🇷 Brasil: ${categoryScore.brasil}/${categoryTotal.brasil}</div>
        <div class="cat-item saojoao">🎪 São João: ${categoryScore.saojoao}/${categoryTotal.saojoao}</div>
        <div class="cat-item copa">🏆 Copa: ${categoryScore.copa}/${categoryTotal.copa}</div>
    `;

    let feedback = '';

    if (score === questions.length) {
        feedback = '🏆 Perfeito! Você é um(a) verdadeiro(a) historiador(a)!';
    } else if (score >= 7) {
        feedback = '👏 Muito bom! Você conhece bem a história!';
    } else if (score >= 5) {
        feedback = '📘 Bom esforço! Revise os fatos e tente novamente!';
    } else {
        feedback = '📚 Continue estudando! A história nos ensina muito!';
    }

    feedbackTextEl.textContent = feedback;
    progressFill.style.width = '100%';
}

nextBtn.addEventListener('click', nextQuestion);

loadQuestion();
