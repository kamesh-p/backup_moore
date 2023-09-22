const mongoose = require("mongoose");

const favSchema = new mongoose.Schema(
  {
    user: {
      type: String,
    },

    bookid: {
      type: String,
    },
    isLiked: {
      type: Boolean,
    },
  },
  { collection: "fav" }
);

module.exports = mongoose.model("fav", favSchema);
