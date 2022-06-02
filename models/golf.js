var mongoose = require("mongoose");
var parSchema = mongoose.Schema({
  distance : Number, 
  par : Number, 
  trou: Number,
  url : String,
});


var parcoursSchema = mongoose.Schema({
  nomParcours: String,
  parcoursTrou: [parSchema],
});

// remarque : j'aurais mis dans l'object goldAddress seulement city, postCode sans golf comme ca on pouvait faire golfAddress.city etc
var golfSchema = mongoose.Schema({
  golfName: String,
  golfCity: String,
  practice: Boolean,
  restauration: Boolean,
  dixhuitTrous: Number,
  neufTrous: Number,
  golfAddress: {
    golfCity: String,
    golfPostCode: String,
    golfAddressName: String,
    golfLatitude: Number,
    golfLongitude: Number,
    golfPostCode: String,
  },
  parcours: [parcoursSchema],
});

var golfModel = mongoose.model("golfs", golfSchema);

module.exports = golfModel;
