const questions = [
    // BRASIL
    {
        category: "brasil", categoryLabel: "🇧🇷 História do Brasil",
        question: "A Proclamação da República do Brasil ocorreu em:",
        options: ["7 de setembro de 1822", "13 de maio de 1888", "15 de novembro de 1889", "22 de abril de 1500"],
        correct: 2,
        explanation: "A República foi proclamada em 15 de novembro de 1889 pelo Marechal Deodoro da Fonseca, encerrando o período imperial."
    },
    {
        category: "brasil", categoryLabel: "🇧🇷 História do Brasil",
        question: "O período da história brasileira chamado de 'Estado Novo' foi governado por:",
        options: ["Dom Pedro II", "Getúlio Vargas", "Juscelino Kubitschek", "João Goulart"],
        correct: 1,
        explanation: "O Estado Novo (1937-1945) foi um regime autoritário instaurado por Getúlio Vargas, inspirado nos regimes fascistas europeus."
    },
    {
        category: "brasil", categoryLabel: "🇧🇷 História do Brasil",
        question: "A Lei Áurea, que aboliu a escravidão no Brasil, foi assinada em:",
        options: ["1822", "1865", "1888", "1891"],
        correct: 2,
        explanation: "A Lei Áurea foi assinada pela Princesa Isabel em 13 de maio de 1888, tornando o Brasil o último país da América a abolir a escravidão."
    },
    // SÃO JOÃO
    {
        category: "saojoao", categoryLabel: "🎪 Festa Junina",
        question: "A Festa Junina tem suas origens em qual continente?",
        options: ["África", "Ásia", "Europa (Portugal e França)", "América do Norte"],
        correct: 2,
        explanation: "As festas juninas têm origem européia, trazidas pelos portugueses ao Brasil. A festa de São João já era celebrada na Europa medieval."
    },
    {
        category: "saojoao", categoryLabel: "🎪 Festa Junina",
        question: "O santo homenageado na festa de 24 de junho é:",
        options: ["Santo Antônio", "São Pedro", "São João Batista", "São Paulo"],
        correct: 2,
        explanation: "24 de junho é o dia de São João Batista, o santo mais celebrado das festas juninas, que batizou Jesus Cristo no Rio Jordão."
    },
    {
        category: "saojoao", categoryLabel: "🎪 Festa Junina",
        question: "O forró, ritmo típico das festas juninas, foi popularizado por qual artista?",
        options: ["Luiz Gonzaga", "Jackson do Pandeiro", "Dominguinhos", "Elba Ramalho"],
        correct: 0,
        explanation: "Luiz Gonzaga, o 'Rei do Baião', foi o grande responsável por popularizar o forró e o baião em todo o Brasil, a partir dos anos 40."
    },
    // COPA DO MUNDO
    {
        category: "copa", categoryLabel: "🏆 Copa do Mundo",
        question: "Qual país sediará a Copa do Mundo FIFA 2026?",
        options: ["Brasil e Argentina", "Estados Unidos, Canadá e México", "Alemanha e França", "Catar e Emirados"],
        correct: 1,
        explanation: "A Copa do Mundo 2026 será realizada em conjunto pelos Estados Unidos, Canadá e México — a primeira edição com 48 seleções."
    },
    {
        category: "copa", categoryLabel: "🏆 Copa do Mundo",
        question: "O Brasil é o maior vencedor da Copa do Mundo com quantos títulos?",
        options: ["3 títulos", "4 títulos", "5 títulos", "6 títulos"],
        correct: 2,
        explanation: "O Brasil é pentacampeão: 1958, 1962, 1970, 1994 e 2002. É o único país a ter disputado todas as edições da Copa."
    },
    {
        category: "copa", categoryLabel: "🏆 Copa do Mundo",
        question: "A primeira Copa do Mundo da história foi realizada em qual país e ano?",
        options: ["Brasil, 1950", "França, 1930", "Uruguai, 1930", "Inglaterra, 1966"],
        correct: 2,
        explanation: "A primeira Copa do Mundo foi realizada no Uruguai em 1930, com 13 seleções participantes. O Uruguai venceu o torneio em casa."
    }
];

let currentQuestion = 0, score = 0;
let categoryScore = { brasil: 0, saojoao: 0, copa: 0 };
let categoryTotal = { brasil: 3, saojoao: 3, copa: 3 };

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
        <div class="cat-item brasil">🇧🇷 Brasil: ${categoryScore.brasil}/${categoryTotal.brasil}</div>
        <div class="cat-item saojoao">🎪 São João: ${categoryScore.saojoao}/${categoryTotal.saojoao}</div>
        <div class="cat-item copa">🏆 Copa: ${categoryScore.copa}/${categoryTotal.copa}</div>`;
    const feedbacks = ["📚 Continue estudando! A história nos ensina muito!", "📘 Bom esforço! Revise os fatos e tente novamente!", "👏 Muito bom! Você conhece bem a história!", "🏆 Perfeito! Você é um(a) verdadeiro(a) historiador(a)!"];
    document.getElementById('feedback-text').textContent = score <= 3 ? feedbacks[0] : score <= 5 ? feedbacks[1] : score <= 7 ? feedbacks[2] : feedbacks[3];
}

document.getElementById('next-btn').onclick = nextQuestion;
loadQuestion();
