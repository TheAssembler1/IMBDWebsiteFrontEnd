import { BACKEND_URL } from "/JsSrc/Config.js";

class RatingSelector extends HTMLElement {
    constructor() {
        super();
    }

    setupInnerHTML(ratings) {
        let result = "";

        result += `<label>Genre</label>`
        result += '<select name="rated">';

        for (let rate in ratings) {
            result += `<option value="${ratings[rate]}">${ratings[rate]}</option>`
        }

        result += '</select>';

        return result;
    }

    connectedCallback() {
        fetch(`${BACKEND_URL}MoviesRatesServlet`)
            .then(res => res.json())
            .then(json => {
                this.innerHTML = this.setupInnerHTML(json);
            })
            .catch(err => console.log(err));
    }
}

customElements.define('rating-selector', RatingSelector);