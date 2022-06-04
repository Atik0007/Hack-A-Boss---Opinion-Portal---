const getConnection = require('../database/getConnection');

const likes = async () => {
    let connection;
    try {
        connection = await getConnection();
        console.log('******* Delete likes table ******');
        await connection.query('DROP TABLE IF EXISTS likes');
        console.log('**** Create likes table ****');

        await connection.query(`
            CREATE TABLE likes (
                id INTEGER PRIMARY KEY AUTO_INCREMENT,
                likes BOOLEAN DEFAULT false,
                dislike BOOLEAN DEFAULT false,
                idUser INTEGER ,
                idOpinion INTEGER ,
                FOREIGN KEY (idUser) REFERENCES users(id),
                FOREIGN KEY (idOpinion) REFERENCES opinions(id)
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

module.exports = likes;
