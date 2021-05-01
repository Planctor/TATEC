export default function drop() {
	const span = document.querySelectorAll('.card');

	function dropDown() {
		const phr = this.querySelector('p');
		phr.classList.toggle('mostrar');
	}

	span.forEach((item) => {
		item.addEventListener('click', dropDown);
	});
}
