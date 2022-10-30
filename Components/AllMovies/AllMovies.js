class AllMovies extends HTMLElement {
    constructor() {
        super();
    }

    setupInnerHTML(json) {
        let result = "";

        result += "<hr>";
        for (let movie in json.movies) {
            result += `<a href=/Core/movie.html?movieId=${json.movies[movie].movieId}>${json.movies[movie].name}</a>`;
            result += `<p>${json.movies[movie].studio}</p>`;
            result += `<p>${json.movies[movie].length}</p>`;
            result += `<p>${json.movies[movie].rating}</p>`;
            result += `<p>${json.movies[movie].director}</p>`;
            result += `<p>${json.movies[movie].likes}</p>`;
            result += `<p>${json.movies[movie].summary}</p>`;
            result += "<hr>";
        }

        return result;
    }

    connectedCallback() {
        fetch('http://localhost:8080/IMBDWebsiteBackEnd/MoviesServlet')
            .then(res => res.json())
            .then(json => {
                this.innerHTML = this.setupInnerHTML(json);
            })
            .catch(err => console.log(err));
    }
}

customElements.define('all-movies', AllMovies);