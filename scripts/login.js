const logInForm = document.querySelector("#logInForm");
logInForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // get user info
    const email = logInForm['logInEmail'].value;
    const password = logInForm['logInPassword'].value;

    console.log(email);

    auth.signInWithEmailAndPassword(email, password).then(cred =>{
            window.location.href="index.html";
        }).catch(function (error) {
            alert(error);
        })
});

