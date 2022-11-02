import { BACKEND_URL } from "/JsSrc/Config.js";

function setUploadMovieForm() {
    document.getElementById("upload-movie-form").action = `${BACKEND_URL}MovieServlet`;
}

setUploadMovieForm();