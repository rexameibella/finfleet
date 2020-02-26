const mongoose = require("mongoose");

const FriendSchema = mongoose.Schema({
    user_id: String,
    eventNotification: [{
        read: Boolean,
        event_id: String,
        createdAt: Date
    }],
    friendsNotification: [{
        read: Boolean,
        user_id: String,
        message: String,
        createdAt: Date
    }]
});

// export model auth with FriendSchema
module.exports = mongoose.model("user_notification", FriendSchema);