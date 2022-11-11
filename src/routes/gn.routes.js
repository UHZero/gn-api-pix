const { Router } = require('express');
const { pixController } = require('../controllers/PixController');
const { reqGNAlready } = require('../shared/GNClientConnect');



const pixRoutes = Router()

pixRoutes.get('/', pixController.qrcodeGen)
pixRoutes.get('/cobrancas', pixController.cobList)
pixRoutes.get('/', pixController.successPay)
pixRoutes.get('/consulta/:id', pixController.pixShow)
pixRoutes.post('webhooks(/pix)?', pixController.pixWebhook)

module.exports = { pixRoutes }