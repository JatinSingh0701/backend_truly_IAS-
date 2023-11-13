const mongoose = require("mongoose");

const infoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  url: {
    type: String,
  },
  submitTime: {
    type: String,
  },
  subject: {
    type: String,
  },
  topic: {
    type: String,
  },
});
const Info = mongoose.model("Info", infoSchema);

module.exports = Info;