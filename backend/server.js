const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors');
const mongoose = require("mongoose");
const CardsModel = require("./Models/cards");

const port = process.env.PORT || 5000;
const API = 'abb26cda829b3d1bdaf9868a6319642e'; 

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
        owner: req.body.owner,
        URL: req.body.URL,
        palette: req.body.palette,
        langauge: req.body.langauge,
        name: req.body.name,
        type: req.body.type,
        description: req.body.description,
        address: req.body.address,
        waze: req.body.waze,
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

app.get('/get-all-cards', async (req, res) =>
{
    var owner = req.query.owner;
    CardsModel.find({"owner": `${owner}`}, (err, result) =>
    {
        if (err)
        {
            console.log("error: " + err)
            res.send(err);
        }
        else
        {
            if (!result)
                console.log("You don't have cards yet");
            else
                console.log(`${result.length} cards found`);
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

app.get('/waze-link', async (req, res) =>
{
    var address = req.query.address;
    console.log(address);
    var url = `http://api.positionstack.com/v1/forward?access_key=${API}&query=${address}`;
    axios.get(url)
    .then((result) => {
        console.log(result.data.data[0]);
        var latitude = result.data.data[0].latitude;
        var longitude = result.data.data[0].longitude;
        var wazeLink = `https://www.waze.com/ul?ll=${latitude}%2C${longitude}&navigate=yes&zoom=17`;
        res.json(wazeLink);
    })
    .catch((err) => {
        console.log(err);
        res.send(err);
    });
});

app.listen(port, () => {
    console.log(`listening at port:${port}`);
});
  
module.exports = router;