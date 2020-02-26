const mongoose = require("mongoose");

const TalentSchema = mongoose.Schema({
    user_id: String,
    talentList: [{
        talent_id: String,
        talentPoint: Number,
        talentLevel: String
    }]
});

// export model auth with TalentSchema
module.exports = mongoose.model("user_talent", TalentSchema);