const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  title: String,
  image: String,
  des: String,
  price : String,
  user : {
    type : mongoose.Schema.Types.ObjectId, ref: "User"
  }
});

const Service = mongoose.model("Service", serviceSchema);
module.exports = Service;
