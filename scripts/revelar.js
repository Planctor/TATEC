// Marca cada bloco com .em-cena quando ele entra na tela; o CSS então toca a animação por tempo.
// Assim a animação tem seu próprio ritmo e a rolagem nunca fica presa a ela.
const ALVOS = '.apresentacao .texto, .manifesto, .servico, .passos, .passo, .card, .titulo, [data-revelar]';

export default function revelar() {
    if (!('IntersectionObserver' in window)) return; // sem suporte: o CSS mostra tudo pronto

    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach((entrada) => {
            if (!entrada.isIntersecting) return;
            entrada.target.classList.add('em-cena');
            observador.unobserve(entrada.target); // anima uma vez só
        });
    }, { rootMargin: '0px 0px -10% 0px' });

    document.querySelectorAll(ALVOS).forEach((el) => observador.observe(el));
    document.documentElement.classList.add('cenas');
}
