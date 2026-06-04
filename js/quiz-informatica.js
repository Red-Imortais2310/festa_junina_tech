const questions = [
    // HARDWARE
    {
        category: "hardware", categoryLabel: "🖥️ Hardware",
        question: "Qual componente é considerado o 'cérebro' do computador?",
        options: ["HD (Disco Rígido)", "Placa-mãe", "CPU (Processador)", "Memória RAM"],
        correct: 2,
        explanation: "A CPU (Central Processing Unit) é o processador, responsável por executar as instruções e processar dados do computador."
    },
    {
        category: "hardware", categoryLabel: "🖥️ Hardware",
        question: "A memória RAM se diferencia do HD porque:",
        options: ["É permanente e não perde dados ao desligar", "É temporária e volátil, perdendo dados ao desligar", "Armazena o sistema operacional", "É mais lenta que o HD"],
        correct: 1,
        explanation: "A RAM (Random Access Memory) é volátil — armazena dados temporariamente enquanto o computador está ligado."
    },
    {
        category: "hardware", categoryLabel: "🖥️ Hardware",
        question: "O que é um SSD?",
        options: ["Um tipo de processador mais rápido", "Um dispositivo de armazenamento mais rápido que o HD tradicional", "Uma memória RAM de alta performance", "Um tipo de placa de vídeo"],
        correct: 1,
        explanation: "SSD (Solid State Drive) é um dispositivo de armazenamento sem partes móveis, muito mais rápido e resistente que os HDs tradicionais."
    },
    // SOFTWARE
    {
        category: "software", categoryLabel: "💾 Software",
        question: "Qual é a função principal de um sistema operacional?",
        options: ["Criar documentos de texto", "Gerenciar o hardware e fornecer interface para o usuário", "Navegar na internet", "Editar fotos e vídeos"],
        correct: 1,
        explanation: "O sistema operacional (como Windows, Linux, macOS) gerencia recursos do hardware e cria a ponte entre o usuário e a máquina."
    },
    {
        category: "software", categoryLabel: "💾 Software",
        question: "Um software de código aberto (open source) é aquele que:",
        options: ["Custa muito caro para ser licenciado", "Tem seu código-fonte disponível para qualquer pessoa estudar e modificar", "Só pode ser usado por empresas", "Não precisa de instalação"],
        correct: 1,
        explanation: "Software open source tem seu código-fonte aberto ao público, permitindo colaboração, estudo e modificação por qualquer pessoa."
    },
    {
        category: "software", categoryLabel: "💾 Software",
        question: "O que é um algoritmo?",
        options: ["Um tipo de vírus de computador", "Um programa de edição de imagens", "Uma sequência lógica e finita de passos para resolver um problema", "Uma linguagem de programação"],
        correct: 2,
        explanation: "Algoritmo é uma sequência de passos lógicos e ordenados que descrevem como resolver um problema ou executar uma tarefa."
    },
    // LÓGICA
    {
        category: "logica", categoryLabel: "🔢 Lógica",
        question: "No sistema binário, o número binário '1010' equivale a qual número decimal?",
        options: ["8", "10", "12", "14"],
        correct: 1,
        explanation: "1010 em binário = 1×8 + 0×4 + 1×2 + 0×1 = 8 + 0 + 2 + 0 = 10 em decimal."
    },
    {
        category: "logica", categoryLabel: "🔢 Lógica",
        question: "Na lógica booleana, o resultado de 1 AND 0 é:",
        options: ["1", "0", "Indefinido", "2"],
        correct: 1,
        explanation: "A operação AND (E) retorna 1 somente se AMBOS os valores forem 1. Como um deles é 0, o resultado é 0."
    },
    {
        category: "logica", categoryLabel: "🔢 Lógica",
        question: "O que é um loop (laço de repetição) na programação?",
        options: ["Um erro fatal no programa", "Uma estrutura que repete um bloco de código enquanto uma condição for verdadeira", "Um tipo de variável", "Um comando para encerrar o programa"],
        correct: 1,
        explanation: "Loops (for, while, do-while) são estruturas que repetem instruções enquanto uma condição permanecer verdadeira."
    }
];

let currentQuestion = 0, score = 0;
let categoryScore = { hardware: 0, software: 0, logica: 0 };
let categoryTotal = { hardware: 3, software: 3, logica: 3 };

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
        <div class="cat-item hardware">🖥️ Hardware: ${categoryScore.hardware}/${categoryTotal.hardware}</div>
        <div class="cat-item software">💾 Software: ${categoryScore.software}/${categoryTotal.software}</div>
        <div class="cat-item logica">🔢 Lógica: ${categoryScore.logica}/${categoryTotal.logica}</div>`;
    const feedbacks = ["📚 Continue estudando! A Informática é o futuro!", "📘 Bom esforço! Revise e tente novamente!", "👏 Muito bom! Você está quase expert!", "🏆 Perfeito! Você é um(a) verdadeiro(a) dev!"];
    document.getElementById('feedback-text').textContent = score <= 3 ? feedbacks[0] : score <= 5 ? feedbacks[1] : score <= 7 ? feedbacks[2] : feedbacks[3];
}

document.getElementById('next-btn').onclick = nextQuestion;
loadQuestion();
