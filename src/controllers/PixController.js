const { ChargesListService } = require("../services/ChargesListService.js");
const { QrCodeService } = require("../services/QrCodeService.js");

class pixController {
    static async qrcodeGen(req, res) {
        try {
            await QrCodeService.execute()
                .then(resp => res.status(200).render('qrcode', { qrcodeImage: resp.data.imagemQrcode }))
        } catch (err) {
            res.status(400).send(err.message)
        }
    }

    static async cobList(req, res) {
        // const { start, end } = req.query;
        try {
            await ChargesListService.execute()
                .then(resp => res.status(200).json(resp.data))
        } catch (err) {
            res.status(400).send(err.message)
        }
    }
}

module.exports = { pixController }