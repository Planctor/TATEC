export default function scroll() {
    const menuLinks = document.querySelectorAll('[data-menu="links"] li');
    const menuConteudo = document.querySelectorAll('[data-menu="conteudo"]');

    menuLinks.forEach((link, posicao) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();

            window.scrollTo({
                top: menuConteudo[posicao].offsetTop,
                behavior: 'smooth',
            });
        });
    });
}
