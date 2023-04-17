const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Show = new Schema(
  {
    movie: { type: Schema.Types.ObjectId, ref: 'Movie' },
    date: { type: Date },
    time: { type: String },
    price: { type: Number },
    cinema: { type: Schema.Types.ObjectId, ref: 'Cinema'},
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Show", Show);
