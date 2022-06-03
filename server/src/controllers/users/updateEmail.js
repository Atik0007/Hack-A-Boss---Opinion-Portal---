const updateEmailDB = require('../../database/usersDB/updateEmailDB');

const generateError = require('../../utils/generateError');

const updateEmail = async (req, res, next) => {
    try {
        const { email } = req.body;
        if (!email) {
            throw generateError(401, 'Email is required');
        }

        const updatedEmail = await updateEmailDB(req.idUser, email);

        res.send({
            status: 'Ok',
            message: `Email of id: ${req.idUser} updated successfully`,
            data: {
                user: updatedEmail,
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = updateEmail;
