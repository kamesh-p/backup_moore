let mongoose = require("mongoose"),
  express = require("express"),
  commentRouter = express.Router();

let commentSchema = require("../Models/comment_schema");

commentRouter.route("/create-user").post((req, res, next) => {
  commentSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log(data);

      res.json(data);
    }
  });
});

commentRouter.route("/").get((req, res) => {
  commentSchema.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

commentRouter.route("/get-user/:id").get((req, res) => {
  commentSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

commentRouter.route("/update-user/:id").put((req, res, next) => {
  commentSchema.findByIdAndUpdate(
    req.params.id,

    {
      $set: req.body,
    },

    (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json(data);

        console.log("user updated successfully !");
      }
    }
  );
});

commentRouter.route("/delete-user/:id").delete((req, res, next) => {
  commentSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
});

module.exports = commentRouter;
