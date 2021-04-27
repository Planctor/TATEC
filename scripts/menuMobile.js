export default function mobile() {

}

const menu = document.querySelector('.menu-mobile')
const links = document.querySelector('[data-menu="links"]')

if (!!menu & !!links) {
    menu.addEventListener('click', (event) => {
        event.target.classList.toggle('ativo')
        links.classList.toggle('ativo')
    })
}