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
    -   likes
    -   dislike
    -   createdAt
    -   modifiedAt

-   likes:

    -   id
    -   idUser
    -   idOpinion
    -   likes
    -   dislike

## Endpoints

​
--User:​

-   POST: [/user] - Registro de usuario
    ​
-   POST: [/login] - Login de usuario (devuelve token)
    ​
-   GET: [/user/:id] - Devuelve información de usuario
    ​
-   GET: [/user] - Devuelve información del usuario del token (necesita cabecera con token) **TOKEN**
    ​
-   PUT: [/email] para modificar el email **TOKEN**
    ​
-   PUT: [/password] para modificar la contraseña **TOKEN**

--Opinions:

-   POST: [/opinions] Escribir una Opinión **TOKEN**
    ​
-   GET: [/opinions] Mostrar las Opiniones.
    ​
-   GET: [/opinions/:idOpinion] Mostrar una sola Opinión.
    ​
-   PUT: [/opinions] para modificar las opiniones **TOKEN**
    ​
-   DELETE: [/opinions/:idOpinion] Borrar una opinión del usuario que lo creó **TOKEN**

--likes:

-   POST: [/likes/:idOpinion] para darle like a una opinión **TOKEN**

-   POST: [/dislikes/:idOpinion] para darle dislike a una opinión **TOKEN**
