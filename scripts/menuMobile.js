export default function mobile() {
    const menu = document.querySelector('.menu-mobile div');
    const links = document.querySelector('[data-menu="links"]');
    const tipos = ['touchstart', 'click'];

    function ativar(event) {
        event.target.classList.toggle('ativo');
        links.classList.toggle('ativo');
    }

    tipos.forEach((tipo) => {
        menu.addEventListener(tipo, ativar);
    })
}
