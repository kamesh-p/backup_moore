const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    user: {
      type: String,
    },

    bookid: {
      type: String,
    },

    comments: {
      type: String,
    },
  },
  { collection: "comments" }
);

module.exports = mongoose.model("comments", commentSchema);
