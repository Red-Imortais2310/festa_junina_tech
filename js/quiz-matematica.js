// quiz-matematica.js

const questions = [
    // ────── MÉDIA ──────
    {
        category: "media",
        categoryLabel: "📊 Média",
        question: "Uma barraca junina vendeu 4, 6, 8, 10 e 12 quentões durante 5 dias. Qual é a MÉDIA de vendas diárias?",
        options: ["7", "8", "9", "10"],
        correct: 1,
        explanation: "Média = soma ÷ quantidade → (4+6+8+10+12) ÷ 5 = 40 ÷ 5 = 8."
    },
    {
        category: "media",
        categoryLabel: "📊 Média",
        question: "As notas de um aluno foram: 7, 9, 5 e 7. Qual é a média aritmética?",
        options: ["6,5", "7,0", "7,5", "8,0"],
        correct: 1,
        explanation: "Média = (7+9+5+7) ÷ 4 = 28 ÷ 4 = 7,0."
    },
    {
        category: "media",
        categoryLabel: "📊 Média",
        question: "A média de 3 números é 12. Dois deles são 10 e 14. Qual é o terceiro número?",
        options: ["10", "11", "12", "14"],
        correct: 2,
        explanation: "Soma total = 12 × 3 = 36. Terceiro = 36 − 10 − 14 = 12."
    },

    // ────── MEDIANA ──────
    {
        category: "mediana",
        categoryLabel: "📏 Mediana",
        question: "Nos dados ordenados: 3, 5, 7, 9, 11 — qual é a MEDIANA?",
        options: ["5", "7", "9", "6"],
        correct: 1,
        explanation: "Com 5 valores ordenados, a mediana é o valor central (posição 3) = 7."
    },
    {
        category: "mediana",
        categoryLabel: "📏 Mediana",
        question: "Os preços de canjica (em R$) foram: 8, 12, 6, 10, 14. Ordenados e a mediana é:",
        options: ["8", "10", "12", "6"],
        correct: 1,
        explanation: "Ordenados: 6, 8, 10, 12, 14. Valor central = 10."
    },
    {
        category: "mediana",
        categoryLabel: "📏 Mediana",
        question: "Para o conjunto com quantidade PAR de valores: 4, 8, 10, 14 — a mediana é:",
        options: ["8", "9", "10", "11"],
        correct: 1,
        explanation: "Com 4 valores, a mediana é a média dos dois centrais: (8+10) ÷ 2 = 9."
    },

    // ────── MODO ──────
    {
        category: "modo",
        categoryLabel: "🎯 Moda",
        question: "Em uma quadrilha, as idades dos dançarinos são: 15, 17, 15, 18, 17, 15, 20. Qual é a MODA?",
        options: ["17", "15", "18", "20"],
        correct: 1,
        explanation: "A moda é o valor que mais se repete. O número 15 aparece 3 vezes."
    },
    {
        category: "modo",
        categoryLabel: "🎯 Moda",
        question: "O conjunto 2, 4, 4, 6, 8, 8 possui quantas modas?",
        options: ["Nenhuma", "Uma moda: 4", "Duas modas: 4 e 8", "Uma moda: 8"],
        correct: 2,
        explanation: "Tanto 4 quanto 8 aparecem 2 vezes. O conjunto é bimodal: moda = 4 e 8."
    },
    {
        category: "modo",
        categoryLabel: "🎯 Moda",
        question: "Se todos os valores de um conjunto aparecem a mesma quantidade de vezes, o conjunto é:",
        options: ["Bimodal", "Unimodal", "Amodal (sem moda)", "Multimodal"],
        correct: 2,
        explanation: "Quando nenhum valor se repete mais que os outros, o conjunto é amodal, ou seja, não possui moda."
    }
];

let currentQuestion = 0;
let score = 0;
let categoryScore = { media: 0, mediana: 0, modo: 0 };
let categoryTotal = { media: 3, mediana: 3, modo: 3 };

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

    // Tag de categoria
    const tagEl = document.getElementById('category-tag');
    tagEl.textContent = q.categoryLabel;
    tagEl.className = 'category-tag tag-' + q.category;

    // Remove explicação anterior se houver
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

    // Mostra explicação
    const expBox = document.createElement('div');
    expBox.id = 'explanation-box';
    expBox.className = 'explanation-box';
    expBox.innerHTML = '<strong>💡 Explicação:</strong> ' + q.explanation;
    document.getElementById('options-container').after(expBox);

    document.getElementById('next-btn').style.display = 'block';
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
    document.getElementById('quiz-container').style.display = 'none';
    const resultContainer = document.getElementById('result-container');
    resultContainer.style.display = 'block';
    document.getElementById('final-score').textContent = score;

    // Placar por categoria
    const catDiv = document.getElementById('category-scores');
    catDiv.innerHTML = `
        <div class="cat-item media">📊 Média: ${categoryScore.media}/${categoryTotal.media}</div>
        <div class="cat-item mediana">📏 Mediana: ${categoryScore.mediana}/${categoryTotal.mediana}</div>
        <div class="cat-item modo">🎯 Moda: ${categoryScore.modo}/${categoryTotal.modo}</div>
    `;

    let feedback = '';
    if (score === 9) {
        feedback = '🏆 Perfeito! Você dominou Média, Mediana e Moda!';
    } else if (score >= 7) {
        feedback = '👏 Muito bom! Você está quase lá, continue praticando!';
    } else if (score >= 5) {
        feedback = '📘 Bom esforço! Revise os conceitos e tente novamente!';
    } else {
        feedback = '📚 Continue estudando! Média, Mediana e Moda ficam mais fáceis com a prática!';
    }

    document.getElementById('feedback-text').textContent = feedback;
}

document.getElementById('next-btn').onclick = nextQuestion;

// Inicializa
loadQuestion();
