import { cookieExists } from "../Cookies.js";

function isUserLoggedIn() {
    if (cookieExists("userId")) {
        return true;
    } else {
        return false;
    }
}

// redirecting if user is not logged in
if (!isUserLoggedIn()) {
    alert('User is not logged in!');

    location.href = "/Html/User/sign-in.html";
}