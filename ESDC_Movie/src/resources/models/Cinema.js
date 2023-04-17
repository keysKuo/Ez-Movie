const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Cinema = new Schema(
  {
    name: { type: String },
    address: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Cinema", Cinema);
