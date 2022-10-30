class RatingSelector extends HTMLElement {
    constructor() {
        super();
    }

    setupInnerHTML(ratings) {
        let result = "";

        result += `<label>Genre</label>`
        result += '<select>';

        for (let rate in ratings) {
            result += `<option value="${ratings[rate]}">${ratings[rate]}</option>`
        }

        result += '</select>';

        return result;
    }

    connectedCallback() {
        fetch('http://localhost:8080/IMBDWebsiteBackEnd/MoviesRatesServlet')
            .then(res => res.json())
            .then(json => {
                console.log(JSON.stringify(json));
                this.innerHTML = this.setupInnerHTML(json);
            })
            .catch(err => console.log(err));
    }
}

customElements.define('rating-selector', RatingSelector);