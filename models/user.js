var mongoose = require("mongoose");

var historiqueSchema = mongoose.Schema({
  score: Number,
});

var userSchema = mongoose.Schema({
  token: String,
  userName: String,
  userPrenom: String,
  mail: String,
  password: String,
  birthDate: String,
  reservationId: [
    { type: mongoose.Schema.Types.ObjectId, ref: "reservations" },
  ],
  historiqueId: [historiqueSchema],
});

var userModel = mongoose.model("users", userSchema);

module.exports = userModel;
