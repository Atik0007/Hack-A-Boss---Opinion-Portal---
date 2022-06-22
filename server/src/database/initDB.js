const usersModule = require('../modules/usersModule');
const opinionsModule = require('../modules/opinionsModule');
const voteModule = require('../modules/voteModule');

const maim = async () => {
    try {
        await usersModule();
        await opinionsModule();
        await voteModule();
    } catch (err) {
        console.error(err);
    } finally {
        process.exit();
    }
};

maim();
