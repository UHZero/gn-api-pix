require('dotenv').config()
const GNRequest = require('../apis/gerencianet');

setTimeout(() => {
    const reqGNAlready = GNRequest({
        clientID: process.env.GN_ID,
        clientSecret: process.env.GN_SECRET
    });

}, 3600000)


module.exports = { reqGNAlready };