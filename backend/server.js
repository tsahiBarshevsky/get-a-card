const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000; //Run on any available server on heroku || local server

var router = express.Router();
app.use(cors());

app.get('/try', (req, res) => {
    res.json('hello!');
});

app.listen(port, () => {
    console.log(`listening at port:${port}`);
});
  
module.exports = router;