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
    updateEmailAndPass,
} = require('./controllers/users');

// new user
app.post('/users', newUser);

// login user
app.post('/users/login', loginUser);

// get user
app.get('/users/:idUser', getUser);

// get own user
app.get('/users', auth, getOwnUser);

// update email and password
app.put('/users', auth, updateEmailAndPass);

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
    getOpinion,
} = require('./controllers/opinions');

// new opinion
app.post('/opinions', auth, newOpinion);

// update opinion
app.put('/opinions/:idOpinion', auth, updateOpinion);

// all opinions
app.get('/opinions', listOpinions);

// get opinion
app.get('/opinions/:idOpinion', getOpinion);

// delete opinion
app.delete('/opinions/:idOpinion', auth, deleteOpinion);

/**
 * #############################
 * ## Endpoints Likes/dislike ##
 * #############################
 */

const { addLikes, disLikes } = require('./controllers/likes');

// add like and remove like
app.post('/likes/:idOpinion', auth, addLikes);

// add dislike and remove dislike
app.post('/dislikes/:idOpinion', auth, disLikes);

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
