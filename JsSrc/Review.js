import { getCookie } from "/JsSrc/Cookies.js";
import { BACKEND_URL } from "/JsSrc/Config.js";

async function submitReview() {
    var review = document.getElementById('review-text').value;

    if (!review) {
        alert('You cannot leave an empty review!');
        return;
    }

    // getting the movie id
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const movieId = urlParams.get('movieId');

    const request = {
        "movieId": movieId,
        "comment": review
    }

    let resDel = await fetch(`${BACKEND_URL}MoviesCommentsServlet?movieId=${movieId}&userId=${getCookie("userId")}`, {
        method: 'DELETE'
    });

    let resPost = await fetch(`${BACKEND_URL}MoviesCommentsServlet?userId=${getCookie("userId")}`, {
        method: 'POST',
        body: JSON.stringify(request)
    });

    window.location.href = window.location.href;
}

async function deleteReview() {
    // getting the movie id
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const movieId = urlParams.get('movieId');

    let resDel = await fetch(`${BACKEND_URL}MoviesCommentsServlet?movieId=${movieId}&userId=${getCookie("userId")}`, {
        method: 'DELETE'
    });

    window.location.href = window.location.href;
}

export { submitReview, deleteReview };