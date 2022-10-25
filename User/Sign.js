function SignUp(){
    const userName = document.getElementById("userName").value;
    const password = document.getElementById("password").value;

    const request = {
        userName: userName,
        password: password
    }

    console.log(JSON.stringify(request));

    fetch('http://localhost:8080/IMBDWebsiteBackEnd/SignUpServlet', {
        method: "POST",
        body: JSON.stringify(request),
    })
    .then(response => {
        // account already exists
        if(response.status == 409){
            alert('Account already exists!');
        }else if(response.status == 200){
            alert('Account created successfully!');

            // redirecting to homepage
            location.href = '/';
        }else{
            console.error('Uknown status code!');
        }
    })
    .catch(err => console.log(err));
}

function SignIn(){
    const userName = document.getElementById("userName").value;
    const password = document.getElementById("password").value;

    const request = {
        userName: userName,
        password: password
    }

    console.log(JSON.stringify(request));

    fetch('http://localhost:8080/IMBDWebsiteBackEnd/SignInServlet', {
        method: "POST",
        body: JSON.stringify(request),
    })
    .then(response => {
        if(response.status == 200){
            alert('Account created successfully!');

            // redirecting to homepage
            location.href = '/';
        }else{
            alert('Unknown account username and password!');
        }
    })
    .catch(err => console.log(err));
}