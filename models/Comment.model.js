// models/Comment.model.js
const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
  {
    content: { type: String, required: true },
    gymSession: {
      type: Schema.Types.ObjectId,
      ref: "GymSession",
      required: true,
    },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Comment = model("Comment", commentSchema);

module.exports = Comment;
