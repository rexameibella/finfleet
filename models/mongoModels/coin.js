const mongoose = require("mongoose");

const CoinSchema = mongoose.Schema({
    user_id: String,
    coin: Number
});

// export model auth with CoinSchema
module.exports = mongoose.model("user_coin", CoinSchema);