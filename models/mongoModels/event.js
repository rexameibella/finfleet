const mongoose = require("mongoose");

const events = mongoose.Schema({
    bakat_id: Object,
    event_organizer_id: Object,
    level_id: Object,
    category_id:Object,
    date_end: Date,
    date_start: Date,
    date_create:Date,
    date_lastCall:Date,
    event_description: String,
    event_model: String,
    event_name: String,
    event_organizer: String,
    event_organizer_image: String,
    isTeam:Boolean,
    event_image: String,
    max_participant: Number,
    jumlah_join: {
        type:Number,
        default:0
    },
    level_name: String,
    additional_place: String,
    location: Array,
    entry_fee: Number,
    first_place: Number,
    second_place: Number,
    third_place: Number,
    status: Boolean,
    joined:Array,
    rule :String,

});

// export model event
module.exports = mongoose.model("events", events);