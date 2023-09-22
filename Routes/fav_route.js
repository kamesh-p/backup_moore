let mongoose = require("mongoose"),
  express = require("express"),
  favRouter = express.Router();

let favSchema = require("../Models/favourites_Schema");

favRouter.route("/create-user").post((req, res, next) => {
  favSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log(data);

      res.json(data);
    }
  });
});

favRouter.route("/").get((req, res) => {
  favSchema.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

favRouter.route("/get-user/:id").get((req, res) => {
  favSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

favRouter.route("/update-user/:id").put(async (req, res, next) => {
  const userId = req.params.id;
  const { bookId, isLiked } = req.body;

  try {
    const user = await favSchema.findByIdAndUpdate(
      userId,
      { $set: { [`books.${bookId}.isLiked`]: isLiked } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json({ message: "User updated successfully", user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

favRouter.route("/delete-user/:id").delete((req, res, next) => {
  favSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
});

module.exports = favRouter;
