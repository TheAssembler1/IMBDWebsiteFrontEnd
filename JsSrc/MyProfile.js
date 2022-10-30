import getCookie from "./Cookies.js";

function setUserProfile(user) {
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
}

function getUserProfile() {
    let result = {};

    fetch(`http://localhost:8080/IMBDWebsiteBackEnd/UserServlet?userId=${getCookie("userId")}`)
        .then(result => {
            return result.json();
        })
        .then(json => {
            result = json;

            setUserProfile(result);
        })
        .catch(err => console.error(err));
}

export { setUserProfile, getUserProfile };