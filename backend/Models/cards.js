const mongoose = require('mongoose');

const CardsSchema = new mongoose.Schema({
    owner: { type: String },
    URL: { type: String },
    palette: { type: Object },
    langauge: { type: String },
    name: { type: String },
    type: { type: String },
    description: { type: String },
    address: { type: String },
    waze: { type: String },
    contact: { type: Object },
    socials: { type: Object },
    images: { type: Object }
});

const CardsModel = mongoose.model("cards", CardsSchema);

module.exports = CardsModel;