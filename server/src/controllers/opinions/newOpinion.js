const newOpinionDB = require('../../database/opinionsDB/newOpinionDB');

const generateError = require('../../utils/generateError');

const newOpinion = async (req, res, next) => {
    try {
        const { text, title } = req.body;

        // Checking if the text is empty or if the text is longer than 500 characters or if the text is less than 0 characters.
        if (!title || !text || text.length < 0) {
            throw generateError(400, 'Invalid text');
        }

        await newOpinionDB(req.idUser, text, title);

        res.send({
            status: 'Ok',
            data: {
                message: 'Opinion created',
                idUser: req.idUser,
                text,
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = newOpinion;
