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

        const animaMutation = document.querySelectorAll('[data-anima]')
        const animaArray = Array.from(animaMutation)
        animaArray.forEach((data) => {
            function observador() {
                const filhos = data.children
                data.classList.add('animacao')
                filhos[0].classList.add('animacaoEsquerda')
                filhos[1].classList.add('animacaoDireita')

                mutacao.disconnect()
            }
            const mutacao = new MutationObserver(observador)
            return mutacao.observe(data, { attributes: true })
        })

    }
    
}
