const { Router } = require('express');
const { pixController } = require('../controllers/PixController');
const { reqGNAlready } = require('../shared/GNClientConnect');



const pixRoutes = Router()

pixRoutes.get('/', pixController.qrcodeGen)

module.exports = { pixRoutes }