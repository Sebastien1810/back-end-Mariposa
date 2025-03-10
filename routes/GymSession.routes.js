const router = require("express").Router();

const GymSession = require("../models/GymSession.model");

router.get("/gymSessions", (req, res) => {
  GymSession.find()
    .then((sessionsFromDB) => res.json(sessionsFromDB))
    .catch((error) => {
      console.error("Erreur lors de la récupération des sessions:", error);
      res
        .status(500)
        .json({ error: "Erreur lors de la récupération des sessions" });
    });
});

//Crée une nouvelle session de gym avec les données fournies dans le body de la requête.

router.post("/gymSessions", (req, res) => {
  const newGymSession = req.body;

  GymSession.create(newGymSession)
    .then((gymsessionFromDB) => res.status(201).json(gymsessionFromDB))
    .catch((error) => {
      console.error(
        "Erreur lors de la création d'une nouvelle session de gym:",
        error
      );
      res
        .status(500)
        .json({ error: "Échec de la création d'une nouvelle session de gym" });
    });
});

//Met à jour une session existante en utilisant son id passé en paramètre.

router.put("/gymSessions/:id", (req, res) => {
  const sessionId = req.params.id;
  const updatedData = req.body;

  GymSession.findByIdAndUpdate(sessionId, updatedData, { new: true })
    .then((updatedSession) => {
      if (!updatedSession) {
        return res.status(404).json({ error: "Session non trouvée" });
      }
      res.json(updatedSession);
    })
    .catch((error) => {
      console.error("Erreur lors de la mise à jour de la session :", error);
      res.status(500).json({ error: "Échec de la mise à jour de la session" });
    });
});

//Supprime une session en utilisant son idt passé en paramètre.

router.delete("/gymSessions/:id", (req, res) => {
  const sessionId = req.params.id;

  GymSession.findByIdAndDelete(sessionId)
    .then((deletedSession) => {
      if (!deletedSession) {
        return res.status(404).json({ error: "Session non trouvée" });
      }
      res.status(204).send();
    })
    .catch((error) => {
      console.error("Erreur lors de la suppression de la session :", error);
      res.status(500).json({ error: "Échec de la suppression de la session" });
    });
});

module.exports = router;
