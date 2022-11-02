import { BACKEND_URL } from "/JsSrc/Config.js";

class TopTenMovies extends HTMLElement {
    constructor() {
        super();
    }

    setupInnerHTML(json) {
        let result = "";

        for (let movieIndex in json.movies) {
            const movie = json.movies[movieIndex];
            result += '<div id="movie">';

            result += `<a id="title-text" href=/Html/Core/movie.html?movieId=${movie.movieId}>${movie.name}</a><br><br>`;
            // getting the img with movie
            result += `<img id="movie-image" width="200" height="300" src="/images/${movie.image}"></img>`;
            result += `<h4 id="movie-summary">${movie.summary}</h4>`;
            result += '<div id="movie-details">';
            result += `<p>Production Studio: ${movie.studio}</p>`;

            const time = movie.length.split(":");

            result += `<p>Length: ${time[0]} hrs ${time[1]} mins</p>`;
            result += `<p>Rating: ${movie.rating} / 10</p>`;
            result += `<p>Director: ${movie.director}</p>`;
            result += `<p>Likes ${movie.likes}</p>`
            result += '</div>';

            result += '</div>';
        }

        return result;
    }

    connectedCallback() {
        fetch(`${BACKEND_URL}TopTenMoviesServlet`)
            .then(res => res.json())
            .then(json => {
                this.innerHTML = this.setupInnerHTML(json);
            })
            .catch(err => console.log(err));
    }
}

customElements.define('top-ten-movies', TopTenMovies);
