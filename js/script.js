const canvas = document.getElementById('canvas-particles');
const ctx = canvas.getContext('2d');

let particles = [];
const colors = ['#004b23', '#38b000', '#ffd000', '#ffaa00', '#00e5ff'];

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * -canvas.height;
        this.sizeWidth = Math.random() * 15 + 10;
        this.sizeHeight = this.sizeWidth * 1.3;
        this.speedY = Math.random() * 2 + 1.5;
        this.speedX = Math.sin(Math.random() * Math.PI) * 0.8;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 1 - 0.5;
    }

    update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.rotation += this.rotationSpeed;

        if (this.y > canvas.height) {
            this.y = -20;
            this.x = Math.random() * canvas.width;
        }
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.fillStyle = this.color;
        
        ctx.beginPath();
        ctx.moveTo(-this.sizeWidth / 2, -this.sizeHeight / 2);
        ctx.lineTo(this.sizeWidth / 2, -this.sizeHeight / 2);
        ctx.lineTo(this.sizeWidth / 2, this.sizeHeight / 2);
        ctx.lineTo(0, this.sizeHeight / 4);
        ctx.lineTo(-this.sizeWidth / 2, this.sizeHeight / 2);
        ctx.closePath();
        ctx.fill();
        
        ctx.restore();
    }
}

function init() {
    particles = [];
    const count = Math.min(60, Math.floor(window.innerWidth / 20));
    for (let i = 0; i < count; i++) {
        particles.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animate);
}

window.addEventListener('scroll', () => {
    const video = document.getElementById('bg-video');
    const hero = document.querySelector('.hero-content');
    let scrollY = window.scrollY;
    
    if (video) {
        video.style.transform = `translate(-50%, calc(-50% + ${scrollY * 0.35}px))`;
    }
    if (hero) {
        hero.style.transform = `translateY(${scrollY * 0.2}px)`;
        hero.style.opacity = 1 - scrollY / 600;
    }
    window.addEventListener('scroll', () => {
    const video = document.getElementById('bg-video');
    const hero = document.querySelector('.hero-content');
    let scrollY = window.scrollY;
    
    if (video) {
        // Desloca o vídeo verticalmente mais devagar do que a velocidade normal da rolagem (fator 0.35)
        video.style.transform = `translate(-50%, calc(-50% + ${scrollY * 0.35}px))`;
    }
    if (hero) {
        // Empurra os textos do título ligeiramente e adiciona desvanecimento (fade-out) proporcional ao scroll
        hero.style.transform = `translateY(${scrollY * 0.2}px)`;
        hero.style.opacity = 1 - scrollY / 600;
    }
});

});

init();
animate();
