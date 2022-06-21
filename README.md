##TÍTULO##

-   Portal de opiniones.

##DESCRIPCIÓN##

-   Implementar una API que permita publicar opiniones sobre cualquier tema y que otras
    personas puedan verlas.

--ANÓNIMO:

        ● Ver las opiniones publicadas (públicas)

        ● Login

        ● Registro

--USUARIOS REGISTRADOS:

        ● Gestión del perfil: actualizar email, password

        ● Publicar una opinión

        ● Opcional:
                - Votar positivamente o negativamente otras opiniones

-- # Servidor :

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
-   Crear token de usuarios.
    ​

## Entidades

​

-   User:

    -   id
    -   name
    -   lastname
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

-   Likes:

    -   id
    -   idUser
    -   idOpinion
    -   likes
    -   dislike

## Endpoints

​
--User:​

-   POST: [/user] - Registro de usuario.
    ​
-   POST: [/user/login] - Login de usuario (devuelve token).
    ​
-   GET: [/user/:idUser] - Devuelve información de usuario.
    ​
-   GET: [/user] - Devuelve información del usuario del token. **TOKEN**
    ​
-   PUT: [/user] - Modificar el email y password. **TOKEN**
    ​

--Opinions:

-   POST: [/opinions] - Escribir una Opinión. **TOKEN**
    ​
-   GET: [/opinions] - Mostrar todas las Opiniones.
    ​
-   GET: [/opinions/:idOpinions] - Mostrar una sola opinión.
    ​
-   PUT: [/opinions/:idOpinion] - Modificar las opiniones.**TOKEN**
    ​
-   DELETE: [/opinions/:idOpinion] - Borrar una opinión del usuario que lo creó. **TOKEN**

--Likes:

-   POST: [/opinions/:idOpinion/like - Dar o quitar like a una opinión .**TOKEN**

-   POST: [/opinions/:idOpinion/dislike] - Dar o quitar dislike a una opinión. **TOKEN**
