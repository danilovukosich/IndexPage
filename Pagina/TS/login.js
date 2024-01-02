"use strict";
//variables 
let isDarkMode = false; // DarkLightMode() se lee esta variable una sola vez al cargar la pagina.
//js botones
function LogIn() {
    window.location.href = 'main.html';
}
function DarkLightMode() {
    const body = document.body;
    const newImage = isDarkMode ? 'BackgroundLight.jpg' : 'BackgroundDark.png';
    //si isdarkmode es true determina como newimage light, si el false se pone dark
    body.style.backgroundImage = `url('./Estilos/Imagenes/${newImage}')`;
    isDarkMode = !isDarkMode;
}
function ShowHidePassword() {
    let eyeIcon = document.getElementById('eyeIcon');
    let password = document.getElementById('password-login');
    if (password.type == "password") {
        password.type = "text";
        eyeIcon.className = "bx bxs-hide";
    }
    else {
        eyeIcon.className = "bx bxs-show";
        password.type = "password";
    }
}
function LogInRegisterButton() {
    const container = document.querySelector('.container');
    container.classList.add('active');
}
function RegisterLogInButton() {
    const container = document.querySelector('.container');
    container.classList.remove('active');
}
//# sourceMappingURL=login.js.map