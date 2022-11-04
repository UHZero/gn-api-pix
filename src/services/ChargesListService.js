const { reqGNAlready } = require("../shared/GNClientConnect");
const { beforeDay, dataRFC } = require('../shared/DateRFC');

class ChargesListService {
    static async execute(start = beforeDay, end = dataRFC) {
        const reqGN = await reqGNAlready;

        return await reqGN.get(`/v2/cob?inicio=${start}&fim=${end}`)
            .then(resp => resp)
    }
}

module.exports = { ChargesListService };