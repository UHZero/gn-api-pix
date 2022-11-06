const { yesterday, dataRFC } = require('../shared/DateRFC');
const { clientCredentials } = require("../shared/GNClientConnect");
const { isAfter, addHours } = require("date-fns");
const { getToken, GNRequest } = require("../apis/gerencianet")
const authData = getToken(clientCredentials)


let token;
let create;
class ListReceivedPixService {
    static async execute(start = yesterday, end = dataRFC) {
        const { accessToken, createdAt } = await authData

        token = accessToken;
        create = createdAt;

        let compareData = addHours(create, 1);

        if (isAfter(Date.now(), compareData)) {
            let { accessToken, createdAt } = await getToken(clientCredentials);

            token = accessToken;
            create = createdAt;
        }

        const reqGN = GNRequest(token)

        return await reqGN.get(`/v2/pix?inicio=${start}&fim=${end}`)
            .then(resp => resp)
    }
}

module.exports = { ListReceivedPixService };