const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require("mongoose");
const CardsModel = require("./Models/cards");
const port = process.env.PORT || 5000; 

var router = express.Router();
app.use(cors());
app.use(express.urlencoded());
app.use(express.json());

// Connect to database
mongoose.connect(
    'mongodb://localhost:27017/get-a-card',
    { useNewUrlParser: true }
);

app.post("/insert-new-card", async (req, res) => 
{
    const newCard = new CardsModel({
        URL: req.body.URL,
        palette: req.body.palette,
        langauge: req.body.langauge,
        name: req.body.name,
        type: req.body.type,
        description: req.body.description,
        address: req.body.address,
        contact: req.body.contact,
        socials: req.body.socials,
        images: req.body.images
    });
    await newCard.save();
    console.log(`${req.body.name} added successfully`)
    res.json("Card added successfully");
});

app.get('/get-card', async (req, res) => 
{
    var URL = req.query.URL;
    CardsModel.findOne({"URL": `${URL}`}, (err, result) =>
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

app.get('/URL-availability', async (req, res) =>
{
    var URL = req.query.URL;
    CardsModel.findOne({"URL": `${URL}`}, (err, result) =>
    {
        if (err)
        {
            console.log("error: " + err)
            res.send(err);
        }
        else
        {
            if (!result) //URL available
                res.json(true);
            else
                res.json(false);
        }
    });
});

app.listen(port, () => {
    console.log(`listening at port:${port}`);
});
  
module.exports = router;