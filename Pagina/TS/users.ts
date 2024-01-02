

class Users
{
    public userName:string;
    public email:string;
    public password:string;
    public profilePicture:string;
    public id?:number;
    
    public constructor(userName:string, email:string, password:string, profilePicture:string, id?: number)
    {
        this.userName=userName;
        this.email=email;
        this.password=password;
        this.profilePicture=profilePicture;
        this.id=id;
    }

    public  toString():string
    {
        return `"id":"${this.id}", "userName":"${this.userName}","email": "${this.email}","password": "${this.password}","profilePicture": "${this.profilePicture}"`;
    }

    public toJSON() : string
    {
        return "{" + this.toString() + "}";
    }
    //finalizar alta de usuarios y dps validar inicio de secion con email y contrasena y JWT

    public static ValidateEmail(email:string):boolean
    {
        let response=true;
        
        // Expresión regular para validar el formato del email
        const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Validar el formato del email
        if (!regexCorreo.test(email)) 
        {
            response = false;
        }

        return response;
    }

    public static AddUserDB()
    {
        let xhttp : XMLHttpRequest = new XMLHttpRequest();

        let userName : string = ((<HTMLInputElement> document.getElementById("registerUsername")).value);
        let email : string = ((<HTMLInputElement> document.getElementById("registerEmail")).value);
        let password : string = ((<HTMLInputElement> document.getElementById("registerPassword")).value);
        let profilePicture = "profilePictures/defaultPicture.png";//lo creo con la foto default siempre, despuese la actualizo

        let validEmail=true;

        if(userName!="" && email!="" && password!="")
        {
            validEmail = this.ValidateEmail(email);

            if(validEmail==true)
            {
                let newUser : Users = new Users(userName, email, password, profilePicture);

                let formData : FormData = new FormData();
                
                xhttp.open("POST", "http://localhost:2088/addUserDB");
                formData.append('userName', newUser.userName);
                formData.append('email', newUser.email);
                formData.append('password', newUser.password);
                formData.append('profilePicture', newUser.profilePicture);

                //xhttp.setRequestHeader("enctype","multipart/form-data");

                xhttp.send(formData);

                xhttp.onreadystatechange = () =>{

                    console.log(xhttp.readyState + " - " + xhttp.status);
                    if (xhttp.readyState == 4 && xhttp.status == 200) 
                    {
                        console.log(xhttp.responseText);
                        alert(xhttp.responseText);

                    }
                };

            }
            else
            {
                alert("mail invalido");
            }
            
        }
        else
        {
            alert("Complete todos los campos");
        }
    }
}