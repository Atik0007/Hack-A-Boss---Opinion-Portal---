const updateOpinionDB = require('../../database/opinionsDB/updateOpinionDBb');
const generateError = require('../../utils/generateError');

const updateOpinion = async (req, res, next) => {
    try {
        const { text } = req.body;
        const { idOpinion } = req.params;

        if (!text || text.length > 500 || text.length < 0) {
            throw generateError('Invalid text', 400);
        }

        await updateOpinionDB(req.idUser, idOpinion, text);
        res.send({
            status: 'Ok',
            message: `Opinion user id : ${req.idUser} updated`,
        });
    } catch (err) {
        next(err);
    }
};

module.exports = updateOpinion;
