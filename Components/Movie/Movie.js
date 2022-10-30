import { getCookie } from "../../JsSrc/Cookies.js";

class Movie extends HTMLElement {
    constructor() {
        super();
    }

    setupInnerHTML(movie, commentsJson, usernames, liked) {
        let result = "";

        result += "<hr>";
        result += `<p>${movie.name}</p>`;
        result += `<p>${movie.studio}</p>`;
        result += `<p>${movie.length}</p>`;
        result += `<p>${movie.rating}</p>`;
        result += `<p>${movie.director}</p>`;
        result += `<p>${movie.likes}</p>`;
        result += `<input id="liked" onclick="toggleLike()" type=checkbox ${(liked) ? 'checked' : ''}></input>`
        result += `<p>${movie.summary}</p>`;
        result += "<hr>";

        let count = 0;
        for (let comment in commentsJson.moviescomments) {
            result += "<hr>";
            result += `<p>${usernames[count++]}</p>`;
            result += `<p>${commentsJson.moviescomments[comment].comment}</p>`;
            result += "<hr>";
        }

        return result;
    }

    async connectedCallback() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const movieId = urlParams.get('movieId');


        let movieRes = await fetch(`http://localhost:8080/IMBDWebsiteBackEnd/MovieServlet?movieId=${movieId}`);
        let movieJson = await movieRes.json();

        let commentsRes = await fetch(`http://localhost:8080/IMBDWebsiteBackEnd/MoviesCommentsServlet?movieId=${movieId}`);
        let commentsJson = await commentsRes.json();

        let userNames = [];
        for (let comment in commentsJson.moviescomments) {
            let userId = commentsJson.moviescomments[comment].userId;
            let userRes = await fetch(`http://localhost:8080/IMBDWebsiteBackEnd/UserServlet?userId=${userId}`);
            let userJson = await userRes.json();

            userNames.push(userJson.userName);
        }

        let likesRes = fetch(`http://localhost:8080/IMBDWebsiteBackEnd/MoviesLikesServlet?movieId=${movieId}&userId=${getCookie("userId")}`);
        let liked = false;

        // checking if user has liked post
        if ((await likesRes).status == 409) {
            liked = true;
        }

        this.innerHTML = this.setupInnerHTML(movieJson, commentsJson, userNames, liked);
    }
}

customElements.define('get-movie', Movie);
