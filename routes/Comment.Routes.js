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
module.exports = router;
