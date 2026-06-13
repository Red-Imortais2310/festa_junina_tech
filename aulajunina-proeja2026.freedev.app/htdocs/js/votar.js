const API_LISTAR = '../php/listar_candidatos.php';
const API_VOTAR  = '../php/votar.php';

// ─────────────────────────────────────────
// NORMALIZAR CAMINHO DA FOTO
// ─────────────────────────────────────────
function getFotoSrc(foto) {
    if (!foto || foto.trim() === '') {
        return '../uploads/sem-foto.png';
    }
    if (foto.startsWith('http') || foto.startsWith('/')) {
        return foto;
    }
    if (foto.startsWith('uploads/')) {
        return '../' + foto;
    }
    return '../uploads/' + foto;
}

// ─────────────────────────────────────────
// CARREGAR CANDIDATOS
// ─────────────────────────────────────────
async function carregarCandidatos() {
    try {
        const response = await fetch(`${API_LISTAR}?t=${Date.now()}`, {
            method: 'GET',
            cache: 'no-store'
        });

        if (!response.ok) throw new Error('Erro ao buscar candidatos.');

        const dados = await response.json();

        if (!dados.sucesso) {
            alert('❌ Erro: ' + (dados.mensagem || 'Não foi possível carregar.'));
            return;
        }

        const candidatos = dados.candidatos;

        const gridMister = document.getElementById('grid-mister');
        const gridMiss   = document.getElementById('grid-miss');

        // ✅ Usa arrays para montar HTML — evita reflow do DOM a cada card
        const htmlMister = [];
        const htmlMiss   = [];

        if (gridMister) gridMister.innerHTML = '';
        if (gridMiss)   gridMiss.innerHTML   = '';

        let topMister = null;
        let topMiss   = null;

        const jaVotouMister = localStorage.getItem('junina_voto_mister') === 'true';
        const jaVotouMiss   = localStorage.getItem('junina_voto_miss')   === 'true';

        candidatos.forEach(c => {
            const votos  = Number(c.votos) || 0;

            if (c.categoria === 'Mister' && (!topMister || votos > Number(topMister.votos))) {
                topMister = c;
            }
            if (c.categoria === 'Miss' && (!topMiss || votos > Number(topMiss.votos))) {
                topMiss = c;
            }

            const jaVotou = c.categoria === 'Mister' ? jaVotouMister : jaVotouMiss;
            const fotoSrc = getFotoSrc(c.foto);

            // ✅ Escapa nome para evitar XSS no innerHTML
            const nomeSeguro = c.nome_social
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;');

            const cardHTML = `
                <div class="candidate-card glass-card" data-id="${c.id}">
                    <div class="photo-container">
                        <div class="flags-streamer"></div>
                        <div class="gender-icon-wrapper">
                            <img 
                                src="${fotoSrc}" 
                                alt="${nomeSeguro}" 
                                class="candidate-photo"
                                onerror="this.onerror=null; this.src='../uploads/sem-foto.png';"
                            >
                        </div>
                    </div>
                    <div class="candidate-info">
                        <h3>${nomeSeguro}</h3>
                        <button 
                            class="btn-vote" 
                            onclick="computarVoto(${c.id}, '${c.categoria}')"
                            ${jaVotou ? 'disabled' : ''}
                        >
                            ${jaVotou ? '✅ JÁ VOTADO' : '🗳️ VOTAR'}
                        </button>
                    </div>
                </div>
            `;

            if (c.categoria === 'Mister') htmlMister.push(cardHTML);
            if (c.categoria === 'Miss')   htmlMiss.push(cardHTML);
        });

        // ✅ Insere tudo de uma vez — muito mais eficiente
        if (gridMister) gridMister.innerHTML = htmlMister.join('');
        if (gridMiss)   gridMiss.innerHTML   = htmlMiss.join('');

        atualizarLideres(topMister, topMiss);

    } catch (err) {
        console.error('Erro ao carregar candidatos:', err);
        alert('❌ Não foi possível carregar os candidatos.');
    }
}

// ─────────────────────────────────────────
// ATUALIZAR LÍDERES NO TOPO
// ─────────────────────────────────────────
function atualizarLideres(mister, miss) {
    const nMister = document.getElementById('top-mister-name');
    const vMister = document.getElementById('top-mister-votes');
    const nMiss   = document.getElementById('top-miss-name');
    const vMiss   = document.getElementById('top-miss-votes');

    if (nMister) nMister.textContent = mister ? mister.nome_social : 'Nenhum ainda';
    if (vMister) vMister.textContent = mister ? mister.votos       : '0';
    if (nMiss)   nMiss.textContent   = miss   ? miss.nome_social   : 'Nenhuma ainda';
    if (vMiss)   vMiss.textContent   = miss   ? miss.votos         : '0';
}

// ─────────────────────────────────────────
// COMPUTAR VOTO
// ─────────────────────────────────────────
async function computarVoto(id, categoria) {
    const chaveLocal = categoria === 'Mister' ? 'junina_voto_mister' : 'junina_voto_miss';

    if (localStorage.getItem(chaveLocal) === 'true') {
        alert('🚫 Você já votou nesta categoria!');
        return;
    }

    const confirmar = confirm('Confirma seu voto neste candidato?');
    if (!confirmar) return;

    // ✅ Gera identificador único por dispositivo
    let matricula = localStorage.getItem('junina_matricula_device');
    if (!matricula) {
        matricula = 'device_' + Date.now() + '_' + Math.random().toString(36).substring(2, 8);
        localStorage.setItem('junina_matricula_device', matricula);
    }

    try {
        const formData = new FormData();
        formData.append('id',                id);
        formData.append('matricula_votante', matricula);
        formData.append('categoria_voto',    categoria);

        const response = await fetch(API_VOTAR, {
            method: 'POST',
            body: formData,
            cache: 'no-store'
        });

        if (!response.ok) throw new Error('Erro na requisição.');

        const dados = await response.json();

        if (dados.sucesso) {
            localStorage.setItem(chaveLocal, 'true');
            alert('✅ Voto registrado! Junina Tech agradece 🎉');
            await carregarCandidatos();
        } else {
            alert('❌ ' + (dados.mensagem || 'Erro ao votar. Tente novamente.'));
        }

    } catch (err) {
        console.error('Erro na requisição:', err);
        alert('❌ Não foi possível conectar ao servidor.');
    }
}

// ─────────────────────────────────────────
// INICIALIZAÇÃO
// ─────────────────────────────────────────
document.addEventListener('DOMContentLoaded', carregarCandidatos);
