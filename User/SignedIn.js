console.log('Checking if user is logged in!');

function cookieExists(name){
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));

    console.log(document.cookie);

    if(match){
        return true;
    }else{
        return false;
    }
}

function isUserLoggedIn(){
    if(cookieExists("userId")){
        return true;
    }else{
        return false;
    }
}

// redirecting if user is not logged in
if(!isUserLoggedIn()){
    location.href = "/User/sign-in.html";
}