const deleteOpinionDB = require('../../database/opinionsDB/deleteOpinionDB');

const deleteOpinion = async (req, res, next) => {
    try {
        const { idOpinion } = req.params;

        await deleteOpinionDB(req.idUser, idOpinion);

        res.send({
            status: 'Success',
            message: `Opinion id : ${idOpinion} of user id: ${req.idUser} deleted`,
        });
    } catch (err) {
        next(err);
    }
};

module.exports = deleteOpinion;
