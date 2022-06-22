const getConnection = require('../database/getConnection');
const generateError = require('../utils/generateError');

const opinionExists = async (req, res, next) => {
    let connection;
    try {
        connection = await getConnection();

        const { idOpinion } = req.params;

        const [opinion] = await connection.query(
            'SELECT id FROM opinions WHERE id = ?',
            [idOpinion]
        );

        if (opinion.length < 1) {
            throw generateError(404, 'Opinion not exists');
        }

        next();
    } catch (err) {
        next(err);
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

module.exports = opinionExists;
