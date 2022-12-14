const { ChargesListService } = require("../services/ChargesListService.js");
const { ListReceivedPixService } = require("../services/ListReceivedPixService.js");
const PixConfirmService = require("../services/PixConfirmService.js");
const { QrCodeService } = require("../services/QrCodeService.js");
const { ShowReceivedPixService } = require("../services/ShowReceivedPixService.js");
const { getYesterday, getToday } = require('../shared/DateRFC');

class pixController {
    static async qrcodeGen(req, res) {
        const { value } = req.query;
        try {
            await QrCodeService.execute(value)
                .then(resp => res.status(200).render('qrcode', { qrcodeImage: resp.data.imagemQrcode }))
        } catch (err) {
            res.status(400).send(err.message)
        }
    }

    static async cobList(req, res) {
        // let start = yesterday;
        // let end = dataRFC;
        // console.log('start: ' + start, 'end: ' + end)
        try {
            await ChargesListService.execute()
                .then(resp => res.status(200).json(resp.data))
        } catch (err) {
            res.status(400).send(err.message)
        }
    }

    static async pixList(req, res) {
        try {
            await ListReceivedPixService.execute()
                .then(resp => res.status(200).json(resp.data))
        } catch (err) {
            res.status(400).send(err.message)
        }
    }

    static async pixShow(req, res) {
        const { id } = req.params;
        try {
            await ShowReceivedPixService.execute(id)
                .then(resp => res.status(200).json(resp.data))
        } catch (err) {
            res.status(400).send(err.message)
        }
    }

    static async pixWebhook(req, res) {
        console.log(req.body);
        res.send(200);
    }

    static async successPay(req, res) {
        let start = getYesterday();
        let end = getToday();
        // const topic = 'confirm-issue'
        try {
            await ListReceivedPixService.execute(start, end)
                .then(resp => res.status(200).render('relatorio', { successPay: resp }))
            // await KafkaConsumerService.execute(topic)
            //     .then(resp => res.status(200).render('kafka', { moment: resp?.Hello }))
        } catch (err) {
            res.status(400).send(err.message)
        }
    }
}

module.exports = { pixController }