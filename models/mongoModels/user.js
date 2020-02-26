const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    name: String,
    password:String
});

// export model auth with UserSchema
module.exports = mongoose.model("user", UserSchema);