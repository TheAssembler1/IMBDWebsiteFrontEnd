import { readFileAsync } from "./Files.js";
import { decodeMovieIdImageToImg } from '../../JsSrc/DecodeMovieIdImageToImg.js';

async function submitMovie() {
    const movieId = document.getElementById('movieId').value || null;
    const name = document.getElementById('name').value || null;
    const studio = document.getElementById('studio').value || null;
    const genre = document.getElementById('genre').value || null;
    const lengthHours = document.getElementById('length-hours').value || null;
    const lengthMinutes = document.getElementById('length-minutes').value || null;
    const rating = document.getElementById('rating').value || null;
    const summary = document.getElementById('summary').value || null;
    const rated = document.getElementById('rated').value || null;
    const director = document.getElementById('director').value || null;
    const image = document.getElementById('image').files[0] || null;
    let imageBinary = null;

    console.log(image.size);

    if (!(movieId && name && studio && genre && lengthHours && lengthMinutes && rating && summary && rated && director)) {
        alert("One or more of the fields were null!");
        return;
    };

    try {
        imageBinary = await readFileAsync(image);
    } catch (err) {
        console.error(err);
    }

    console.log('before------------------');
    var uint8ImageArray = new Uint8Array(imageBinary);

    console.log(uint8ImageArray);

    var stringImageBinary = new TextEncoder('UTF-8').encode(uint8ImageArray);

    const request = {
        movieId: movieId,
        name: name,
        studio: studio,
        genre: genre,
        length: `${lengthHours}:${lengthMinutes}:0`,
        rating: rating,
        summary: summary,
        rated: rated,
        director: director,
        image: stringImageBinary
    }
    console.log(request);

    const res = await fetch(`http://localhost:8080/IMBDWebsiteBackEnd/MovieServlet`, {
        method: 'POST',
        body: JSON.stringify(request)
    });

    if (res.status == 409) {
        alert("Movie already existst!");
    } else {
        window.location.href = "/";
    };
}

export { submitMovie };