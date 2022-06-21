const updatePasswordDB = require('../../database/usersDB/updateEmailAndPassDB');

const updatePassword = async (req, res, next) => {
    try {
        const { password, email } = req.body;

        if (email && password) {
            await updatePasswordDB(req.idUser, email, password);

            res.send({
                status: 'Ok',
                message: `Email and Password id: ${req.idUser} updated successfully`,
            });
        } else if (email) {
            await updatePasswordDB(req.idUser, email, null);

            res.send({
                status: 'Ok',
                message: `Email id: ${req.idUser} updated successfully`,
            });
        } else if (password) {
            await updatePasswordDB(req.idUser, null, password);

            res.send({
                status: 'Ok',
                message: `Password id: ${req.idUser} updated successfully`,
            });
        }
    } catch (err) {
        next(err);
    }
};

module.exports = updatePassword;
