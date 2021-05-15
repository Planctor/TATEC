export default function scroll() {
    const menuLinks = document.querySelectorAll('[data-menu="links"] li');
    const menuConteudo = document.querySelectorAll('[data-menu="conteudo"]');

    function scrollA(event, posicao) {
        event.preventDefault();

        window.scrollTo({
            top: menuConteudo[posicao].offsetTop,
            behavior: 'smooth',
        });
    }

    menuLinks.forEach((link, posicao) => {
        link.addEventListener('click', (e) => {
            scrollA(e, posicao);
        });
    });
}
