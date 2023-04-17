const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Movie = new Schema(
  {
    name: { type: String, required: true },
    duration: { type: String },
    release: { type: Date, default: Date.now() },
    banner: { type: String },
    desc: { type: String },
    lang: { type: String },
    slug: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Movie", Movie);
