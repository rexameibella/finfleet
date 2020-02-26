const mongoose = require("mongoose");

const categorys= mongoose.Schema({
    name: String,
    icon : String,
});

// export model event
module.exports = mongoose.model("categorys", categorys);