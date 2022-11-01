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
    location.href = "/Html/User/sign-in.html";
}