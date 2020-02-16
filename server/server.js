var express = require('express');
var bodyParser = require('body-parser');

var router = require('./api/routes/web.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);

const port = 3001;

app.listen(port, () => {
   console.log('Server running on port ${port}');
});