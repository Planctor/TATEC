// Consentimento de cookies (LGPD).
//
// Guarda a escolha em localStorage e avisa o resto do site:
//   window.tatecConsentimento()  -> { necessarios, estatisticas, marketing, data } ou null
//   evento 'tatec:consentimento' -> disparado em document quando a escolha muda
//
// Para carregar algo só com permissão (ex.: Google Analytics):
//   document.addEventListener('tatec:consentimento', (e) => {
//     if (e.detail.estatisticas) carregarAnalytics();
//   });

const CHAVE = 'tatec-consentimento';
// caminho da política a partir deste arquivo, para funcionar também em time/*.html
const POLITICA = new URL('../privacidade.html', import.meta.url).href;
const VERSAO = 1; // aumente quando as categorias mudarem, para pedir de novo

const CATEGORIAS = [
    {
        id: 'necessarios',
        nome: 'Necessários',
        descricao: 'Essenciais para o site funcionar, como lembrar esta escolha. Não podem ser desativados.',
        fixo: true,
    },
    {
        id: 'estatisticas',
        nome: 'Estatísticas',
        descricao: 'Ajudam a entender como o site é usado (páginas visitadas, tempo de visita), de forma agregada.',
    },
    {
        id: 'marketing',
        nome: 'Marketing',
        descricao: 'Permitem mostrar conteúdos e anúncios relevantes em outros sites e redes sociais.',
    },
];

function ler() {
    try {
        const salvo = JSON.parse(localStorage.getItem(CHAVE));
        return salvo && salvo.versao === VERSAO ? salvo : null;
    } catch {
        return null;
    }
}

function salvar(escolha) {
    const registro = {
        versao: VERSAO,
        necessarios: true,
        estatisticas: !!escolha.estatisticas,
        marketing: !!escolha.marketing,
        data: new Date().toISOString(),
    };
    try {
        localStorage.setItem(CHAVE, JSON.stringify(registro));
    } catch {
        // navegação privada ou armazenamento bloqueado: vale só para esta visita
    }
    document.dispatchEvent(new CustomEvent('tatec:consentimento', { detail: registro }));
    return registro;
}

function montar() {
    const aviso = document.createElement('section');
    aviso.className = 'cookie-aviso';
    aviso.setAttribute('aria-labelledby', 'cookie-aviso-titulo');
    aviso.innerHTML = `
        <h2 class="cookie-titulo" id="cookie-aviso-titulo">Sua privacidade</h2>
        <p>Hoje usamos só cookies necessários para o site funcionar. Estatística e marketing, se um dia forem usados, só com a sua permissão.
        Saiba mais na <a href="${POLITICA}">Política de Privacidade</a>.</p>
        <div class="cookie-acoes">
            <button type="button" class="cookie-botao cookie-botao-link" data-cookie="personalizar">Personalizar</button>
            <button type="button" class="cookie-botao cookie-botao-secundario" data-cookie="recusar">Recusar</button>
            <button type="button" class="cookie-botao cookie-botao-primario" data-cookie="aceitar">Aceitar todos</button>
        </div>`;

    const dialogo = document.createElement('dialog');
    dialogo.className = 'cookie-dialogo';
    dialogo.setAttribute('aria-labelledby', 'cookie-dialogo-titulo');
    dialogo.innerHTML = `
        <form method="dialog">
            <div class="cookie-dialogo-topo">
                <h2 class="cookie-titulo" id="cookie-dialogo-titulo">Preferências de cookies</h2>
                <button type="button" class="cookie-fechar" data-cookie="fechar" aria-label="Fechar">
                    <i class="fas fa-times" aria-hidden="true"></i>
                </button>
            </div>
            <p class="cookie-intro">Escolha quais cookies podemos usar. Você pode mudar isso quando quiser pelo link
            “Gerenciar cookies” no rodapé.</p>
            <ul class="cookie-lista">
                ${CATEGORIAS.map((c) => `
                <li>
                    <label class="cookie-categoria">
                        <span>
                            <strong>${c.nome}</strong>
                            <small>${c.descricao}</small>
                        </span>
                        <input type="checkbox" role="switch" name="${c.id}" ${c.fixo ? 'checked disabled' : ''}>
                    </label>
                </li>`).join('')}
            </ul>
            <div class="cookie-acoes">
                <button type="button" class="cookie-botao cookie-botao-secundario" data-cookie="salvar">Salvar preferências</button>
                <button type="button" class="cookie-botao cookie-botao-primario" data-cookie="aceitar">Aceitar todos</button>
            </div>
        </form>`;

    document.body.append(aviso, dialogo);
    return { aviso, dialogo };
}

export default function cookies() {
    const { aviso, dialogo } = montar();
    const campos = dialogo.querySelectorAll('input[type="checkbox"]:not([disabled])');

    function mostrarAviso(mostrar) {
        aviso.classList.toggle('visivel', mostrar);
        aviso.inert = !mostrar;
    }

    function preencher() {
        const atual = ler() || {};
        campos.forEach((campo) => {
            campo.checked = !!atual[campo.name];
        });
    }

    function abrirPreferencias() {
        preencher();
        dialogo.showModal();
    }

    function decidir(escolha) {
        salvar(escolha);
        mostrarAviso(false);
        if (dialogo.open) dialogo.close();
    }

    document.addEventListener('click', (e) => {
        const alvo = e.target.closest('[data-cookie], [data-cookies]');
        if (!alvo) return;

        if (alvo.matches('[data-cookies]')) {
            e.preventDefault();
            abrirPreferencias();
            return;
        }

        const acao = alvo.dataset.cookie;
        if (acao === 'aceitar') decidir({ estatisticas: true, marketing: true });
        if (acao === 'recusar') decidir({});
        if (acao === 'personalizar') abrirPreferencias();
        if (acao === 'fechar') dialogo.close();
        if (acao === 'salvar') {
            const escolha = {};
            campos.forEach((campo) => {
                escolha[campo.name] = campo.checked;
            });
            decidir(escolha);
        }
    });

    // Clique no fundo escuro fecha as preferências.
    dialogo.addEventListener('click', (e) => {
        if (e.target === dialogo) dialogo.close();
    });

    window.tatecConsentimento = ler;

    const atual = ler();
    if (atual) {
        document.dispatchEvent(new CustomEvent('tatec:consentimento', { detail: atual }));
        mostrarAviso(false);
    } else {
        // pequeno atraso para o aviso não competir com a entrada do topo
        mostrarAviso(false);
        setTimeout(() => mostrarAviso(true), 600);
    }
}
