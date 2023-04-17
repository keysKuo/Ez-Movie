const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Seat = new Schema(
  {
    seat_num: { type: String },
    status: { type: String },
    show: { type: Schema.Types.ObjectId, ref: 'Show'}
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Seat", Seat);
