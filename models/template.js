const mongoose = require("mongoose");

const templateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  content: {
    type: String,
    requred: true,
  },
});

module.exports = mongoose.model("templates", templateSchema);
