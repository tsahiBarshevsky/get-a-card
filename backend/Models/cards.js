const mongoose = require('mongoose');

const CardsSchema = new mongoose.Schema({
    language: { type: String },
    name: { type: String },
    type: { type: String },
    URL: { type: String },
    location: { type: String },
    connections: { type: Array },
    socials: { type: Array },
    description: { type: String }
});

const CardsModel = mongoose.model("cards", CardsSchema);

module.exports = CardsModel;