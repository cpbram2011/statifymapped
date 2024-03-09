var express = require('express');
const path = require('path');
var app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 8000;

const auth = require("./routes/api/auth");
app.listen(port, () => console.log(`Server is running on port ${port}`));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(auth)

app.get('/', function (req, res) {
  res.send('Hello World!');
});
