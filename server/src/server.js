require('dotenv').config();

const { PORT } = process.env;

const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
app.use(express.json());

/**
 * #################
 * ## Middlewares ##
 * #################
 */

const auth = require('./middlewares/auth');

/**
 * ####################
 * ## Endpoints User ##
 * ####################
 */
const {
    newUser,
    loginUser,
    getUser,
    getOwnUser,
    updateEmail,
    updatePassword,
} = require('./controllers/users');

app.post('/users', newUser);

app.post('/users/login', loginUser);

app.get('/users/:idUser', getUser);

app.get('/users', auth, getOwnUser);

app.put('/email', auth, updateEmail);

app.put('/password', auth, updatePassword);

/**
 * ########################
 * ## Endpoints Opinions ##
 * ########################
 */

const {
    newOpinion,
    updateOpinion,
    deleteOpinion,
    listOpinions,
} = require('./controllers/opinions');

app.post('/opinions', auth, newOpinion);

app.put('/opinions/:idOpinion', auth, updateOpinion);

app.get('/opinions', listOpinions);

app.delete('/opinions/:idOpinion', auth, deleteOpinion);

/**
 * ######################
 * ## Middleware Error ##
 * ######################
 */

app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.statusCode || 500).send({
        message: err.message,
        status: 'Error',
    });
});

/**
 * ##########################
 * ## Middleware Not Found ##
 * ##########################
 */

app.use((req, res) => {
    res.status(404).send({
        status: 404,
        message: 'Not Found',
    });
});

/**
 * ##################
 * ## Start Server ##
 * ##################
 * */

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
