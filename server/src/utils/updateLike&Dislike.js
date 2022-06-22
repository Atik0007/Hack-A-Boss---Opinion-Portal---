const getConnection = require('../database/getConnection');

const updateLikeDislike = async (idOpinion) => {
    let connection;
    try {
        connection = await getConnection();

        const [like] = await connection.query(
            'SELECT COUNT(*) AS vote FROM vote WHERE idOpinion = ? AND value = 1',
            [idOpinion]
        );

        const [dislike] = await connection.query(
            'SELECT COUNT(*) AS vote FROM vote WHERE idOpinion = ? AND value = 0',
            [idOpinion]
        );

        await connection.query(
            'UPDATE opinions SET likes = ?, dislikes = ? WHERE id = ?',
            [like[0].vote, dislike[0].vote, idOpinion]
        );
    } catch (err) {
        console.error(err);
    }
};

module.exports = updateLikeDislike;
