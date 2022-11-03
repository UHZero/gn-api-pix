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
}

module.exports = { pixController }