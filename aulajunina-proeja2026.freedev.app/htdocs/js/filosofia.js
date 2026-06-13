// filosofia.js
document.getElementById('fire-dialectic').oninput = function() {
    const value = this.value;
    const shadow = document.getElementById('shadow-element');
    const quote = document.getElementById('philo-quote');

    // Altera blur, escala e opacidade da sombra simulando o fogo se aproximando da parede da caverna
    shadow.style.background = `rgba(255, 170, 0, ${value / 100})`;
    shadow.style.filter = `blur(${25 - (value * 0.2)}px)`;
    shadow.style.transform = `scale(${1 + (value * 0.015)}) skewX(${-15 + (value * 0.3)}deg)`;

    if(value > 80) {
        quote.innerHTML = "<strong>Visão Platonista:</strong> O fogo queima as ilusões! Você se libertou das correntes das aparências e agora enxerga a verdadeira Luz do conhecimento.";
    } else if (value > 30) {
        quote.innerHTML = "<strong>O Devir Constante:</strong> As faíscas que sobem aos céus representam o constante vir-a-ser. O cosmos é um fogo eternamente vivo.";
    } else {
        quote.innerHTML = '"Nada permanece imóvel... e nenhuma fogueira queima com o mesmo fogo." - Heráclito de Éfeso.';
    }
};
