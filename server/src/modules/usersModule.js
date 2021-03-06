const getConnection = require('../database/getConnection');

const user = async () => {
    let connection;
    try {
        connection = await getConnection();
        console.log('******* Delete user table ******');
        await connection.query('DROP TABLE IF EXISTS users');
        console.log('**** Create users table ****');

        await connection.query(`
        CREATE TABLE users (
            id INTEGER PRIMARY KEY AUTO_INCREMENT,
            userName VARCHAR(25) UNIQUE NOT NULL,
            name VARCHAR(255) NOT NULL,
            lastName VARCHAR(255) NOT NULL,
            gender ENUM('male', 'female','other') NOT NULL,
            image VARCHAR(100),
            email VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(100) NOT NULL,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP
        )
    `);

        console.log('**** Created users table successfully ****');
    } catch (err) {
        console.log(err);
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

module.exports = user;
