const { ListReceivedPixService } = require("./ListReceivedPixService");
const { getYesterday, getToday } = require('../shared/DateRFC');
const { ChargesListService } = require("./ChargesListService");

let start;
let end;
let confirm;
class PixConfirmService {
    static async execute() {
        start = getYesterday();
        end = getToday();
        const payload = await ListReceivedPixService.execute(start, end)
        const bill = await ChargesListService.execute(start, end)

        if (bill.data?.cobs[0].valor === payload[0]?.value) {
            confirm = true
        }

        return confirm === true ? 'Pagamento Confirmado' : 'Verifique a transação ou recarregue a página!'
    }
}

module.exports = PixConfirmService;