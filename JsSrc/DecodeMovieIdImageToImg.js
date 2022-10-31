async function decodeMovieIdImageToImg(movieId) {
    const res = await fetch(`http://localhost:8080/IMBDWebsiteBackEnd/MovieServlet?movieId=${movieId}`);
    const json = await res.json();

    var byteArray = [];
    for (let byte in json.image) {
        byteArray.push(json.image[byte]);
    }

    const decodedImage = new TextDecoder().decode(new Uint8Array(byteArray));
    const result = new Uint8Array(decodedImage.split(','));

    var img = document.createElement("img");
    img.src = URL.createObjectURL(
        new Blob([result.buffer], { type: 'image/png' })
    );

    return img;
}

export { decodeMovieIdImageToImg };