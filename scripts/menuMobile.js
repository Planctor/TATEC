export default function mobile() {
    const botao = document.querySelector('[data-menu="botao"]');
    const links = document.querySelector('[data-menu="links"]');

    function alternar(abrir) {
        botao.setAttribute('aria-expanded', abrir);
        botao.setAttribute('aria-label', abrir ? 'Fechar menu' : 'Abrir menu');
        links.classList.toggle('ativo', abrir);
    }

    botao.addEventListener('click', () => {
        alternar(botao.getAttribute('aria-expanded') !== 'true');
    });

    // Fecha ao escolher um link, com Esc ou clicando fora.
    links.addEventListener('click', (e) => {
        if (e.target.closest('a')) alternar(false);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && links.classList.contains('ativo')) {
            alternar(false);
            botao.focus();
        }
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav')) alternar(false);
    });
}
