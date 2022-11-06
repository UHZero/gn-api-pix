const { clientCredentials } = require("../shared/GNClientConnect");
const { isAfter, addHours } = require("date-fns");
const { getToken, GNRequest } = require("../apis/gerencianet")

const authData = getToken(clientCredentials)

let token;
let create;

class QrCodeService {
    static async execute() {

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

        return await reqGN.get(`/v2/loc/${cobResponse.data.loc.id}/qrcode`)
            .then(resp => resp)
    }
}

module.exports = { QrCodeService }