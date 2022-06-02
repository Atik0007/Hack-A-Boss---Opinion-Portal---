const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const generateError = require('../../utils/generateError');

const selectUserByEmailDB = require('../../database/usersDB/selectUserByEmailDB');

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw generateError(400, 'Missing parameters');
        }

        const user = await selectUserByEmailDB(email);

        console.log(user);
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            throw generateError(401, 'Invalid password');
        }

        const payload = {
            userId: user.id,
        };

        const token = jwt.sign(payload, process.env.SECRET, {
            expiresIn: '30d',
        });

        res.send({
            status: 'ok',
            data: {
                token,
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = loginUser;
