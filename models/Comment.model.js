// models/Comment.model.js
const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
  commentContent: {
    type: String,
    required: true,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  gymSession: {
    type: Schema.Types.ObjectId,
    ref: "GymSession",
    required: true,
  },
});

const Comment = model("Comment", commentSchema);

module.exports = Comment;
