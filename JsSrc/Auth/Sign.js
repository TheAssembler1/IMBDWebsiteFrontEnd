import { deleteAllCookies } from "../Cookies.js";

function SignUp() {
    const userName = document.getElementById("userName").value;
    const password = document.getElementById("password").value;

    const request = {
        userName: userName,
        password: password
    }

    fetch('http://localhost:8080/IMBDWebsiteBackEnd/SignUpServlet', {
        method: "POST",
        body: JSON.stringify(request),
    })
        .then(response => {
            // account already exists
            if (response.status == 409) {
                alert('Account already exists!');
            } else if (response.status == 200) {
                alert('Account created successfully!');
            } else {
                console.error('Uknown status code!');
            }

            return response.json();
        })
        .then(json => {
            // clearing cookies
            deleteAllCookies();

            // setting userId cookie
            document.cookie = `userId=${json}; path=/`;

            // sending user to homescreen
            location.href = "/";
        })
        .catch(err => console.error(err));
}

function SignIn() {
    const userName = document.getElementById("userName").value;
    const password = document.getElementById("password").value;

    const request = {
        userName: userName,
        password: password
    }

    fetch('http://localhost:8080/IMBDWebsiteBackEnd/SignInServlet', {
        method: "POST",
        body: JSON.stringify(request),
    })
        .then(response => {
            if (response.status == 200) {
                alert('User logged in successfully!');
            } else {
                alert('Unknown account username and password!');
            }

            return response.json();
        })
        .then(json => {
            // clearing cookies
            deleteAllCookies();

            // setting userId cookie
            document.cookie = `userId=${json}; path=/`;

            // sending user to homescreen
            location.href = "/";
        })
        .catch(err => console.error(err));
}

export { SignIn, SignUp }