var express = require('express');
var bodyParser = require('body-parser');

var router = require('./api/routes/web.js');
var cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());
app.use(router);

/*app.use(function (req, res, next) {
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, access_token');
   res.setHeader('Access-Control-Allow-Credentials', true);

   next();
});*/

const port = 3001;

app.listen(port, () => {
   console.log('Server running on port ${port}');
});