const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Customer = new Schema(
  {
    fullname: { type: String, required: true },
    phone: { type: String },
    email: { type: String },
    gender: { type: String },
    password: { type: String }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Customer", Customer);
