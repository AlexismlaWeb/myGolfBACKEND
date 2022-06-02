var mongoose = require("mongoose");

var options = {
  connectTimeoutMS: 5000,
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

mongoose.connect("mongodb+srv://juju:juju0508@cluster0.51ryg.mongodb.net/golfApp?retryWrites=true&w=majority", options, function (err) {
  console.log(err);
});

module.exports = mongoose;
