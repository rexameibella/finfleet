const mongoose = require("mongoose");

const teams = mongoose.Schema({
    name: String,
    member: [{
        user_id: String,
        status: Boolean,
        available: Boolean
    }],
    image: String
});
module.exports = mongoose.model("teams", teams);