const newOpinionDB = require('../../database/opinionsDB/newOpinionDB');

const generateError = require('../../utils/generateError');

const newOpinion = async (req, res, next) => {
    try {
        const { text } = req.body;

        // Checking if the text is empty or if the text is longer than 500 characters or if the text is less than 0 characters.
        if (!text || text.length > 500 || text.length < 0) {
            throw generateError('Invalid text', 400);
        }

        await newOpinionDB(req.idUser, text);
        res.send({
            status: 'Ok',
            message: `Opinion user id : ${req.idUser} created`,
        });
    } catch (err) {
        next(err);
    }
};

module.exports = newOpinion;
