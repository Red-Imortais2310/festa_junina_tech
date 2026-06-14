const questions = [
    // ÁTOMOS
    {
        category: "atomos", categoryLabel: "⚛️ Átomos",
        question: "O número atômico de um elemento representa:",
        options: ["A quantidade de nêutrons no núcleo", "A quantidade de prótons no núcleo", "A massa total do átomo", "A quantidade de elétrons na última camada"],
        correct: 1,
        explanation: "O número atômico (Z) é a quantidade de prótons no núcleo, que define a identidade química do elemento."
    },
    {
        category: "atomos", categoryLabel: "⚛️ Átomos",
        question: "Os elétrons de um átomo estão localizados:",
        options: ["No núcleo, junto com os prótons", "Na eletrosfera, em torno do núcleo", "Dentro dos nêutrons", "No centro do átomo"],
        correct: 1,
        explanation: "Os elétrons ocupam a eletrosfera (camadas ao redor do núcleo), enquanto prótons e nêutrons ficam no núcleo."
    },
    {
        category: "atomos", categoryLabel: "⚛️ Átomos",
        question: "Isótopos são átomos do mesmo elemento que possuem:",
        options: ["Mesmo número de prótons e nêutrons", "Mesmo número de prótons, mas diferente número de nêutrons", "Diferente número de prótons", "Mesma massa atômica"],
        correct: 1,
        explanation: "Isótopos têm o mesmo Z (prótons), mas diferentes números de nêutrons, portanto massas atômicas diferentes. Ex: Carbono-12 e Carbono-14."
    },
    // REAÇÕES
    {
        category: "reacoes", categoryLabel: "🔬 Reações",
        question: "Na queima da fogueira junina (combustão), a reação química é:",
        options: ["Endotérmica — absorve calor do ambiente", "Exotérmica — libera calor para o ambiente", "Neutra — não envolve troca de energia", "Nuclear — envolve fissão de átomos"],
        correct: 1,
        explanation: "A combustão é uma reação exotérmica: libera energia na forma de calor e luz. É por isso que a fogueira aquece!"
    },
    {
        category: "reacoes", categoryLabel: "🔬 Reações",
        question: "Na equação H₂ + O₂ → H₂O, qual é o produto da reação?",
        options: ["H₂ (hidrogênio)", "O₂ (oxigênio)", "H₂O (água)", "H₂O₂ (água oxigenada)"],
        correct: 2,
        explanation: "Os reagentes são H₂ e O₂. O produto formado após a reação é H₂O (água)."
    },
    {
        category: "reacoes", categoryLabel: "🔬 Reações",
        question: "As cores dos fogos de artifício são produzidas por:",
        options: ["Tinta adicionada à pólvora", "Sais metálicos que emitem luz colorida quando aquecidos", "Filtros de cor na explosão", "Gases coloridos comprimidos"],
        correct: 1,
        explanation: "Sais metálicos emitem cores características: estrôncio (vermelho), bário (verde), cobre (azul), sódio (amarelo)."
    },
    // SUBSTÂNCIAS
    {
        category: "substancias", categoryLabel: "🧬 Substâncias",
        question: "A água (H₂O) é classificada como:",
        options: ["Mistura homogênea", "Substância composta (ou composto)", "Substância simples", "Mistura heterogênea"],
        correct: 1,
        explanation: "H₂O é um composto químico: formado por dois elementos diferentes (H e O) unidos em proporção fixa."
    },
    {
        category: "substancias", categoryLabel: "🧬 Substâncias",
        question: "O pH de uma solução ácida é:",
        options: ["Igual a 7", "Maior que 7", "Menor que 7", "Igual a 14"],
        correct: 2,
        explanation: "pH < 7 = ácido | pH = 7 = neutro | pH > 7 = básico (alcalino). O suco de limão, por exemplo, tem pH ≈ 2."
    },
    {
        category: "substancias", categoryLabel: "🧬 Substâncias",
        question: "Qual das alternativas representa uma mistura heterogênea?",
        options: ["Água + sal dissolvido", "Ar atmosférico puro", "Água + areia", "Álcool + água"],
        correct: 2,
        explanation: "Água + areia é uma mistura heterogênea pois é possível distinguir visualmente os componentes."
    }
];

let currentQuestion = 0, score = 0;
let categoryScore = { atomos: 0, reacoes: 0, substancias: 0 };
let categoryTotal = { atomos: 3, reacoes: 3, substancias: 3 };

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
        <div class="cat-item atomos">⚛️ Átomos: ${categoryScore.atomos}/${categoryTotal.atomos}</div>
        <div class="cat-item reacoes">🔬 Reações: ${categoryScore.reacoes}/${categoryTotal.reacoes}</div>
        <div class="cat-item substancias">🧬 Substâncias: ${categoryScore.substancias}/${categoryTotal.substancias}</div>`;
    const feedbacks = ["📚 Continue estudando! A Química está em tudo!", "📘 Bom esforço! Revise a tabela periódica e tente novamente!", "👏 Muito bom! Marie Curie ficaria orgulhosa!", "🏆 Perfeito! Você é um(a) químico(a) nato(a)!"];
    document.getElementById('feedback-text').textContent = score <= 3 ? feedbacks[0] : score <= 5 ? feedbacks[1] : score <= 7 ? feedbacks[2] : feedbacks[3];
}

document.getElementById('next-btn').onclick = nextQuestion;
loadQuestion();
