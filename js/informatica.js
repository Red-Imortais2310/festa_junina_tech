// informatica.js
document.getElementById('binary-input').oninput = function() {
    const text = this.value;
    const container = document.getElementById('leds-container');
    const monitor = document.getElementById('binary-output');
    
    container.innerHTML = "";
    if (!text) {
        monitor.textContent = "00000000";
        return;
    }

    // Pega o código binário do primeiro caractere
    let binary = text.charCodeAt(0).toString(2);
    // Pad com zeros à esquerda
    while (binary.length < 8) { binary = "0" + binary; }
    
    monitor.textContent = binary;

    // Gera bandeirinhas com base nos bits acesos (1) ou apagados (0)
    for (let char of binary) {
        const led = document.createElement('div');
        led.className = "led";
        if (char === '1') {
            led.classList.add('on');
        }
        container.appendChild(led);
    }
};
