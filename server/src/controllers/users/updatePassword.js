const updatePasswordDB = require('../../database/usersDB/updatePasswordDB');

const generateError = require('../../utils/generateError');

const updatePassword = async (req, res, next) => {
    try {
        const { password } = req.body;
        if (!password) {
            throw generateError(401, 'Password is required');
        }

        const updatedPassword = await updatePasswordDB(req.idUser, password);

        res.send({
            status: 'Ok',
            message: `Password of id: ${req.idUser} updated successfully`,
            data: {
                user: updatedPassword,
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = updatePassword;
