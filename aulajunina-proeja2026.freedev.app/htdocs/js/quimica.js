// quimica.js
const canvas = document.getElementById('chem-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

class FlameParticle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 8;
        this.vy = (Math.random() - 0.5) * 8 - 3;
        this.color = color;
        this.alpha = 1;
        this.size = Math.random() * 8 + 4;
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= 0.02;
    }
    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
        ctx.fill();
        ctx.restore();
    }
}

function triggerExplosion(color, elementName) {
    document.getElementById('element-label').innerHTML = `<strong>Queima ativa:</strong> Saltos quânticos no átomo de <strong>${elementName}</strong> liberando fótons no comprimento de onda visível de cor ${color}.`;
    
    for(let i=0; i<80; i++) {
        particles.push(new FlameParticle(canvas.width/2, canvas.height/2, color));
    }
}

function loop() {
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.fillRect(0,0,canvas.width,canvas.height);

    particles.forEach((p, idx) => {
        p.update();
        p.draw();
        if(p.alpha <= 0) particles.splice(idx, 1);
    });
    requestAnimationFrame(loop);
}
loop();
