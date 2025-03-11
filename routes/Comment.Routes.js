const router = require("express").Router();
const Comment = require("../models/Comment.model");

router.post("/Comment", (req, res) => {
  const newComment = req.body;

  Comment.create(newComment)
    .then((CommentFromDB) => {
      res.status(201).json(CommentFromDB);
    })
    .catch((error) => {
      console.log("Error for create a new comment");
      console.log(error);
      res.status(500).json({ error: "Failed to create a new comment" });
    });
});
router.delete("/Comment/:id", (req, res) => {
  const commentId = req.params.id;

  Comment.findByIdAndDelete(commentId)
    .then((deleteComment) => {
      if (!deleteComment) {
        return res.status(404).json({ error: "Comment not found" });
      }
      res.status(204).send();
    })
    .catch((error) => {
      console.log("error deleting comment", error);
      res.status(500).json({ error: "Eror deleting comment" });
    });
});

module.exports = router;
