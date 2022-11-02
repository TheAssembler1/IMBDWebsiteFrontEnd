import { BACKEND_URL } from "/JsSrc/Config.js";

class GenreSelector extends HTMLElement {
    constructor() {
        super();
    }

    setupInnerHTML(genres) {
        let result = "";

        result += `<label>Genre</label>`
        result += '<select name="genre">';

        for (let genre in genres) {
            result += `<option value="${genres[genre]}">${genres[genre]}</option>`
        }

        result += '</select>';

        return result;
    }

    connectedCallback() {
        fetch(`${BACKEND_URL}MoviesGenreServlet`)
            .then(res => res.json())
            .then(json => {
                this.innerHTML = this.setupInnerHTML(json);
            })
            .catch(err => console.log(err));
    }
}

customElements.define('genre-selector', GenreSelector);