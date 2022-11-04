const { Router } = require('express');
const { pixController } = require('../controllers/PixController');
const { reqGNAlready } = require('../shared/GNClientConnect');



const pixRoutes = Router()

pixRoutes.get('/', pixController.qrcodeGen)
pixRoutes.get('/cobrancas', pixController.cobList)

module.exports = { pixRoutes }