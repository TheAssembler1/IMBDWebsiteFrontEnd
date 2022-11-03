import { BACKEND_URL, FRONTEND_URL } from "/JsSrc/Config.js";

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
    document.cookie = `name=userId; path=${FRONTEND_URL}; expires=` + new Date(0).toUTCString();
    document.cookie.split(";").forEach(function (c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + `;path=${FRONTEND_URL}`); });
}

function cookieExists(name) {
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));

    if (match) {
        return true;
    } else {
        return false;
    }
}

export { getCookie, deleteAllCookies, cookieExists };