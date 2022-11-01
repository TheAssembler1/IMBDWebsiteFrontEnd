import { getCookie } from "/JsSrc/Cookies.js";

async function toggleLike() {
    var liked = document.getElementById('liked').checked;

    // getting the movieId from url
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const movieId = urlParams.get('movieId');

    if (liked === false) {
        await fetch(`http://localhost:8080/IMBDWebsiteBackEnd/MoviesLikesServlet?movieId=${movieId}&userId=${getCookie("userId")}`, {
            method: 'DELETE'
        });
    } else {
        await fetch(`http://localhost:8080/IMBDWebsiteBackEnd/MoviesLikesServlet?movieId=${movieId}&userId=${getCookie("userId")}`, {
            method: 'POST'
        });
    }

    window.location.href = window.location.href;
}

export { toggleLike };