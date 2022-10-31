if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const fs = require('fs');
const path = require('path');
const https = require('https');
const axios = require('axios');

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

axios({
    method: 'POST',
    url: `${process.env.GN_ENDPOINT}/oauth/token`,
    headers: {
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/json'
    },
    httpsAgent: agent,
    data: data
}).then(async (resp) => {
    const accessToken = await resp.data?.access_token;

    const reqGN = axios.create({
        baseURL: process.env.GN_ENDPOINT,
        httpsAgent: agent,
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    })

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


    reqGN.post('/v2/cob', dataCob).then((resp) => console.log(resp.data))
})



// console.log(cert)



// curl --request POST \
//   --url https://api-pix-h.gerencianet.com.br/oauth/token \
//   --header 'Authorization: Basic Q2xpZW50X0lkXzkyNmEzZGEyNzA4ZWJmMzRjY2YxMjk4OWRjNDM3M2RkOTYxNDllYWE6Q2xpZW50X1NlY3JldF9kMGNlYTgzOTc5MTJjYjZhYzdhMzMzZmE5MzU1ZGNlYTM0ZDAwOWUz' \
//   --header 'Content-Type: application/json' \
//   --data '{
// 	"grant_type": "client_credentials"
// }'