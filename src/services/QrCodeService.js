const { reqGNAlready } = require("../shared/GNClientConnect");
const pocGNreq = reqGNAlready
class QrCodeService {
    static async execute() {

        const reqGN = await pocGNreq;
        console.log(reqGN)

        const dataCob = {
            "calendario": {
                "expiracao": 3600
            },
            "valor": {
                "original": "00.10"
            },
            "chave": "bc3313c0-ec1d-41e3-a204-53fbee0c4ae3",
            "solicitacaoPagador": "UHZero.com.br"
        };

        const cobResponse = await reqGN.post('/v2/cob', dataCob);

        // console.log(cobResponse.data)

        return await reqGN.get(`/v2/loc/${cobResponse.data.loc.id}/qrcode`)
            .then(resp => resp)
    }
}

module.exports = { QrCodeService }