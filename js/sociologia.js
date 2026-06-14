// sociologia.js
const inputs = ['identidade', 'capital', 'copa'];

inputs.forEach(id => {
    document.getElementById(id).oninput = function() {
        document.getElementById(`val-${id}`).textContent = this.value;
        calcularImpacto();
    }
});

function calcularImpacto() {
    const identidade = parseFloat(document.getElementById('identidade').value);
    const capital = parseFloat(document.getElementById('capital').value);
    const copa = parseFloat(document.getElementById('copa').value);

    // Fórmulas de impacto ponderado
    const coesao = (identidade * 0.5) + (copa * 0.3) + (capital * 0.2);
    const resistencia = (identidade * 0.7) - (capital * 0.2) + 20;

    document.getElementById('bar-coesao').style.width = `${Math.min(100, Math.max(0, coesao))}%`;
    document.getElementById('bar-resistencia').style.width = `${Math.min(100, Math.max(0, resistencia))}%`;

    let veredito = "";
    if (coesao > 75) {
        veredito = "Excelente coesão social! A fusão com a Copa potencializou o orgulho patriótico, gerando fortalecimento cultural comunitário vigoroso.";
    } else if (coesao > 45) {
        veredito = "Nível equilibrado. A comunidade abraçou o aspecto comercial da Copa sem extinguir o DNA místico e religioso das fogueiras juninas.";
    } else {
        veredito = "Alerta sociológico: A hiper-comercialização turística e a influência midiática estão sobrepujando a essência tradicional comunitária do São João.";
    }

    document.getElementById('sociology-verdict').innerHTML = `<strong>Veredito:</strong> ${veredito}`;
}
calcularImpacto();
