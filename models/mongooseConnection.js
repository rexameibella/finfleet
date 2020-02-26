const mongoose = require("mongoose");

const MONGOURI = `mongodb+srv://${process.env.mongo_user}:${process.env.mongo_password}@cluster0-vlp1h.mongodb.net/finfleet?retryWrites=true&w=majority`;

const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(MONGOURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Connected to Mongoo DB Cloud !!");
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = InitiateMongoServer;

