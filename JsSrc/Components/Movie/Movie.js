import { getCookie } from "/JsSrc/Cookies.js";
import { BACKEND_URL } from "/JsSrc/Config.js";

class Movie extends HTMLElement {
    constructor() {
        super();
    }

    async setupInnerHTML(movie, commentsJson, usernames, liked, userReview, movieId) {
        let result = "";

        result += '<div id="movie">';

        result += `<h1 id="title">${movie.name}</h1>`;
        // getting the img with movie
        result += `<img id="movie-image" width="200" height="300" src="/images/${movie.image}"></img>`;
        result += '<div id="movie-details">';
        result += `<p>Production Studio: ${movie.studio}</p>`;
        result += `<p>Length: ${movie.length}</p>`;
        result += `<p>Rating: ${movie.rating}</p>`;
        result += `<p>Director: ${movie.director}</p>`;
        result += `<p>Likes: ${movie.likes}</p>`;
        result += '</div>';
        result += `Like<input id="liked" onclick="toggleLike()" type=checkbox ${(liked) ? 'checked' : ''}></input>`
        result += `<h4 id="movie-summary">Summary: ${movie.summary}</h4>`;

        result += '</div>';

        // for user to sbumit a review
        result += '<h1>Write a review:</h1>';
        result += `<textarea id="review-box">${(!userReview) ? "" : userReview}</textarea>`;
        result += `<button onclick="submitReview()">Submit Review</button>`;
        result += `<button onclick="deleteReview()">Delete Review</button>`;

        result += '<div id="comments">';

        if (Array.isArray(commentsJson.moviescomments)) {
            let count = 0;
            for (let comment in commentsJson.moviescomments) {
                result += '<div class="comment">';
                result += `<p class="comment-username">${usernames[count++] || 'Anonymous'}</p>`;
                result += `<p>${commentsJson.moviescomments[comment].comment}</p>`;
                result += "</div>";
            }
        }

        result += "</div>";

        return result;
    }

    async connectedCallback() {

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const movieId = urlParams.get('movieId');

        let movieRes = await fetch(`${BACKEND_URL}MovieServlet?movieId=${movieId}`);
        let movieJson = await movieRes.json();

        let commentsRes = await fetch(`${BACKEND_URL}MoviesCommentsServlet?movieId=${movieId}`);
        let commentsJson = await commentsRes.json();

        let userReview = null;
        let userNames = [];

        if (Array.isArray(commentsJson.moviescomments)) {
            //removing dummy comment from front of the array
            commentsJson.moviescomments.shift();

            for (let i = 0; i < commentsJson.moviescomments.length; i++) {
                let userId = commentsJson.moviescomments[i].userId;

                let userRes = await fetch(`${BACKEND_URL}UserServlet?userId=${userId}`);
                let userJson = await userRes.json();

                if (getCookie("userId") == commentsJson.moviescomments[i].userId) {
                    userReview = commentsJson.moviescomments[i].comment;
                }


                userNames.push(userJson.userName);
            }
        }

        let likesRes = fetch(`${BACKEND_URL}MoviesLikesServlet?movieId=${movieId}&userId=${getCookie("userId")}`);
        let liked = false;

        // checking if user has liked post
        if ((await likesRes).status == 409) {
            liked = true;
        }


        this.innerHTML = await this.setupInnerHTML(movieJson, commentsJson, userNames, liked, userReview, movieId);
    }
}

customElements.define('get-movie', Movie);
