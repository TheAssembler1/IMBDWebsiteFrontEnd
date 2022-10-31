import { readFileAsync } from "./Files.js";

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

    /*if (!(movieId && name && studio && genre && lengthHours && lengthMinutes && rating && summary && rated && director)) {
        alert("One or more of the fields were null!");
        return;
    };*/

    try {
        imageBinary = await readFileAsync(image);
    } catch (err) {
        console.error(err);
    }

    console.log('before------------------');
    var uint8ImageArray = new Uint8Array(imageBinary);

    console.log(uint8ImageArray);

    //console.log(new TextEncoder('UTF-8').encode(uint8ImageArray));

    var img = document.createElement("img");

    img.src = URL.createObjectURL(
        new Blob([uint8ImageArray.buffer], { type: 'image/png' })
    );
    document.body.appendChild(img);

    /*const request = {
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

    console.log(request);*/

    /*const res = await fetch(`http://localhost:8080/IMBDWebsiteBackEnd/MovieServlet`, {
        method: 'POST',
        body: JSON.stringify(request)
    });*/

    /*if (res.status == 409) {
        alert("Movie already existst!");
    } else {
        //window.location.href = "/";
    };*/

    const newRes = await fetch(`http://localhost:8080/IMBDWebsiteBackEnd/MovieServlet?movieId=1`);
    const newJson = await newRes.json();
    console.log('after-----------------------');

    var arr = [];
    for (let byte in newJson.image) {
        arr.push(newJson.image[byte]);
    }

    var u8 = new Uint8Array(arr);
    var arrayBuffer = u8.buffer;


    const test = new TextDecoder().decode(new Uint8Array(arr));
    console.log(test);

    var iter = test.split(',');
    console.log(iter);
    var newArray = [];
    for (let num in test.split(',')) {
        newArray.push(test[num]);
    }

    var result = new Uint8Array(test.split(','));

    var another = document.createElement("img");
    another.src = URL.createObjectURL(
        new Blob([result.buffer], { type: 'image/png' })
    );
    document.body.appendChild(another);
    /*var b64encoded = btoa(newJson.image);

    var img = document.createElement("img");
    console.log("data:image/png;base64," + b64encoded);
    img.src = "data:image/png;base64," + b64encoded;
    document.body.appendChild(img);*/
}

export { submitMovie };