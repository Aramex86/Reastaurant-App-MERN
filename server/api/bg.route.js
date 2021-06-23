import express from "express";
import Background from "../models/profileBg.model.js";
import User from "../models/user.model.js";

const router = express.Router();

router.route("/setbg").get((req, res) => {
  Background.find()
    .then((b) => {
      res.json(b);
    })
    .catch((err) => res.json(err));
});

router.route("/setprofilebg/:id").get((req, res) => {
  User.findOne({ _id: req.params.id })
    .then((user) => {
      res.status(200).json(user.selectedBg);
    })
    .catch((err) => res.json(err));
});

router.route("/add").post((req, res) => {
  const bgimage = req.body.bgimage;
  const color = req.body.color;
  console.log(req.body);
  const newBg = new Background({
    bgimage,
    color,
  });

  newBg
    .save()
    .then(() => res.json("Restaurant Add!"))
    .catch((err) => res.status(400).json(`Error ${err}`));
});

export default router;
