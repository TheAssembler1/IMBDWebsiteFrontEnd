import { BACKEND_URL } from "/JsSrc/Config.js";

class MovieOfTheDay extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        fetch(`${BACKEND_URL}MovieOfTheDayServlet`)
            .then(res => res.json())
            .then(json => {
                window.location.href = `/Html/Core/movie.html?movieId=${json.movieId}`
            })
            .catch(err => console.error(err));
    }
}

customElements.define('movie-of-the-day', MovieOfTheDay);
