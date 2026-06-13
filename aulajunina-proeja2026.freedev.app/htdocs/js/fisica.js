// fisica.js
const canvas = document.getElementById('physics-canvas');
const ctx = canvas.getContext('2d');

let animationFrame;
let ball = { x: 50, y: 250, r: 10 };
const g = 9.81; // Força gravitacional teórica

function drawEnvironment() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Gramado da Copa
    ctx.fillStyle = '#004b23';
    ctx.fillRect(0, 250, canvas.width, 50);

    // Fogueira Alvo
    ctx.fillStyle = '#ff5e00';
    ctx.beginPath();
    ctx.arc(500, 250, 20, 0, Math.PI, true);
    ctx.fill();

    // Bola
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
    ctx.fill();
}

function launch(v0, angleDegrees) {
    cancelAnimationFrame(animationFrame);
    
    const angleRad = (angleDegrees * Math.PI) / 180;
    let t = 0;
    const startX = 50;
    const startY = 250;

    function run() {
        t += 0.15; // Velocidade temporal da renderização
        
        // Equações cinemáticas de Lançamento Oblíquo
        let x = startX + v0 * Math.cos(angleRad) * t;
        let y = startY - (v0 * Math.sin(angleRad) * t - 0.5 * g * Math.pow(t, 2));

        ball.x = x;
        ball.y = y;

        drawEnvironment();

        // Limite do solo ou colisão
        if (ball.y < 250 && ball.x < canvas.width) {
            animationFrame = requestAnimationFrame(run);
        } else {
            // Fim da trajetória
            ball.y = 250;
            drawEnvironment();
            // Verifica aproximação do centro do alvo (Fogueira)
            if (Math.abs(ball.x - 500) < 30) {
                alert("GOL JUNINO! Você acertou a fogueira central!");
            } else {
                alert("Chutou para fora! Ajuste o vetor de força e ângulo.");
            }
        }
    }
    run();
}

document.getElementById('vel-input').oninput = function() {
    document.getElementById('vel-val').textContent = this.value;
};
document.getElementById('ang-input').oninput = function() {
    document.getElementById('ang-val').textContent = this.value;
};

document.getElementById('fire-btn').onclick = function() {
    const v0 = parseFloat(document.getElementById('vel-input').value);
    const angle = parseFloat(document.getElementById('ang-input').value);
    launch(v0, angle);
};

drawEnvironment();
