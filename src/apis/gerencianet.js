const fs = require('fs');
const path = require('path');
const https = require('https');
const axios = require('axios');

const cert = fs.readFileSync(
    path.resolve(__dirname, `../../certs/${process.env.GN_CERT}`)
);

const agent = new https.Agent({
    pfx: cert,
    passphrase: ''
});

const credentials = Buffer.from(
    `${process.env.GN_ID}:${process.env.GN_SECRET}`
).toString('base64');

const data = JSON.stringify({ grant_type: 'client_credentials' });

const authenticated = () => {
    console.log('HELLO')
    return axios({
        method: 'POST',
        url: `${process.env.GN_ENDPOINT}/oauth/token`,
        headers: {
            Authorization: `Basic ${credentials}`,
            'Content-Type': 'application/json'
        },
        httpsAgent: agent,
        data: data
    })
}

const GNRequest = async () => {
    const authResponse = await authenticated();
    const accessToken = authResponse.data?.access_token;

    return axios.create({
        baseURL: process.env.GN_ENDPOINT,
        httpsAgent: agent,
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    });
};

module.exports = GNRequest;