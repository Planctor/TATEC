export default function mobile() {
    const menu = document.querySelector('.menu-mobile div');
    const links = document.querySelector('[data-menu="links"]');

    function ativar(event) {
        event.target.classList.toggle('ativo');
        links.classList.toggle('ativo');
    }

    menu.addEventListener('click', ativar);
}
