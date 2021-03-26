export default function scroll() {
    const menuLinks = document.querySelectorAll('[data-menu="links"] li');
    const menuConteudo = document.querySelectorAll('[data-menu="conteudo"]')

    menuLinks.forEach((link, posicao) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const scroll = menuConteudo[posicao].offsetTop
            window.scrollTo({
                top: scroll,
                behavior: 'smooth'
            })
        })
    })
}
