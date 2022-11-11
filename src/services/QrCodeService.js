const { clientCredentials } = require("../shared/GNClientConnect");
const { isAfter, addHours } = require("date-fns");
const { getToken, GNRequest } = require("../apis/gerencianet")

const authData = getToken(clientCredentials)

let token;
let create;

class QrCodeService {
    static async execute(billValue) {

        const { accessToken, createdAt } = await authData

        token = accessToken;
        create = createdAt;

        let compareData = addHours(create, 1);

        if (isAfter(Date.now(), compareData)) {
            let { accessToken, createdAt } = await getToken(clientCredentials);

            token = accessToken;
            create = createdAt;
        }

        const reqGN = await GNRequest(token);

        if (!billValue) {
            billValue = "00.01"
        }

        const parseValue = parseFloat(billValue).toFixed(2);
        billValue = parseValue.toString()

        const dataCob = JSON.stringify({
            "calendario": {
                "expiracao": 3600
            },
            "valor": {
                "original": `${billValue}`
            },
            "chave": "bc3313c0-ec1d-41e3-a204-53fbee0c4ae3",
            "solicitacaoPagador": "UHZero.com.br"
        });

        const cobResponse = await reqGN.post('/v2/cob', dataCob);

        return await reqGN.get(`/v2/loc/${cobResponse.data.loc.id}/qrcode`)
            .then(resp => resp)
    }
}

module.exports = { QrCodeService }