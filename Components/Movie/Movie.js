import { getCookie } from "../../JsSrc/Cookies.js";
import { decodeMovieIdImageToImg } from '../../JsSrc/DecodeMovieIdImageToImg.js';

class Movie extends HTMLElement {
    constructor() {
        super();
    }

    async setupInnerHTML(movie, commentsJson, usernames, liked, userReview, movieId) {
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

        // getting the img with movie
        var img = await decodeMovieIdImageToImg(movieId);
        result += `<img src="${img.src}"></img>`;

        result += "<hr>";

        // for user to sbumit a review
        result += `<textarea id="review">${(!userReview) ? "" : userReview}</textarea>`;
        result += `<button onclick="submitReview()">Submit Review</button>`;
        result += `<button onclick="deleteReview()">Delete Review</button>`;


        if (Array.isArray(commentsJson.moviescomments)) {
            let count = 0;
            for (let comment in commentsJson.moviescomments) {
                result += "<hr>";
                result += `<p>${usernames[count++] || 'Anonymous'}</p>`;
                result += `<p>${commentsJson.moviescomments[comment].comment}</p>`;
                result += "<hr>";
            }
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

        let userReview = null;
        let userNames = [];

        if (Array.isArray(commentsJson.moviescomments)) {
            //removing dummy comment from front of the array
            commentsJson.moviescomments.shift();

            console.log(commentsJson.moviescomments.length)
            for (let i = 1; i < commentsJson.moviescomments.length; i++) {
                let userId = commentsJson.moviescomments[i].userId;

                let userRes = await fetch(`http://localhost:8080/IMBDWebsiteBackEnd/UserServlet?userId=${userId}`);
                let userJson = await userRes.json();

                if (getCookie("userId") == commentsJson.moviescomments[i].userId) {
                    userReview = commentsJson.moviescomments[i].comment;
                }

                console.log(JSON.stringify(userJson.userName));

                userNames.push(userJson.userName);
            }
        }

        let likesRes = fetch(`http://localhost:8080/IMBDWebsiteBackEnd/MoviesLikesServlet?movieId=${movieId}&userId=${getCookie("userId")}`);
        let liked = false;

        // checking if user has liked post
        if ((await likesRes).status == 409) {
            liked = true;
        }


        this.innerHTML = await this.setupInnerHTML(movieJson, commentsJson, userNames, liked, userReview, movieId);
    }
}

customElements.define('get-movie', Movie);
