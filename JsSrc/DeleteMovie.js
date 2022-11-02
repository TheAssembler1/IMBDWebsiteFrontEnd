import { BACKEND_URL } from "/JsSrc/Config.js";

async function deleteMovie() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const movieId = urlParams.get('movieId');

    console.log(`${BACKEND_URL}MovieServlet?movieId=${movieId}`);
    let res = await fetch(`${BACKEND_URL}MovieServlet?movieId=${movieId}`, {
        method: 'DELETE'
    });

    window.location.href = "/";
}

export { deleteMovie };