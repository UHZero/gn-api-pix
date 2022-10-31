if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const fs = require('fs');
const path = require('path');
const https = require('https');
const axios = require('axios');
const express = require('express');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'src/views');


const cert = fs.readFileSync(
    path.resolve(__dirname, `../certs/${process.env.GN_CERT}`)
);

const agent = new https.Agent({
    pfx: cert,
    passphrase: ''
});

const credentials = Buffer.from(
    `${process.env.GN_ID}:${process.env.GN_SECRET}`
).toString('base64');

const data = JSON.stringify({ grant_type: 'client_credentials' });

app.get('/', async (req, res) => {
    const authResponse = await axios({
        method: 'POST',
        url: `${process.env.GN_ENDPOINT}/oauth/token`,
        headers: {
            Authorization: `Basic ${credentials}`,
            'Content-Type': 'application/json'
        },
        httpsAgent: agent,
        data: data
    })

    const accessToken = await authResponse.data?.access_token;

    const reqGN = axios.create({
        baseURL: process.env.GN_ENDPOINT,
        httpsAgent: agent,
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    });

    const dataCob = {
        "calendario": {
            "expiracao": 3600
        },
        "valor": {
            "original": "123.45"
        },
        "chave": "bc3313c0-ec1d-41e3-a204-53fbee0c4ae3",
        "solicitacaoPagador": "Informe o número ou identificador do pedido."
    };


    const cobResponse = await reqGN.post('/v2/cob', dataCob);


    const qrCodeResponse = await reqGN.get(`/v2/loc/${cobResponse.data.loc.id}/qrcode`);

    // res.send(qrCodeResponse.data);

    res.render('qrcode', { qrcodeImage: qrCodeResponse.data.imagemQrcode })
});

app.listen(8000, () => console.log('running'))




// console.log(cert)



// curl --request POST \
//   --url https://api-pix-h.gerencianet.com.br/oauth/token \
//   --header 'Authorization: Basic Q2xpZW50X0lkXzkyNmEzZGEyNzA4ZWJmMzRjY2YxMjk4OWRjNDM3M2RkOTYxNDllYWE6Q2xpZW50X1NlY3JldF9kMGNlYTgzOTc5MTJjYjZhYzdhMzMzZmE5MzU1ZGNlYTM0ZDAwOWUz' \
//   --header 'Content-Type: application/json' \
//   --data '{
// 	"grant_type": "client_credentials"
// }'