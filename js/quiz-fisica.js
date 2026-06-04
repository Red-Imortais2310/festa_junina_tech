const questions = [
    // MECÂNICA
    {
        category: "mecanica", categoryLabel: "🔧 Mecânica",
        question: "A Segunda Lei de Newton estabelece que a força resultante é igual a:",
        options: ["massa × velocidade", "massa × aceleração", "peso × altura", "energia × tempo"],
        correct: 1,
        explanation: "F = m × a. A Segunda Lei de Newton diz que a força resultante sobre um corpo é igual ao produto de sua massa pela aceleração."
    },
    {
        category: "mecanica", categoryLabel: "🔧 Mecânica",
        question: "Um balão de festa junina sobe porque:",
        options: ["É leve demais para cair", "O empuxo do ar é maior que o peso do balão", "O vento empurra para cima", "O fogo cria uma força magnética"],
        correct: 1,
        explanation: "O Princípio de Arquimedes: o empuxo (força do fluido) é maior que o peso do balão, fazendo-o flutuar e subir."
    },
    {
        category: "mecanica", categoryLabel: "🔧 Mecânica",
        question: "A energia cinética de um objeto em movimento depende de:",
        options: ["Apenas sua massa", "Apenas sua velocidade", "Sua massa e o quadrado de sua velocidade", "Sua cor e temperatura"],
        correct: 2,
        explanation: "Ec = ½ × m × v². A energia cinética cresce com a massa, mas cresce ao quadrado com a velocidade."
    },
    // TERMODINÂMICA
    {
        category: "termodinamica", categoryLabel: "🔥 Termodinâmica",
        question: "A transferência de calor por contato direto entre corpos é chamada de:",
        options: ["Convecção", "Irradiação", "Condução", "Ebulição"],
        correct: 2,
        explanation: "A condução é a transmissão de calor pelo contato direto entre partículas, como quando seguramos uma panela quente."
    },
    {
        category: "termodinamica", categoryLabel: "🔥 Termodinâmica",
        question: "A Primeira Lei da Termodinâmica afirma que:",
        options: ["O calor sempre flui do frio para o quente", "A energia não pode ser criada nem destruída, apenas transformada", "O universo tende à desordem máxima", "Nenhuma máquina tem 100% de eficiência"],
        correct: 1,
        explanation: "A 1ª Lei é a lei da conservação de energia: a energia total de um sistema isolado permanece constante."
    },
    {
        category: "termodinamica", categoryLabel: "🔥 Termodinâmica",
        question: "Quando a lenha da fogueira queima, ocorre uma transformação de energia:",
        options: ["Elétrica em cinética", "Química em térmica e luminosa", "Nuclear em mecânica", "Potencial em sonora"],
        correct: 1,
        explanation: "A combustão transforma energia química (armazenada na madeira) em energia térmica (calor) e luminosa (luz)."
    },
    // ONDAS
    {
        category: "ondas", categoryLabel: "〰️ Ondas",
        question: "O som é um exemplo de onda:",
        options: ["Eletromagnética e transversal", "Mecânica e longitudinal", "Luminosa e transversal", "Gravitacional e estacionária"],
        correct: 1,
        explanation: "O som é uma onda mecânica (precisa de meio material) e longitudinal (vibra na mesma direção da propagação)."
    },
    {
        category: "ondas", categoryLabel: "〰️ Ondas",
        question: "A frequência de uma onda sonora determina:",
        options: ["Sua velocidade", "Sua amplitude", "Seu timbre", "Sua altura (grave ou agudo)"],
        correct: 3,
        explanation: "A frequência determina se o som é grave (baixa frequência) ou agudo (alta frequência). Medida em Hz."
    },
    {
        category: "ondas", categoryLabel: "〰️ Ondas",
        question: "A luz visível é um exemplo de onda:",
        options: ["Mecânica e longitudinal", "Eletromagnética e transversal", "Sonora e estacionária", "Gravitacional e transversal"],
        correct: 1,
        explanation: "A luz é uma onda eletromagnética (não precisa de meio material) e transversal (vibra perpendicularmente à propagação)."
    }
];

let currentQuestion = 0, score = 0;
let categoryScore = { mecanica: 0, termodinamica: 0, ondas: 0 };
let categoryTotal = { mecanica: 3, termodinamica: 3, ondas: 3 };

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
    document.getElementById('result-container').style.display = 'block';
    document.getElementById('final-score').textContent = score;
    document.getElementById('category-scores').innerHTML = `
        <div class="cat-item mecanica">🔧 Mecânica: ${categoryScore.mecanica}/${categoryTotal.mecanica}</div>
        <div class="cat-item termodinamica">🔥 Termodinâmica: ${categoryScore.termodinamica}/${categoryTotal.termodinamica}</div>
        <div class="cat-item ondas">〰️ Ondas: ${categoryScore.ondas}/${categoryTotal.ondas}</div>`;
    const feedbacks = ["📚 Continue estudando! A Física explica o mundo!", "📘 Bom esforço! Revise as leis e tente novamente!", "👏 Muito bom! Newton ficaria impressionado!", "🏆 Perfeito! Você dominou a Física!"];
    document.getElementById('feedback-text').textContent = score <= 3 ? feedbacks[0] : score <= 5 ? feedbacks[1] : score <= 7 ? feedbacks[2] : feedbacks[3];
}

document.getElementById('next-btn').onclick = nextQuestion;
loadQuestion();
