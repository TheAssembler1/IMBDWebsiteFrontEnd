class MovieOfTheDay extends HTMLElement {
    constructor() {
        super();
    }

    setupInnerHTML(movie) {
        let result = "";

        result += "<hr>";
        result += `<p>${movie.name}</p>`;
        result += `<p>${movie.studio}</p>`;
        result += `<p>${movie.length}</p>`;
        result += `<p>${movie.rating}</p>`;
        result += `<p>${movie.director}</p>`;
        result += `<p>${movie.likes}</p>`;
        result += `<p>${movie.summary}</p>`;
        result += "<hr>";

        return result;
    }

    connectedCallback() {
        fetch('http://localhost:8080/IMBDWebsiteBackEnd/MovieOfTheDayServlet')
            .then(res => res.json())
            .then(json => {
                this.innerHTML = this.setupInnerHTML(json);
            })
            .catch(err => console.error(err));
    }
}

customElements.define('movie-of-the-day', MovieOfTheDay);
