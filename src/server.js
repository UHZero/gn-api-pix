if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}


const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const GNRequest = require('./apis/gerencianet')

app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', 'src/views');





const reqGNAlready = GNRequest({
    clientID: process.env.GN_ID,
    clientSecret: process.env.GN_SECRET
});

app.get('/', async (req, res) => {

    const reqGN = await reqGNAlready;
    const dataCob = {
        "calendario": {
            "expiracao": 3600
        },
        "valor": {
            "original": "00.10"
        },
        "chave": "bc3313c0-ec1d-41e3-a204-53fbee0c4ae3",
        "solicitacaoPagador": "Informe o número ou identificador do pedido."
    };

    const cobResponse = await reqGN.post('/v2/cob', dataCob);


    const qrCodeResponse = await reqGN.get(`/v2/loc/${cobResponse.data.loc.id}/qrcode`);

    // res.send(qrCodeResponse.data);

    res.render('qrcode', { qrcodeImage: qrCodeResponse.data.imagemQrcode })
});

app.get('/cobrancas', async (req, res) => {
    const reqGN = await reqGNAlready;

    const cobResponse = await reqGN.get('/v2/cob?inicio=2022-10-29T16:01:35Z&fim=2022-10-31T10:00:00Z');

    res.send(cobResponse.data)

})

app.post('/webhook(/pix)?', async (req, res) => {
    console.log(req.body);
    res.send(200);
})


app.listen(8000, () => console.log('running'))