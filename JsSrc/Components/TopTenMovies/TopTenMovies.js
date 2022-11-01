class TopTenMovies extends HTMLElement {
    constructor() {
        super();
    }

    setupInnerHTML(json) {
        let result = "";

        result += "<hr>";
        for (let movie in json.movies) {
            result += `<a href=/Core/movie.html?movieId=${json.movies[movie].movieId}>${json.movies[movie].name}</a>`;
            result += `<p>Production Studio: ${json.movies[movie].studio}</p>`;
            result += `<p>Length: ${json.movies[movie].length}</p>`;
            result += `<p>Rating: ${json.movies[movie].rating}</p>`;
            result += `<p>Director: ${json.movies[movie].director}</p>`;
            result += `<p>Likes: ${json.movies[movie].likes}</p>`;
            result += `<p>Summary ${json.movies[movie].summary}</p>`;
            result += `<img width="200" height="300" src="/images/${json.movies[movie].image}"></img>`;
            result += "<hr>";
        }

        return result;
    }

    connectedCallback() {
        fetch('http://localhost:8080/IMBDWebsiteBackEnd/TopTenMoviesServlet')
            .then(res => res.json())
            .then(json => {
                this.innerHTML = this.setupInnerHTML(json);
            })
            .catch(err => console.log(err));
    }
}

customElements.define('top-ten-movies', TopTenMovies);
