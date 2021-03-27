export default function view() {
    const secoes = document.querySelectorAll('main section')

    if (!!secoes) {
        document.addEventListener('scroll', () => {
            secoes.forEach((secao) => {
                const topo = secao.getBoundingClientRect().top < 300
                if (topo) {
                    secao.classList.add('ativo')
                }
            })
        })
    }
}
