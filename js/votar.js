// votar.js - Controle do Concurso Mister & Miss Junina 2026

// Usando caminho relativo, já que votar.php está na mesma pasta raiz do projeto
const API_URL = 'votar.php';

// 1. Função para buscar e exibir os candidatos na tela
function carregarCandidatos() {
    // Aponta para a ação de listagem do seu novo votar.php
    fetch(`${API_URL}?action=listar`)
        .then(response => response.json())
        .then(candidatos => {
            const containerMister = document.getElementById('container-mister');
            const containerMiss = document.getElementById('container-miss');
            
            if(containerMister) containerMister.innerHTML = '';
            if(containerMiss) containerMiss.innerHTML = '';

            candidatos.forEach(candidato => {
                // HTML purificado: sem nenhum estilo inline, apenas classes para o CSS ler
                const cardHtml = `
                    <div class="slot-card">
                        <img src="${candidato.foto_caminho}" alt="${candidato.nome}" class="candidate-photo">
                        <h3>${candidato.nome}</h3>
                        <p>${candidato.curso}</p>
                        <button class="btn-votar" onclick="votarNoCandidato(${candidato.id})">
                            Votar (${candidato.votos})
                        </button>
                    </div>
                `;

                // Separação por categoria vinda do banco
                if (candidato.categoria === 'Mister' && containerMister) {
                    containerMister.innerHTML += cardHtml;
                } else if (candidato.categoria === 'Miss' && containerMiss) {
                    containerMiss.innerHTML += cardHtml;
                }
            });
        })
        .catch(err => console.error("Erro ao carregar os candidatos:", err));
}

// 2. Função que envia o voto para o servidor quando o usuário clica no botão
function votarNoCandidato(idCandidato) {
    // Envia o POST direto para o seu votar.php
    fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `id=${idCandidato}`
    })
    .then(response => response.json())
    .then(dados => {
        if (dados.sucesso) {
            alert("Voto registrado com sucesso! Junina Tech agradece.");
            carregarCandidatos(); // Recarrega os cards para atualizar o contador de votos na tela
        } else {
            alert("Erro ao registrar voto: " + dados.erro);
        }
    })
    .catch(err => {
        console.error("Erro na requisição de voto:", err);
        alert("Não foi possível conectar ao servidor de votação.");
    });
}

// Inicia o carregamento assim que a página abrir
document.addEventListener('DOMContentLoaded', carregarCandidatos);