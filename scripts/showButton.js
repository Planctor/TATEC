// Quando o conteúdo do topo sai da tela: fixa o menu e mostra o "voltar ao topo".
export default function show() {
    const btn = document.querySelector('[data-btn]');
    const hero = document.querySelector('.hero');

    if (!hero || !('IntersectionObserver' in window)) return;

    new IntersectionObserver(([entrada]) => {
        const rolou = !entrada.isIntersecting;
        document.body.classList.toggle('rolou', rolou);
        if (btn) btn.classList.toggle('visivel', rolou);
    }).observe(hero);
}
