const { reqGNAlready } = require("../shared/GNClientConnect");
const { yesterday, dataRFC } = require('../shared/DateRFC');

class ListReceivedPixService {
    static async execute(start = yesterday, end = dataRFC) {
        const reqGN = await reqGNAlready;

        return await reqGN.get(`/v2/pix?inicio=${start}&fim=${end}`)
            .then(resp => resp)
    }
}

module.exports = { ListReceivedPixService };