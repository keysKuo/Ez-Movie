const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Booking = new Schema(
  {
    customer: { type: Schema.Types.ObjectId, ref: 'Customer'},
    show: { type: Schema.Types.ObjectId, ref: 'Show'}, 
    n_ticket: { type: Number },
    total: { type: Number },
    date: { type: Date },
    seats: [ { type: Schema.Types.ObjectId, ref: 'Seat' } ]
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Booking", Booking);
