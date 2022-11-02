import { BACKEND_URL } from "/JsSrc/Config.js";

async function searchMovie() {
    const name = document.getElementById('searchName').value;

    console.log(name);

    if (!name) {
        alert("Search cannot be empty!");
        return;
    }

    const res = await fetch(`${BACKEND_URL}MovieExistsServlet?name=${name}`);

    if (res.status == 404) {
        alert('Movie does not exist!');
        return;
    }

    const json = await res.json();
    const movieId = json.movieId;

    window.location.href = `/Html/Core/movie.html?movieId=${movieId}`;
}

export { searchMovie };