const updatePasswordDB = require('../../database/usersDB/updateEmailAndPassDB');

const generateError = require('../../utils/generateError');

const updatePassword = async (req, res, next) => {
    try {
        const { password, email } = req.body;
        if (!password || !email) {
            throw generateError(401, 'email and password are required');
        }

        const updatedPassword = await updatePasswordDB(
            req.idUser,
            password,
            email
        );

        res.send({
            status: 'Ok',
            message: `Email and  Password of id: ${req.idUser} updated successfully`,
            data: {
                user: updatedPassword,
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = updatePassword;
