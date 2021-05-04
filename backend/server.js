const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require("mongoose");
const UsersModel = require("./Models/user");
const port = process.env.PORT || 5000; 

var router = express.Router();
app.use(cors());

// Connect to database
mongoose.connect(
    'mongodb://localhost:27017/get-a-card',
    { useNewUrlParser: true }
);

app.get("/insert-new-card", async (req, res) => 
{
    var name = req.query.name;
    var image = req.query.image;
    const user = new UsersModel({ name: name, image: image });
    await user.save();
    console.log("User added successfully")
    res.json("User added successfully");
});

app.get('/get-card', async (req, res) => 
{
    var URL = req.query.URL;
    UsersModel.findOne({"URL": `${URL}`}, (err, result) =>
    {
        if (err)
        {
            console.log("error: " + err)
            res.send(err);
        }
        else
        {
            if (!result)
                console.log(`Couldn't find ${URL}`);
            else
                console.log(`${URL} has found!`);
            res.json(result);
        }
    });
});

app.listen(port, () => {
    console.log(`listening at port:${port}`);
});
  
module.exports = router;