var mongoose = require("mongoose");

var reservationSchema = mongoose.Schema({
  dateReservation: Date,
  heureReservation: String,
  typeReservation: String,
  idJoueur: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
  golfId: { type: mongoose.Schema.Types.ObjectId, ref: "golfs" },
  nomParcours: String,
});

var reservationModel = mongoose.model("reservations", reservationSchema);

module.exports = reservationModel;
