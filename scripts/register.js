const registerForm = document.querySelector("#registerForm");
registerForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    // get user info
    const email = registerForm["inputEmail"].value;
    const password = registerForm["inputPassword"].value;
    const passwordConfirm= registerForm["inputPasswordConfirm"].value;
    let correctPassword=true;
    let correctEmail=true;
    if(email.length===0){
        alert("Email field empty");
        correctEmail=false;
    }
    if(password.length!==passwordConfirm.length){
        alert("Password Mismatch");
        correctPassword=false;
    }
    else if(password.length<6){
        alert("Password length must be 6 or greater");
        correctPassword=false;
    }
    else if(password.length===0){
        alert("Password field empty");
        correctPassword=false;
    }
    else if(passwordConfirm.length===0){
        alert("Password confirmation field blank");
        correctPassword=false;
    }
    for(let i=0; i<password.length; i++){
        if(password.charAt(i)!==passwordConfirm.charAt(i)){
            alert("Password Mismatch");
            correctPassword=false;
            break;
        }
    }
    if(correctPassword && correctEmail){
        // sign up user
        auth.createUserWithEmailAndPassword(email, password).then(cred => {
            alert("Account created successfully");
            window.location.href="index.html";
        }).catch(function (error) {
            alert(error);
})}});