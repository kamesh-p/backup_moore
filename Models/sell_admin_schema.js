const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let saleAdminSchema = new Schema(
  {
    user: {
      type: {},
    },

    title: {
      type: String,
    },

    description: {
      type: String,
    },
    author: {
      type: String,
    },
    classification: {
      type: String,
    },
    Education: {
      type: String,
    },
    Genre: {
      type: String,
    },
    language: {
      type: String,
    },

    price: {
      type: Number,
    },
    imageUrl: {
      type: String,
    },
  },

  {
    collection: "sellAdmin",
  }
);

module.exports = mongoose.model("sellAdmin", saleAdminSchema);
