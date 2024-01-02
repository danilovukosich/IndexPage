//variables 
let isDarkMode = false;// DarkLightMode() se lee esta variable una sola vez al cargar la pagina.



//js botones
function LogIn():void
{
    window.location.href = 'main.html';
}

function DarkLightMode():void
{
    const body = document.body;
    const newImage = isDarkMode ? 'BackgroundLight.jpg' : 'BackgroundDark.png';
    //si isdarkmode es true determina como newimage light, si el false se pone dark

    body.style.backgroundImage = `url('./Estilos/Imagenes/${newImage}')`;

    isDarkMode = !isDarkMode;
}

function ShowHidePassword():void
{
      
    let eyeIcon:any = document.getElementById('eyeIcon');
    let password:any = document.getElementById('password-login');

    
    if(password.type == "password")
    {
        password.type = "text";
        eyeIcon.className = "bx bxs-hide";
        
    }
    else
    {
        eyeIcon.className = "bx bxs-show";
        password.type = "password"
    }   
}

function LogInRegisterButton():void
{
    const container:any = document.querySelector('.container');

    container.classList.add('active');
}

function RegisterLogInButton():void
{
    const container:any = document.querySelector('.container');

    container.classList.remove('active');
}


