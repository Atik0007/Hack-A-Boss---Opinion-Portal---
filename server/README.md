# Portal de opiniones.

​
Implementar una API que permita publicar opiniones sobre cualquier tema y que otras
personas puedan verlas.
​

## Instalar

​

-   Crear una base de datos vacía en una instancia de MySQL local.
    ​
-   Guardar el archivo .env.example como .env y cubrir los datos necesarios.
    ​
-   Ejecutar npm run initDB para crear las tablas necesarias en la base de datos anteriormente creada.
    ​
-   Ejecutar npm run dev o npm start para lanzar el servidor.
    ​
-   Instalar npm i -D nodemon prettier eslint morgan Que son dependencias de desarrollo.
    ​
-   Instalar npm i express dotenv mysql2 bcrypt jsonwebtoken
    ​
    Crear token de usuarios
    ​

## Entidades

​

-   User:
    -   id
    -   email
    -   password
    -   createdAt
    -   modifiedAt
        ​
-   Opinions:
    -   id
    -   idUser
    -   text
    -   createdAt
    -   modifiedAt

## Endpoints

​
User:​

-   POST [/user] - Registro de usuario
    ​
-   GET [/user/:id] - Devuelve información de usuario
    ​
-   GET [/user] - Devuelve información del usuario del token (necesita cabecera con token) **TOKEN**
    ​
-   POST [/login] - Login de usuario (devuelve token)
    ​
-   PUT: [/email] para modificar el email **TOKEN**
    ​
-   PUT: [/password] para modificar la contraseña **TOKEN**
    ​
    Opinions
    ​
-   POST:[/Opinions] Escribir una Opinión **TOKEN**
    ​
-   GET:[/Opinions] Mostrar las Opiniones.
    ​
-   GET:[/Opinions/:idOpinion] Mostrar una sola Opinión.
    ​
-   DELETE: [/Opinions/:idOpinion] Borrar una opinión del usuario que lo creó **TOKEN**
    ​
-   PUT: [/Opinions] para modificar las opiniones **TOKEN**
