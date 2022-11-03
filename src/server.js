if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}


const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const { pixRoutes } = require('./routes/gn.routes');
const { reqGNAlready } = require('./shared/GNClientConnect');

app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', 'src/views');
app.use(pixRoutes)



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
