export default function show() {
    const btn = document.querySelector('.voltarTopo');
    const header = document.querySelector('[data-topo]');
    const limite = header.clientHeight;
    const debouced = deb(scroll, 200);

    function deb(funcao, delay) {
        let timer;
        return () => {
            if (timer) {
                clearInterval(timer);
            }
            timer = setTimeout(() => {
                funcao();
                timer = null;
            }, delay);
        };
    }

    function scroll() {
        if (window.scrollY > limite) {
            btn.style.display += 'block';
        } else if (window.scrollY < limite) {
            btn.removeAttribute('style');
        }
    }

    window.addEventListener('scroll', debouced);
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const topo = btn.attributes[0].textContent;
        const subir = document.getElementById(topo);

        subir.scrollIntoView({
            behavior: 'smooth',
        });
    });
}
