const bcrypt = require('bcrypt');

const getConnection = require('../getConnection');

const generateError = require('../../utils/generateError');

const insertUserDB = async (email, password, name, lastName) => {
    let connection;
    try {
        connection = await getConnection();

        const [user] = await connection.query(
            'SELECT id FROM users WHERE email = ?',
            [email]
        );

        if (user.length > 0) {
            throw generateError(409, 'Email already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const [idUser] = await connection.query(
            'INSERT INTO users (email, password, name, lastName) VALUES (?, ?, ?, ?)',
            [email, hashedPassword, name, lastName]
        );

        return idUser.insertId;
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

module.exports = insertUserDB;
