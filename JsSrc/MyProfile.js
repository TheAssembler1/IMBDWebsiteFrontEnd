import { getCookie, deleteAllCookies } from "/JsSrc/Cookies.js";
import { BACKEND_URL } from "/JsSrc/Config.js";

function setUserProfile(user, refresh) {
    var firstName = document.getElementById("firstName");
    var middleName = document.getElementById("middleName");
    var lastName = document.getElementById("lastName");
    var email = document.getElementById("email");
    var birthDate = document.getElementById("birthDate");

    // setting front end values
    firstName.value = user.firstName || null;
    middleName.value = user.middleName || null;
    lastName.value = user.lastName || null;
    email.value = user.email || null;
    birthDate.value = user.birthDate || null;

    if (refresh) {
        window.location.href = '/JsSrc//User/my-profile.html';
    }
}

async function updateUserProfile() {
    var firstName = document.getElementById("firstName").value;
    var middleName = document.getElementById("middleName").value;
    var lastName = document.getElementById("lastName").value;
    var email = document.getElementById("email").value;
    var birthDate = document.getElementById("birthDate").value;

    let request = {
        "firstName": firstName || null,
        "middleName": middleName || null,
        "lastName": lastName || null,
        "email": email || null,
        "birthDate": birthDate || null
    };

    let res = await fetch(`${BACKEND_URL}UserServlet?userId=${getCookie("userId")}`, {
        method: "PUT",
        body: JSON.stringify(request)
    })
        .then(res => {
            window.location.href = "/JsSrc/User/my-profile.html";
        })
        .catch(err => console.error(err));
}

function getUserProfile() {
    let result = {};

    fetch(`${BACKEND_URL}UserServlet?userId=${getCookie("userId")}`)
        .then(result => {
            return result.json();
        })
        .then(json => {
            result = json;

            setUserProfile(result, false);
        })
        .catch(err => console.error(err));
}

function signOutUser() {
    deleteAllCookies();
    window.location.href = "/";
}

getUserProfile();

export { signOutUser, updateUserProfile, setUserProfile, getUserProfile };