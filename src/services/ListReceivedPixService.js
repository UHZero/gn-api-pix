const { clientCredentials } = require("../shared/GNClientConnect");
const { isAfter, addHours } = require("date-fns");
const { getToken, GNRequest } = require("../apis/gerencianet")
const authData = getToken(clientCredentials)


let token;
let create;
class ListReceivedPixService {
    static async execute(start, end) {
        const { accessToken, createdAt } = await authData

        token = accessToken;
        create = createdAt;

        let compareData = addHours(create, 1);

        if (isAfter(Date.now(), compareData)) {
            let { accessToken, createdAt } = await getToken(clientCredentials);

            token = accessToken;
            create = createdAt;
        }

        const reqGN = await GNRequest(token)

        const reqList = await reqGN.get(`/v2/pix?inicio=${start}&fim=${end}`)

        let arr = []

        for (let i = 0; i < reqList.data.pix.length; i++) {
            let payload = Object.create(null)

            let date = new Date(`${reqList.data.pix[i].horario}`).toString()
            let parseDate = Date.parse(date)
            let formatedDate = new Intl.DateTimeFormat('pt-BR', {
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                timeZone: 'America/Sao_paulo'
            }).format(parseDate)


            payload.id = reqList.data.pix[i].txid
            payload.value = reqList.data.pix[i].valor
            payload.date = formatedDate
            arr.push(payload)
        }
        console.log(arr)

        return arr
    }
}

module.exports = { ListReceivedPixService };