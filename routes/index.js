var express = require("express");
var router = express.Router();
var bcrypt = require("bcrypt");
var uid2 = require("uid2");

var userModel = require("../models/user");
var GolfModel = require("../models/golf");
var reservationModel = require("../models/reservation");

/* GET home page. */
// router.get("/", function (req, res, next) {
//   res.render("index", { title: "Express" });
// });

router.get("/getUserByToken/:tokenFromFront", async function (req, res) {
  var error = "";

  if (!req.params.tokenFromFront) {
    error = "Pas de tokenFromFront";
  }
  var user = await userModel.findOne({
    token: req.params.tokenFromFront,
  });
  if (!user) {
    error = "Pas d'utilisateur avec ce token";
  }
  res.json({ user, error });
});

router.put("/userReservation/:idFromFront", async function (req, res) {
  var error = "";
  var idReservation = req.body.idReservationFromFront;

  console.log("idreservation", idReservation);

  if (!req.params.idFromFront) {
    error = "Pas de IdFromfront";
  }

  var user = await userModel.findOne({ _id: req.params.idFromFront });

  if (!user) {
    error = "User n'existe pas dans la bdd";
  }

  var reservation = user.reservationId;
  reservation.push(idReservation);
  var savedUser = await user.save();
  res.json({ savedUser, error });
});

router.post("/reservation", async function (req, res, next) {
  var playerIdArray = [];

  playerIdArray.push(req.body.idJoueur);

  // playerIdArray.push(buddyId);

  var nouvelleReservation = new reservationModel({
    dateReservation: req.body.date,
    heureReservation: req.body.heureReservation,
    typeReservation: req.body.type,
    idJoueur: playerIdArray,
    golfId: req.body.golfId,
    nomParcours: req.body.nomParcours,
  });

  var reservationSaved = await nouvelleReservation.save();

  res.json({ result: reservationSaved });
});

router.get("/askgolf", async function (req, res, next) {
  var result = await GolfModel.find();
  res.json({ result });
});

//Route pour créer notre Collection Golf
router.post("/golfAdd", async function (req, res, next) {
  var golf = [];
  var par = [4, 4, 3, 4, 4, 3, 4, 5, 5, 4, 3, 5, 4, 4, 4, 4, 3, 4];
  var distance = [
    389, 284, 142, 297, 357, 160, 319, 472, 461, 319, 153, 397, 370, 320, 328,
    379, 169, 360,
  ];
  var tableauImage = [
    "https://res.cloudinary.com/dqvhyz0rs/image/upload/v1653399533/golf/vineuil-8-sm_j4seyc.jpg",
    "https://res.cloudinary.com/dqvhyz0rs/image/upload/v1653399527/golf/vineuil-7-sm_z4fsly.jpg",
    "https://res.cloudinary.com/dqvhyz0rs/image/upload/v1653399530/golf/vineuil-6-sm_pxw000.jpg",
    "https://res.cloudinary.com/dqvhyz0rs/image/upload/v1653399524/golf/vineuil-5-sm_lchlaz.jpg",
    "https://res.cloudinary.com/dqvhyz0rs/image/upload/v1653399521/golf/vineuil-4-sm_gfymyg.jpg",
    "https://res.cloudinary.com/dqvhyz0rs/image/upload/v1653399518/golf/vineuil-3-sm_oghwtx.jpg",
    "https://res.cloudinary.com/dqvhyz0rs/image/upload/v1653399515/golf/vineuil-2-sm_wr4gxs.jpg",
    "https://res.cloudinary.com/dqvhyz0rs/image/upload/v1653399512/golf/vineuil-18-sm.jpg",
    "https://res.cloudinary.com/dqvhyz0rs/image/upload/v1653399506/golf/vineuil-17-sm.jpg",
    "https://res.cloudinary.com/dqvhyz0rs/image/upload/v1653399503/golf/vineuil-16-sm.jpg",
    "https://res.cloudinary.com/dqvhyz0rs/image/upload/v1653399500/golf/vineuil-15-sm_tjen44.jpg",
    "https://res.cloudinary.com/dqvhyz0rs/image/upload/v1653399497/golf/vineuil-14-sm_xm0ait.jpg",
    "https://res.cloudinary.com/dqvhyz0rs/image/upload/v1653399494/golf/vineuil-13-sm_cnd9z5.jpg",
    "https://res.cloudinary.com/dqvhyz0rs/image/upload/v1653399542/golf/vineuil-11-sm_fqpopc.jpg",
    "https://res.cloudinary.com/dqvhyz0rs/image/upload/v1653399491/golf/vineuil-12-sm_v81obm.jpg",
    "https://res.cloudinary.com/dqvhyz0rs/image/upload/v1653399539/golf/vineuil-10-sm_yxg9zv.jpg",
    "https://res.cloudinary.com/dqvhyz0rs/image/upload/v1653399509/golf/vineuil-1-sm_x7dn5o.jpg",
  ];
  var nomParcours = [
    "Parcours belle vue",
    "Parcours des flots bleus",
    "Parcours des érables",
    "Parcours beau soleil",
    "Parcours des amoureux",
    "Parcours d'Alexis 1er",
    "Parcours Shady",
    "Parcours de Paris",
    "Parcours de la bonne fortune",
    "Parcours du ruisseau",
    "Parcours de la cascade",
    "Parcours des rosseaux",
    "Parcours de la tranquilité",
    "Parcours des trèfles à quatre feuilles",
    "Parcours du débutant",
    "Parcours Wood",
    "Parcours de la vallée",
    "Parcours de la dune bleue",
    "Parcours de la Capsule",
    "Parcours des grands Ducs",
    "Parcours Edouard le Grand",
    "Parcours de la famille Robinson",
    "Parcours Anakin Skywalker",
    "Parcours Roch Voisine",
    "Parcours divin",
    "Parcours des nains de jardin",
    "Parcours du gentleman voyageur",
    "Parcours Arsène Lupin",
    "Parcours Mr Bean",
    "Parcours Kirikou",
    "Parcours Volcano",
    "Parcours des frères jumeaux",
    "Parcours des ateliers verdoyants",
    "Parcours bouclier rouge",
    "Parcours des Celtes",
    "Parcours Robin des Bois",
    "Parcours des plaines de sable",
    "Parcours du chancelier",
    "Parcours de mon coeur",
    "Parcours des rencontres",
  ];

  var nomGolf = [
    "Golf de la vallée",
    "Golf de la fourmi rouge",
    "Golf mon beau soleil",
    "Golf des habitués",
    "Golf de la plaine",
    "Golf d'Edouard le Grand",
    "Golf de la musique douce",
    "Golf de la chance",
    "Golf du point de non-retour",
    "Golf nocturne",
    "Master golf",
    "Golf papier ciseaux",
    "Golf des corneilles à trois yeux",
    "Golf des beaux paysages",
    "Golf de la grande motte",
    "Golf Chaumont",
    "Golf des Terres anciennes",
    "Golf de la frisouille",
    "Golf des bébés nageurs",
    "Golf de la grenouille baveuse",
  ];

  function randomGolf(index, longueurTrou) {
    var tableauScore = [];
    var parcours1 = { nomParcours: nomParcours[index] };

    for (var i = 1; i <= longueurTrou; i++) {
      var parcoursTrou = {};
      parcoursTrou.trou = i;
      parcoursTrou.par = par[i - 1];
      parcoursTrou.url = tableauImage[i - 1];
      parcoursTrou.distance = distance[i - 1];
      tableauScore.push(parcoursTrou);
    }
    parcours1.parcoursTrou = tableauScore;
    return parcours1;
  }

  for (var i = 0; i < 20; i++) {
    var randomBool1 = Math.random() > 0.5 ? true : false;
    var randomBool2 = Math.random() > 0.5 ? true : false;
    var randomCity = Math.random() > 0.5 ? "Paris" : "Amiens";
    var randomPostCode = randomCity == "Paris" ? "75000" : "80000";
    var randomLatitude =
      randomCity == "Paris"
        ? parseFloat(48.875 + ((Math.random() - 0.5) * 2) / 2)
        : parseFloat(49.9 + ((Math.random() - 0.5) * 2) / 2);
    var randomLongitude =
      randomCity == "Paris"
        ? parseFloat(2.33 + ((Math.random() - 0.5) * 2) / 2)
        : parseFloat(2.3 + ((Math.random() - 0.5) * 2) / 2);
    var randomAddressName =
      randomCity == "Paris"
        ? `5${i} boulevard Pereire`
        : `5${i} boulevard de la molle fesse`;

    golf.push({
      golfName: nomGolf[i],
      practice: randomBool1,
      restauration: randomBool2,
      dixhuitTrous: 1,
      neufTrous: 1,
      golfAddress: {
        golfCity: randomCity,
        golfPostCode: randomPostCode,
        golfAddressName: randomAddressName,
        golfLatitude: randomLatitude,
        golfLongitude: randomLongitude,
      },

      parcours: [randomGolf(i, 9), randomGolf(nomParcours.length - 1 - i, 18)],
    });

    var newGolf = new GolfModel({
      golfName: golf[i].golfName,
      practice: golf[i].practice,
      restauration: golf[i].restauration,
      dixhuitTrous: golf[i].dixhuitTrous,
      neufTrous: golf[i].neufTrous,
      golfCity: golf[i].golfCity,
      golfAddress: golf[i].golfAddress,
      golfPostCode: golf[i].golfPostCode,
      parcours: golf[i].parcours,
    });
    var golfSaved = await newGolf.save();
  }
  res.json(golfSaved);
});

router.post("/register", async function (req, res, next) {
  var result = false;
  var user = null;
  var error = [];

  const data = await userModel.findOne({
    mail: req.body.emailFromFront,
  });

  if (data != null) {
    error.push("utilisateur déjà présent");
  }

  if (
    req.body.passwordFromFront == "" ||
    req.body.userNameFromFront == "" ||
    req.body.prenomFromFront == "" ||
    req.body.birthDateFromFront == ""
  ) {
    error.push("Des champs sont vides");
  }

  var regexMail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  if (!regexMail.test(req.body.emailFromFront)) {
    error.push("Email Incorrect");
  }

  var regexPassword = /^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$/;

  if (!regexPassword.test(req.body.passwordFromFront)) {
    error.push(
      "Mot de Passe Incorrect doit contenir au moins 8 charactères, 1 majuscule, 1 minuscule et 1 chiffre"
    );
  }
  var regexBirthDate = /^[0-3]?[0-9].[0-3]?[0-9].(?:[0-9]{2})?[0-9]{2}$/;
  if (
    !regexBirthDate.test(req.body.birthDateFromFront) &&
    req.body.birthDateFromFront.length < 10
  ) {
    error.push("Date de naissance incorrect");
  }

  if (error.length == 0) {
    var hash = bcrypt.hashSync(req.body.passwordFromFront, 10);

    var newUser = new userModel({
      mail: req.body.emailFromFront,
      password: hash,
      token: uid2(32),
      userName: req.body.userNameFromFront,
      userPrenom: req.body.prenomFromFront,
      birthDate: req.body.birthDateFromFront,
    });

    var user = await newUser.save();

    if (user) {
      result = true;
    }
  }

  res.json({ result, error, user });
});

router.post("/login", async function (req, res, next) {
  var result = false;
  var user = null;
  var error = [];
  var token = null;

  if (req.body.emailFromFront == "" || req.body.passwordFromFront == "") {
    error.push("champs vides");
  }

  if (error.length == 0) {
    user = await userModel.findOne({
      mail: req.body.emailFromFront,
    });

    if (user) {
      if (bcrypt.compareSync(req.body.passwordFromFront, user.password)) {
        result = true;
        token = user.token;
      } else {
        result = false;
        error.push("mot de passe incorrect");
      }
    } else {
      error.push("email incorrect");
    }
  }

  res.json({ result, error, user, token });
});

router.get("/getReservation/:tokenFromFront", async function (req, res, next) {
  var reservationTableau = await userModel
    .findOne({ token: req.params.tokenFromFront })
    .populate({
      path: "reservationId",
      populate: {
        path: "idJoueur",
      },
      populate: {
        path: "golfId",
      },
    });
  res.json({ reservation: reservationTableau.reservationId });
});

router.post("/saveScore", async function (req, res, next) {
  res.json({ result });
});

module.exports = router;
