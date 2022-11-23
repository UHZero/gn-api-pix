const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const { pixRoutes } = require('./routes/gn.routes');

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '/public')));
app.set('view engine', 'ejs');
app.set('views', 'src/views');

app.use(pixRoutes)

app.listen(8000, () => console.log('running'))
