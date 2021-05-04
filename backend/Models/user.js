const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
    name: { type: String },
    image: { type: String }
});

const UsersModel = mongoose.model("cards", UsersSchema);

module.exports = UsersModel;