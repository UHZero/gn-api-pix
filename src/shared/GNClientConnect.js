require('dotenv').config()
const GNRequest = require('../apis/gerencianet');

const reqGNAlready = GNRequest({
    clientID: process.env.GN_ID,
    clientSecret: process.env.GN_SECRET
});

module.exports = { reqGNAlready };