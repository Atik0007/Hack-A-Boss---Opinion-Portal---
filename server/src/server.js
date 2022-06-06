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
app.post('/user', newUser);

// login user
app.post('/user/login', loginUser);

// get user
app.get('/user/:idUser', getUser);

// get own user
app.get('/user', auth, getOwnUser);

// update email and password
app.put('/user', auth, updateEmailAndPass);

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
app.post('/opinion', auth, newOpinion);

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
app.post('/like/:idOpinion', auth, addLikes);

// add dislike and remove dislike
app.post('/dislike/:idOpinion', auth, disLikes);

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
