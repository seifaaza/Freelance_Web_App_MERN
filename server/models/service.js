const mongoose = require("mongoose");

const servicesSchema = new mongoose.Schema({
  title: String,
  image: String,
  des: String,
  price : String
});

const Services = mongoose.model("Services", servicesSchema);
module.exports = Services;
