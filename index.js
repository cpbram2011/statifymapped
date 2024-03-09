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

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  })
}