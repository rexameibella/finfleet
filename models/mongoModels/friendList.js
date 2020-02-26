const mongoose = require("mongoose");

const FriendSchema = mongoose.Schema({
    user_id: String,
    friendList: [String],
    sentRequest: [String],
    pendingRequest: [String]
});

// export model auth with FriendSchema
module.exports = mongoose.model("user_friend", FriendSchema);