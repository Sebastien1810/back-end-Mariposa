const router = require("express").Router();
const MateFinder = require("../models/MateFinder");
const { isAuthenticated } = require("../middleware/jwt.middleware");

// GET /api/matefinder -> Récupère le profil MateFinder de l'utilisateur connecté
router.get("/", isAuthenticated, async (req, res) => {
  try {
    const userId = req.payload._id;
    const profile = await MateFinder.findOne({ user: userId });
    res.json(profile); // peut être null si pas encore créé
  } catch (err) {
    res.status(500).json({ message: "Error fetching MateFinder profile", err });
  }
});

//POST /api/matefinder -> Crée ou met à jour le profil MateFinder
router.post("/", isAuthenticated, async (req, res) => {
  try {
    const userId = req.payload._id;
    const { location, preferredWorkout, preferredTime } = req.body;

    // findOneAndUpdate + upsert => si profil existe on update sinon, on le crée
    const profile = await MateFinder.findOneAndUpdate(
      { user: userId },
      { location, preferredWorkout, preferredTime, user: userId },
      { new: true, upsert: true }
    );
    res.json(profile);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating/creating MateFinder", err });
  }
});

//  GET /api/matefinder/matches -> Cherche des GymSessions qui matchent le profil
router.get("/matches", isAuthenticated, async (req, res) => {
  try {
    const userId = req.payload._id;
    const profile = await MateFinder.findOne({ user: userId });

    if (!profile) {
      return res.json([]); // Pas de profil => pas de suggestions
    }

    // On récupère le modèle GymSession
    const GymSession = require("../models/GymSession.model");

    // Filtre de matching  ex. workout = preferredWorkout, favoriteTime = preferredTime
    const matches = await GymSession.find({
      typeOfWorkout: profile.preferredWorkout,
      favoriteTimeforWorkout: profile.preferredTime,
      location: profile.location, // ou un critère plus souple
    });

    res.json(matches);
  } catch (err) {
    res.status(500).json({ message: "Error fetching matches", err });
  }
});

module.exports = router;
