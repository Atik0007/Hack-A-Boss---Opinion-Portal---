const getConnection = require('../database/getConnection');

const opinions = async () => {
    let connection;
    try {
        connection = await getConnection();
        console.log('******* Delete opinions table ******');
        await connection.query('DROP TABLE IF EXISTS opinions');
        console.log('**** Create opinions table ****');

        await connection.query(`
            CREATE TABLE opinions (
                id INTEGER PRIMARY KEY AUTO_INCREMENT,
                idUser INTEGER ,
                FOREIGN KEY (idUser) REFERENCES users(id) ON DELETE CASCADE,
                title VARCHAR(50) NOT NULL,
                text VARCHAR(32765) NOT NULL,
                likes INTEGER DEFAULT 0,
                dislikes INTEGER DEFAULT 0,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP
            )
        `);

        console.log('**** Created table successfully ****');
    } catch (err) {
        console.log(err);
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

module.exports = opinions;
