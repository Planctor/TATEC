export default function drop() {
	const card = document.querySelectorAll('.card');

	if (!card) {
		card.forEach((item) => {
			item.addEventListener('click', () => {
				const phr = this.querySelector('p');
				phr.classList.toggle('mostrar');
			});
		});
	}
}
