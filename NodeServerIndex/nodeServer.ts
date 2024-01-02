

const express = require('express');

const app = express();

app.set('puerto', 2088);

//AGREGO FILE SYSTEM
const fs = require('fs');

//AGREGO JSON
app.use(express.json());

//AGREGO MULTER
const multer = require('multer');

//AGREGO MIME-TYPES
const mime = require('mime-types');

//AGREGO STORAGE
const storage = multer.diskStorage({

    destination: "public/profilePictures/",
});

const upload = multer({

    storage: storage
});



//AGREGO MYSQL y EXPRESS-MYCONNECTION
const mysql = require('mysql');
const myconn = require('express-myconnection');
const db_options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'indexdb'
};

//AGREGO MW 
app.use(myconn(mysql, db_options, 'single')); 

//AGREGO CORS (por default aplica a http://localhost)
const cors = require("cors");

//AGREGO MW 
app.use(cors());

//DIRECTORIO DE ARCHIVOS ESTÁTICOS
app.use(express.static("public"));

//AGRREGAR USUARIO BD
app.post('/addUserDB', upload.single(), (request:any, response:any)=>{
   
    let obj = request.body;
    obj.profilePicture = "profilePictures/defaultPicture.png";

    const emailExistsQuery = 'SELECT email FROM users WHERE email = ?';
    
    let obj_rta:any={};
    obj_rta.exito = true;
    obj_rta.mensaje = "Respuesta default";

    //variable para intervals
    let continuarInsercion = true


    request.getConnection((err:any, conn:any)=>{

        if(err){

            obj_rta.exito = false;
            obj_rta.mensaje = "Error al conectarse a la base de datos.";
            continuarInsercion = false;
        }
        else {
            conn.query(emailExistsQuery, [obj.email], (queryErr: any, results: any)=>{

                if (queryErr) {
                    obj_rta.exito = false;
                    obj_rta.mensaje = "Error al verificar el correo electrónico.";
                    continuarInsercion = false;
                }

                if (results.length > 0) {
                    // El correo electrónico ya está en uso, enviar mensaje de error
                    obj_rta.exito = false;
                    obj_rta.mensaje = "No es posible registrar un usuario con el mismo correo electrónico.";
                    continuarInsercion = false;
                }
                else
                {
                    conn.query("INSERT INTO users SET ?", [obj], (insertErr: any, insertResults: any) => {
                        if (insertErr) {
                            obj_rta.exito = false;
                            obj_rta.mensaje = "Error al agregar el nuevo usuario.";
                            continuarInsercion = false;
                        }
    
                        obj_rta.mensaje = "Usuario agregado a la BD";
                        continuarInsercion = false;
                    });
                }


            });
        }
    });

    // Espera a que todas las operaciones asíncronas finalicen para que obj_rta cambie
    //ya que conn.queey se ejecuta de manera asincrona
    const checkInterval = setInterval(() => {
        if (!continuarInsercion) 
        {
            clearInterval(checkInterval);
            response.send(JSON.stringify(obj_rta));
        }
    }, 100);

    //response.send(JSON.stringify(obj_rta));
});

//LISTADO USUARIOS BD
app.get('/usersList', (request:any, response:any)=>{

    request.getConnection((err:any, conn:any)=>{

        if(err)
        {
            console.log(err);
            //throw("Error al conectarse a la base de datos.");
            response.send(JSON.stringify("[]"));
        } 
        else
        {
            conn.query("select id, userName, email, password, profilePicture, profileLevel from users", (err:any, rows:any)=>{

                if(err) throw("Error en consulta de base de datos.");

                response.send(JSON.stringify(rows));
            });
        }
    });

});




app.listen(app.get('puerto'), ()=>{
    console.log('Servidor corriendo sobre puerto:', app.get('puerto'));
});