const router = require("express").Router();
const Comment = require("../models/Comment.model");

router.post("/Comment", (req, res) => {
  console.log("Received comment data:", req.body);
  // On mappe les champs du payload aux clés attendues par le modèle
  const newCommentData = {
    commentContent: req.body.content,
    gymSession: req.body.gymSession,
    user: req.body.createdBy,
  };

  Comment.create(newCommentData)
    .then((commentFromDB) => {
      console.log(commentFromDB);
      res.status(201).json(commentFromDB);
    })
    .catch((error) => {
      console.log("Error creating a new comment");
      console.error(error);
      res.status(500).json({ error: "Failed to create a new comment" });
    });
});

router.put("/Comment/:id", (req, res) => {
  const commentId = req.params.id;
  const updateData = req.body;

  Comment.findByIdAndUpdate(commentId, updateData, { new: true })
    .then((updatedComment) => {
      if (!updatedComment) {
        return res.status(404).json({ error: "Comment not found" });
      }
      res.json(updatedComment);
    })
    .catch((error) => {
      console.log("Error updating comment", error);
      res.status(500).json({ error: "Error updating comment" });
    });
});

router.get("/comments", (req, res) => {
  Comment.find()
    .populate("gymSession")
    .then((comments) => res.json(comments))
    .catch((error) => {
      console.error("Error fetching comments:", error);
      res.status(500).json({ error: "Error fetching comments" });
    });
});

router.delete("/Comment/:id", (req, res) => {
  const commentId = req.params.id;

  Comment.findByIdAndDelete(commentId)
    .then((deletedComment) => {
      if (!deletedComment) {
        return res.status(404).json({ error: "Comment not found" });
      }
      res.status(204).send();
    })
    .catch((error) => {
      console.log("Error deleting comment", error);
      res.status(500).json({ error: "Error deleting comment" });
    });
});

module.exports = router;
