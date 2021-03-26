export default function scroll() {
    const menuLinks = document.querySelectorAll('[data-menu="links"] li')

    menuLinks.forEach((lista) => {
        lista.addEventListener('click', scrollView)
    })

    function scrollView(e) {
        e.preventDefault()
        const item = e.target.getAttribute('href')
        const selecionar = document.querySelector(item)

        selecionar.scrollIntoView({
            behavior: "smooth",
            block: "center",
        })
    }
}
