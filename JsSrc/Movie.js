async function submitMovie() {
    console.log('here');

    const movieId = document.getElementById('movieId').value || null;
    const name = document.getElementById('name').value || null;
    const studio = document.getElementById('studio').value || null;
    const genre = document.getElementById('genre').value || null;
    const lengthHours = document.getElementById('length-hours').value || null;
    const lengthMinutes = document.getElementById('length-minutes').value || null;
    const rating = document.getElementById('rating').value || null;
    const summary = document.getElementById('summary').value || null;
    var rated = document.getElementById('rated').value || null;
    var director = document.getElementById('director').value || null;

    if (!(movieId && name && studio && genre && lengthHours && lengthMinutes && rating && summary && rated && director)) {
        alert("One or more of the fields were null!");
        return;
    }

    const request = {
        movieId: movieId,
        name: name,
        studio: studio,
        genre: genre,
        length: `${lengthHours}:${lengthMinutes}:0`,
        rating: rating,
        summary: summary,
        rated: rated,
        director: director
    }

    const res = await fetch(`http://localhost:8080/IMBDWebsiteBackEnd/MovieServlet`, {
        method: 'POST',
        body: JSON.stringify(request)
    });

    if (res.status == 409) {
        alert("Movie already existst!");
    }
}

export { submitMovie };