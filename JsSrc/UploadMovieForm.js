import { BACKEND_URL } from "/JsSrc/Config.js";

async function uploadMovieForm() {
    const name = document.getElementsByName("name")[0].checkValidity();
    const image = document.getElementsByName("image")[0].checkValidity();
    const summary = document.getElementsByName("summary")[0].checkValidity();
    const movieId = document.getElementsByName("movieId")[0].checkValidity();
    const director = document.getElementsByName("director")[0].checkValidity();
    const studio = document.getElementsByName("studio")[0].checkValidity();
    const lengthHours = document.getElementsByName("lengthHours")[0].checkValidity();
    const lengthMinutes = document.getElementsByName("lengthMinutes")[0].checkValidity();
    const rating = document.getElementsByName("rating")[0];

    if (!(name && image & summary & movieId && director && studio && lengthHours && lengthMinutes && rating)) {
        console.log('invalid form!');
    } else {
        const res = await fetch(`${BACKEND_URL}MovieServlet`, {
            body: new FormData(document.getElementById("upload-movie-form")),
            method: "POST"
        });

        if (res.status == 409) {
            alert('Movie with movieId already exists');
        } else if (res.status == 200) {
            alert('Movie uploaded succesfully');
        }
    }
}

export { uploadMovieForm }