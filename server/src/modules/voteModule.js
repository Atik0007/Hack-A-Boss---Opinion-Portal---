const getConnection = require('../database/getConnection');

const vote = async () => {
    let connection;
    try {
        connection = await getConnection();
        console.log('******* Delete vote table ******');
        await connection.query('DROP TABLE IF EXISTS vote');
        console.log('**** Create vote table ****');

        await connection.query(`
            CREATE TABLE vote (
                id INT PRIMARY KEY AUTO_INCREMENT,
                value BOOLEAN ,
                idUser INTEGER ,
                idOpinion INTEGER ,
                FOREIGN KEY (idUser) REFERENCES users(id),
                FOREIGN KEY (idOpinion) REFERENCES opinions(id),
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

module.exports = vote;
