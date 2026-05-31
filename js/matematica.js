// matematica.js
const canvas = document.getElementById('math-canvas');
const ctx = canvas.getContext('2d');

function updateSymmetry() {
    const a = parseFloat(document.getElementById('mastro-height').value);
    const b = parseFloat(document.getElementById('mastro-base').value);

    document.getElementById('val-a').textContent = a;
    document.getElementById('val-b').textContent = b;

    // Teorema de Pitágoras
    const h = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
    document.getElementById('result-hypo').textContent = h.toFixed(2);

    drawTriangle(a, b);
}

function drawTriangle(a, b) {
    ctx.clearRect(0,0,canvas.width,canvas.height);

    const scale = 20; // Escala do desenho
    const originX = 100;
    const originY = 250;

    // Solo
    ctx.strokeStyle = '#38b000';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(10, originY);
    ctx.lineTo(390, originY);
    ctx.stroke();

    // Desenha Mastro (Altura 'a')
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(originX, originY);
    ctx.lineTo(originX, originY - (a * scale));
    ctx.stroke();

    // Desenha Base ('b')
    ctx.strokeStyle = '#ffd000';
    ctx.beginPath();
    ctx.moveTo(originX, originY);
    ctx.lineTo(originX + (b * scale), originY);
    ctx.stroke();

    // Desenha Hipotenusa/Cabo de bandeirinhas ('h')
    ctx.strokeStyle = '#ff0055';
    ctx.beginPath();
    ctx.moveTo(originX, originY - (a * scale));
    ctx.lineTo(originX + (b * scale), originY);
    ctx.stroke();

    // Adiciona bandeirinhas decorativas sobre a hipotenusa
    ctx.fillStyle = '#00e5ff';
    ctx.beginPath();
    ctx.arc(originX + (b*scale)/2, originY - (a*scale)/2, 6, 0, Math.PI*2);
    ctx.fill();
}

document.getElementById('mastro-height').oninput = updateSymmetry;
document.getElementById('mastro-base').oninput = updateSymmetry;

updateSymmetry();
