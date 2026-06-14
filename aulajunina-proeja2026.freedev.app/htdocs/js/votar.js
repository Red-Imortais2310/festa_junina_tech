const API_LISTAR = '../php/listar_candidatos.php';
const API_VOTAR  = '../php/votar.php';

// =============================================
// NORMALIZAR CAMINHO DA FOTO - VERSÃO FINAL
// =============================================
function getFotoSrc(foto) {
    if (!foto || foto.trim() === '') {
        return '../uploads/sem-foto.png';
    }

    foto = foto.trim();

    // Remove "uploads/" duplicado se existir
    foto = foto.replace(/^uploads\//i, '');

    // Retorna caminho correto
    return '../uploads/' + foto;
}

// =============================================
// CARREGAR CANDIDATOS
// =============================================
async function carregarCandidatos() {
    try {
        const response = await fetch(`${API_LISTAR}?t=${Date.now()}`, { cache: 'no-store' });
        const dados = await response.json();

        if (!dados.sucesso) return;

        const candidatos = dados.candidatos || [];

        document.getElementById('grid-mister').innerHTML = '';
        document.getElementById('grid-miss').innerHTML = '';

        let topMister = null;
        let topMiss = null;

        const jaVotouMister = localStorage.getItem('junina_voto_mister') === 'true';
        const jaVotouMiss   = localStorage.getItem('junina_voto_miss')   === 'true';

        candidatos.forEach(c => {
            const votos = Number(c.votos) || 0;

            if (c.categoria === 'Mister' && (!topMister || votos > Number(topMister.votos || 0))) {
                topMister = c;
            }
            if (c.categoria === 'Miss' && (!topMiss || votos > Number(topMiss.votos || 0))) {
                topMiss = c;
            }

            const fotoSrc = getFotoSrc(c.foto);
            const nomeSeguro = (c.nome_social || '').replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'})[m] || m);

            const cardHTML = `
                <div class="candidate-card glass-card" data-id="${c.id}">
                    <div class="photo-container">
                        <div class="flags-streamer"></div>
                        <img src="${fotoSrc}" alt="${nomeSeguro}" class="candidate-photo"
                             onerror="this.onerror=null; this.src='../uploads/sem-foto.png';">
                    </div>
                    <div class="candidate-info">
                        <h3>${nomeSeguro}</h3>
                        <button class="btn-vote" onclick="computarVoto(${c.id}, '${c.categoria}')"
                            ${ (jaVotouMister && c.categoria==='Mister') || (jaVotouMiss && c.categoria==='Miss') ? 'disabled' : '' }>
                            ${ (jaVotouMister && c.categoria==='Mister') || (jaVotouMiss && c.categoria==='Miss') ? '✅ JÁ VOTADO' : '🗳️ VOTAR' }
                        </button>
                    </div>
                </div>
            `;

            if (c.categoria === 'Mister') document.getElementById('grid-mister').innerHTML += cardHTML;
            if (c.categoria === 'Miss')   document.getElementById('grid-miss').innerHTML += cardHTML;
        });

        atualizarLideres(topMister, topMiss);

    } catch (err) {
        console.error(err);
    }
}

// =============================================
// ATUALIZAR LÍDERES
// =============================================
function atualizarLideres(mister, miss) {
    document.getElementById('top-mister-name').textContent = mister ? mister.nome_social : 'Nenhum ainda';
    document.getElementById('top-mister-votes').textContent = mister ? mister.votos : '0';
    const pMister = document.getElementById('top-mister-photo');
    if (pMister) pMister.src = mister ? getFotoSrc(mister.foto) : '../uploads/sem-foto.png';

    document.getElementById('top-miss-name').textContent = miss ? miss.nome_social : 'Nenhuma ainda';
    document.getElementById('top-miss-votes').textContent = miss ? miss.votos : '0';
    const pMiss = document.getElementById('top-miss-photo');
    if (pMiss) pMiss.src = miss ? getFotoSrc(miss.foto) : '../uploads/sem-foto.png';
}

// =============================================
// COMPUTAR VOTO (simplificado)
// =============================================
async function computarVoto(id, categoria) {
    const chaveLocal = categoria === 'Mister' ? 'junina_voto_mister' : 'junina_voto_miss';

    if (localStorage.getItem(chaveLocal) === 'true') {
        alert('Você já votou nesta categoria!');
        return;
    }

    if (!confirm('Confirma seu voto?')) return;

    let matricula = localStorage.getItem('junina_matricula_device') || 'device_' + Date.now() + '_' + Math.random().toString(36).substring(2,8);
    localStorage.setItem('junina_matricula_device', matricula);

    try {
        const formData = new FormData();
        formData.append('id', id);
        formData.append('matricula_votante', matricula);
        formData.append('categoria_voto', categoria);

        const response = await fetch(API_VOTAR, { method: 'POST', body: formData });
        const dados = await response.json();

        if (dados.sucesso) {
            localStorage.setItem(chaveLocal, 'true');
            alert('✅ Voto registrado!');
            carregarCandidatos();
        } else {
            alert('❌ ' + (dados.erro || 'Erro ao votar'));
        }
    } catch (e) {
        alert('❌ Erro de conexão');
    }
}

document.addEventListener('DOMContentLoaded', carregarCandidatos);