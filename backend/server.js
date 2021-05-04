const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require("mongoose");
const UsersModel = require("./Models/user");
const port = process.env.PORT || 5000; 

var router = express.Router();
app.use(cors());

// Connect database
mongoose.connect(
    'mongodb://localhost:27017/get-a-card',
    { useNewUrlParser: true }
);

app.get('/try', (req, res) => {
    UsersModel.find({}, (err, result) =>
    {
        if (err)
        {
            console.log("error: " + err)
            res.send(err);
        }
        else
        {
            console.log(result);
            res.json(result);
        }
    });
});

app.listen(port, () => {
    console.log(`listening at port:${port}`);
});
  
module.exports = router;