const questions = [
    // CULTURA
    {
        category: "cultura",
        categoryLabel: "🎭 Cultura",
        question: "A Festa Junina é um exemplo de qual tipo de manifestação cultural?",
        options: ["Cultura erudita", "Cultura de massa", "Cultura popular", "Contracultura"],
        correct: 2,
        explanation: "A Festa Junina é uma manifestação da cultura popular, surgida das tradições do povo, especialmente do Nordeste brasileiro."
    },
    {
        category: "cultura",
        categoryLabel: "🎭 Cultura",
        question: "O conceito de 'indústria cultural', desenvolvido por Adorno e Horkheimer, refere-se a:",
        options: ["A produção artesanal de bens culturais", "A padronização e comercialização da cultura de massa", "A valorização das culturas indígenas", "O fomento à cultura erudita"],
        correct: 1,
        explanation: "Adorno e Horkheimer criaram o termo para criticar como a cultura vira mercadoria padronizada produzida em massa para gerar lucro."
    },
    {
        category: "cultura",
        categoryLabel: "🎭 Cultura",
        question: "A transmissão de valores, costumes e tradições de geração em geração é chamada de:",
        options: ["Aculturação", "Socialização", "Etnocentrismo", "Relativismo cultural"],
        correct: 1,
        explanation: "A socialização é o processo pelo qual os indivíduos aprendem e internalizam os valores e normas de sua cultura."
    },

    // IDENTIDADE
    {
        category: "identidade",
        categoryLabel: "🪪 Identidade",
        question: "Segundo Stuart Hall, as identidades na pós-modernidade são:",
        options: ["Fixas e imutáveis", "Definidas pelo Estado", "Fragmentadas e em constante mudança", "Determinadas pela biologia"],
        correct: 2,
        explanation: "Hall argumenta que na pós-modernidade as identidades são múltiplas, fragmentadas e construídas historicamente, não fixas."
    },
    {
        category: "identidade",
        categoryLabel: "🪪 Identidade",
        question: "O sentimento de pertencimento a um grupo social com base em costumes, língua e tradições compartilhadas é chamado de:",
        options: ["Identidade nacional", "Identidade étnica", "Identidade de classe", "Identidade religiosa"],
        correct: 1,
        explanation: "A identidade étnica é construída com base em laços culturais compartilhados como língua, tradições e ancestralidade."
    },
    {
        category: "identidade",
        categoryLabel: "🪪 Identidade",
        question: "Quando um grupo adota elementos culturais de outro grupo sem perder sua identidade original, ocorre:",
        options: ["Etnocentrismo", "Aculturação", "Transculturação", "Assimilação cultural"],
        correct: 2,
        explanation: "A transculturação é a troca mútua de elementos culturais onde ambos os grupos se transformam."
    },

    // GLOBALIZAÇÃO
    {
        category: "globalizacao",
        categoryLabel: "🌍 Globalização",
        question: "A globalização cultural tende a provocar qual fenômeno nas culturas locais?",
        options: ["Fortalecimento absoluto", "Homogeneização e ameaça à diversidade", "Isolamento cultural", "Etnocentrismo"],
        correct: 1,
        explanation: "A globalização pode homogeneizar culturas, impondo padrões globais, especialmente ocidentais, sobre culturas locais."
    },
    {
        category: "globalizacao",
        categoryLabel: "🌍 Globalização",
        question: "O conceito de 'aldeia global', criado por Marshall McLuhan, significa:",
        options: ["O retorno às sociedades rurais", "A comunicação instantânea que aproxima todo o mundo", "A criação de vilas sustentáveis", "O isolamento de comunidades tradicionais"],
        correct: 1,
        explanation: "McLuhan usou o termo para descrever como os meios de comunicação tornaram o mundo interconectado como uma pequena aldeia."
    },
    {
        category: "globalizacao",
        categoryLabel: "🌍 Globalização",
        question: "A resistência de comunidades locais à padronização cultural imposta pela globalização é chamada de:",
        options: ["Imperialismo cultural", "Glocalização", "Etnocentrismo", "Aculturação forçada"],
        correct: 1,
        explanation: "Glocalização é a adaptação de produtos e práticas globais às culturas locais, sendo também uma forma de resistência identitária."
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

let categoryScore = {
    cultura: 0,
    identidade: 0,
    globalizacao: 0
};

let categoryTotal = {
    cultura: 3,
    identidade: 3,
    globalizacao: 3
};

const currentQEl = document.getElementById('current-q');
const totalQEl = document.getElementById('total-q');
const questionTextEl = document.getElementById('question-text');
const categoryTagEl = document.getElementById('category-tag');
const optionsContainer = document.getElementById('options-container');
const nextBtn = document.getElementById('next-btn');
const scoreEl = document.getElementById('score');
const progressFill = document.getElementById('progress-fill');

function updateProgress() {
    const percentage = ((currentQuestion + 1) / questions.length) * 100;

    if (progressFill) {
        progressFill.style.width = percentage + '%';
    }
}

function loadQuestion() {
    answered = false;

    const q = questions[currentQuestion];

    currentQEl.textContent = currentQuestion + 1;
    totalQEl.textContent = questions.length;
    questionTextEl.textContent = q.question;

    categoryTagEl.textContent = q.categoryLabel;
    categoryTagEl.className = 'category-tag tag-' + q.category;

    const oldExplanation = document.getElementById('explanation-box');

    if (oldExplanation) {
        oldExplanation.remove();
    }

    optionsContainer.innerHTML = '';

    q.options.forEach((option, index) => {
        const div = document.createElement('div');
        div.className = 'option';
        div.textContent = option;

        div.addEventListener('click', () => {
            selectOption(index);
        });

        optionsContainer.appendChild(div);
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
    explanationBox.innerHTML = '<strong>💡 Explicação:</strong> ' + q.explanation;

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
    document.getElementById('quiz-container').classList.add('hidden');

    const resultContainer = document.getElementById('result-container');
    resultContainer.classList.remove('hidden');

    document.getElementById('final-score').textContent = score;

    document.getElementById('category-scores').innerHTML = `
        <div class="cat-item cultura">🎭 Cultura: ${categoryScore.cultura}/${categoryTotal.cultura}</div>
        <div class="cat-item identidade">🪪 Identidade: ${categoryScore.identidade}/${categoryTotal.identidade}</div>
        <div class="cat-item globalizacao">🌍 Globalização: ${categoryScore.globalizacao}/${categoryTotal.globalizacao}</div>
    `;

    const feedbacks = [
        "📚 Continue estudando! A Sociologia tem muito a revelar!",
        "📘 Bom esforço! Revise os conceitos e tente novamente!",
        "👏 Muito bom! Você está quase lá!",
        "🏆 Perfeito! Você dominou a Sociologia!"
    ];

    let feedback;

    if (score <= 3) {
        feedback = feedbacks[0];
    } else if (score <= 5) {
        feedback = feedbacks[1];
    } else if (score <= 7) {
        feedback = feedbacks[2];
    } else {
        feedback = feedbacks[3];
    }

    document.getElementById('feedback-text').textContent = feedback;
}

nextBtn.addEventListener('click', nextQuestion);

loadQuestion();
