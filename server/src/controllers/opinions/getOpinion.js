const selectOpinionsByIdDB = require('../../database/opinionsDB/selectOpinionByIdDB');

const getOpinion = async (req, res, next) => {
    try {
        const { idOpinion } = req.params;

        const opinion = await selectOpinionsByIdDB(idOpinion);

        res.send({
            status: 'Ok',
            data: {
                opinion,
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = getOpinion;
