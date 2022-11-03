class NavBar extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		fetch(`JsSrc/Components/NavBar/nav-bar.html`)
			.then((response) => response.text())
			.then((text) => {
				this.innerHTML = text;
			})
			.catch((err) => {
				console.log(err);
			});
	}
}

customElements.define('nav-bar', NavBar);
