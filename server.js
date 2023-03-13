const express = require('express');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars').engine;

const app = express();

app.set('view engine', 'handlebars');
app.engine('handlebars', handlebars({defaultLayout: 'main_logo',}));


app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const routes = require('./routes/index');
app.use('/', routes);

app.use((req, res) => {
    res.status(404);
    res.render('404');
});

app.listen(3000, () => {
  console.log('http://localhost:3000');
});

