const mongoose = require("mongoose");

const talents= mongoose.Schema({
    name: String,
    icon : String,
    category_id:Object,
    jumlahJoin:Number

});

// export model event
module.exports = mongoose.model("talents", talents);