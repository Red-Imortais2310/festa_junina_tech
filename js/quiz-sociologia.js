const questions = [
    // CULTURA
    {
        category: "cultura", categoryLabel: "🎭 Cultura",
        question: "A Festa Junina é um exemplo de qual tipo de manifestação cultural?",
        options: ["Cultura erudita", "Cultura de massa", "Cultura popular", "Contracultura"],
        correct: 2,
        explanation: "A Festa Junina é uma manifestação da cultura popular, surgida das tradições do povo, especialmente do Nordeste brasileiro."
    },
    {
        category: "cultura", categoryLabel: "🎭 Cultura",
        question: "O conceito de 'indústria cultural', desenvolvido por Adorno e Horkheimer, refere-se a:",
        options: ["A produção artesanal de bens culturais", "A padronização e comercialização da cultura de massa", "A valorização das culturas indígenas", "O fomento à cultura erudita"],
        correct: 1,
        explanation: "Adorno e Horkheimer criaram o termo para criticar como a cultura vira mercadoria padronizada produzida em massa para gerar lucro."
    },
    {
        category: "cultura", categoryLabel: "🎭 Cultura",
        question: "A transmissão de valores, costumes e tradições de geração em geração é chamada de:",
        options: ["Aculturação", "Socialização", "Etnocentrismo", "Relativismo cultural"],
        correct: 1,
        explanation: "A socialização é o processo pelo qual os indivíduos aprendem e internalizam os valores e normas de sua cultura."
    },
    // IDENTIDADE
    {
        category: "identidade", categoryLabel: "🪪 Identidade",
        question: "Segundo Stuart Hall, as identidades na pós-modernidade são:",
        options: ["Fixas e imutáveis", "Definidas pelo Estado", "Fragmentadas e em constante mudança", "Determinadas pela biologia"],
        correct: 2,
        explanation: "Hall argumenta que na pós-modernidade as identidades são múltiplas, fragmentadas e construídas historicamente, não fixas."
    },
    {
        category: "identidade", categoryLabel: "🪪 Identidade",
        question: "O sentimento de pertencimento a um grupo social com base em costumes, língua e tradições compartilhadas é chamado de:",
        options: ["Identidade nacional", "Identidade étnica", "Identidade de classe", "Identidade religiosa"],
        correct: 1,
        explanation: "A identidade étnica é construída com base em laços culturais compartilhados como língua, tradições e ancestralidade."
    },
    {
        category: "identidade", categoryLabel: "🪪 Identidade",
        question: "Quando um grupo adota elementos culturais de outro grupo sem perder sua identidade original, ocorre:",
        options: ["Etnocentrismo", "Aculturação", "Transculturação", "Assimilação cultural"],
        correct: 2,
        explanation: "A transculturação é a troca mútua de elementos culturais onde ambos os grupos se transformam."
    },
    // GLOBALIZAÇÃO
    {
        category: "globalizacao", categoryLabel: "🌍 Globalização",
        question: "A globalização cultural tende a provocar qual fenômeno nas culturas locais?",
        options: ["Fortalecimento absoluto", "Homogeneização e ameaça à diversidade", "Isolamento cultural", "Etnocentrismo"],
        correct: 1,
        explanation: "A globalização pode homogeneizar culturas, impondo padrões globais (especialmente ocidentais) sobre culturas locais."
    },
    {
        category: "globalizacao", categoryLabel: "🌍 Globalização",
        question: "O conceito de 'aldeia global', criado por Marshall McLuhan, significa:",
        options: ["O retorno às sociedades rurais", "A comunicação instantânea que aproxima todo o mundo", "A criação de vilas sustentáveis", "O isolamento de comunidades tradicionais"],
        correct: 1,
        explanation: "McLuhan usou o termo para descrever como os meios de comunicação tornaram o mundo interconectado como uma pequena aldeia."
    },
    {
        category: "globalizacao", categoryLabel: "🌍 Globalização",
        question: "A resistência de comunidades locais à padronização cultural imposta pela globalização é chamada de:",
        options: ["Imperialismo cultural", "Glocalização", "Etnocentrismo", "Aculturação forçada"],
        correct: 1,
        explanation: "Glocalização é a adaptação de produtos e práticas globais às culturas locais, sendo também uma forma de resistência identitária."
    }
];

let currentQuestion = 0, score = 0;
let categoryScore = { cultura: 0, identidade: 0, globalizacao: 0 };
let categoryTotal = { cultura: 3, identidade: 3, globalizacao: 3 };

function updateProgress() {
    const pct = (currentQuestion / questions.length) * 100;
    const fill = document.getElementById('progress-fill');
    if (fill) fill.style.width = pct + '%';
}

function loadQuestion() {
    const q = questions[currentQuestion];
    document.getElementById('current-q').textContent = currentQuestion + 1;
    document.getElementById('total-q').textContent = questions.length;
    document.getElementById('question-text').textContent = q.question;
    const tagEl = document.getElementById('category-tag');
    tagEl.textContent = q.categoryLabel;
    tagEl.className = 'category-tag tag-' + q.category;
    const oldExp = document.getElementById('explanation-box');
    if (oldExp) oldExp.remove();
    updateProgress();
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    q.options.forEach((option, index) => {
        const div = document.createElement('div');
        div.className = 'option';
        div.textContent = option;
        div.onclick = () => selectOption(index);
        optionsContainer.appendChild(div);
    });
    document.getElementById('next-btn').style.display = 'none';
}

function selectOption(selected) {
    const q = questions[currentQuestion];
    const options = document.querySelectorAll('.option');
    options.forEach(opt => opt.classList.add('disabled'));
    if (selected === q.correct) {
        options[selected].classList.add('correct');
        score++;
        categoryScore[q.category]++;
        document.getElementById('score').textContent = score;
    } else {
        options[selected].classList.add('wrong');
        options[q.correct].classList.add('correct');
    }
    const expBox = document.createElement('div');
    expBox.id = 'explanation-box';
    expBox.className = 'explanation-box';
    expBox.innerHTML = '<strong>💡 Explicação:</strong> ' + q.explanation;
    document.getElementById('options-container').after(expBox);
    document.getElementById('next-btn').style.display = 'block';
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) { loadQuestion(); } else { showResults(); }
}

function showResults() {
    document.getElementById('quiz-container').style.display = 'none';
    const resultContainer = document.getElementById('result-container');
    resultContainer.style.display = 'block';
    document.getElementById('final-score').textContent = score;
    document.getElementById('category-scores').innerHTML = `
        <div class="cat-item cultura">🎭 Cultura: ${categoryScore.cultura}/${categoryTotal.cultura}</div>
        <div class="cat-item identidade">🪪 Identidade: ${categoryScore.identidade}/${categoryTotal.identidade}</div>
        <div class="cat-item globalizacao">🌍 Globalização: ${categoryScore.globalizacao}/${categoryTotal.globalizacao}</div>`;
    const feedbacks = ["📚 Continue estudando! A Sociologia tem muito a revelar!", "📘 Bom esforço! Revise os conceitos e tente novamente!", "👏 Muito bom! Você está quase lá!", "🏆 Perfeito! Você dominou a Sociologia!"];
    document.getElementById('feedback-text').textContent = score <= 3 ? feedbacks[0] : score <= 5 ? feedbacks[1] : score <= 7 ? feedbacks[2] : feedbacks[3];
}

document.getElementById('next-btn').onclick = nextQuestion;
loadQuestion();
