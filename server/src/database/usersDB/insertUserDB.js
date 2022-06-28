const bcrypt = require('bcrypt');

const getConnection = require('../getConnection');

const generateError = require('../../utils/generateError');

const insertUserDB = async (
    userName,
    email,
    password,
    name,
    lastName,
    gender,
    image
) => {
    console.log(userName);
    let connection;
    try {
        connection = await getConnection();

        const [emailExists] = await connection.query(
            'SELECT id FROM users WHERE email = ?',
            [email]
        );

        if (emailExists.length > 0) {
            throw generateError(409, 'Email already exists');
        }

        const [userNameExists] = await connection.query(
            'SELECT id FROM users WHERE userName = ?',
            [userName]
        );

        if (userNameExists.length > 0) {
            throw generateError(409, 'User name already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const [idUser] = await connection.query(
            'INSERT INTO users (userName, email, password, name, lastName, gender, image) VALUES (?, ?, ?, ?, ?, ?, ? )',
            [userName, email, hashedPassword, name, lastName, gender, image]
        );

        return idUser.insertId;
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

module.exports = insertUserDB;
