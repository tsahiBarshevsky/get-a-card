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

//add new card
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
    res.json("Card added successfully. You'll redirect to dashboard in few seconds");
});

// edit card
app.post("/edit-card", async (req, res) => 
{
    var id = req.body.id;
    var URL = req.body.URL;
    var palette = req.body.palette;
    var langauge = req.body.langauge
    var name = req.body.name;
    var type = req.body.type;
    var description = req.body.description;
    var address = req.body.address;
    var waze = req.body.waze;
    var contact = req.body.contact;
    var socials = req.body.socials;
    var images = req.body.images;
    CardsModel.findOneAndUpdate(
        { "_id": id }, 
        { "$set": 
        { 
            "palette": palette, "langauge": langauge, "name": name, "type": type,
            "description": description, "address": address, "waze": waze,
            "contact": contact, "socials": socials, "images": images
        }}).exec(function(err)
        {
            if (err) 
            {
                console.log(err);
                res.status(500).send(err);
            } 
            else 
            {
                console.log(`${URL} edited successfully. You'll redirect to dashboard in few seconds`)
                res.json(`${URL} edited successfully. You'll redirect to dashboard in few seconds`);
            }
        }
    );
});

//get single card
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

// get all cards
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

//check if URL is available
app.get('/URL-availability', async (req, res) =>
{
    var URL = req.query.URL;
    CardsModel.findOne({"URL": `${URL}`}, (err, result) =>
    {
        if (err)
        {
            console.log("error: " + err)
            res.json(err);
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

// create link to nevigate via waze
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
        console.log(wazeLink);
        res.json(wazeLink);
    })
    .catch((err) => {
        console.log(err);
        res.send(err);
    });
});

//delete card
app.get('/delete-card', async (req, res) =>
{
    var URL = req.query.URL;
    CardsModel.deleteOne({"URL": `${URL}`}, (err, result) =>
    {
        if (err)
        {
            console.log("error: " + err)
            res.json(err);
        }
        else
        {
            console.log(`${URL} deleted successfully`)
            res.json("OK");
        }
    });
});

app.listen(port, () => {
    console.log(`listening at port:${port}`);
});
  
module.exports = router;