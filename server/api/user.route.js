import express from "express";
import User from "../models/user.model.js";
import auth from "../middleware/auth.js";
import multer from "multer";
import mongoose from "mongoose";
import url from "url";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../upload/avatar"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
//new Date().toISOString().replace(/:/g, "-") +

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let upload = multer({ storage, fileFilter });

router.route("/register").post((req, res) => {
  const { name, lastName, password, email } = req.body;

  const newUser = new User({
    name,
    lastName,
    password,
    email,
  });

  console.log(newUser);
  newUser
    .save()
    .then(() => res.json({ success: true }))
    .catch((err) =>
      res.status(200).json({ success: false, message: `${err}` })
    );
});

router.route("/login").post((req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) return res.json({ msg: "Error" });

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({ loginSuccess: false, message: "Wrong Password" });

      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res.cookie("jw_auth", user.token).status(200).json({
          loginSuccess: true,
        });
      });
    });
  });
});

router.route("/logout").get(auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }).then(() => {
    res.status(200).send({ success: true });
  });
});

router.route("/auth").get(auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastName,
    likedRest: req.user.likedRest,
    reviews: req.user.reviews,
    image: req.user.image,
    selectedBg: req.user.selectedBg,
  });
});

router.route("/like/:id").post((req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      user.likedRest.push(req.body);
      user
        .save()
        .then(() => res.json("liked!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => err);
});

router.route("/deletelike/:id").post((req, res) => {
  User.findOneAndUpdate(
    { _id: req.body.userId },
    { $pull: { likedRest: { _id: req.params.id } } }
  )
    .then(() => res.json("Deleted !"))
    .catch((err) => res.status(400).json(`Error ${err}`));
});

router.route("/addreview").post((req, res) => {
  User.findByIdAndUpdate({ _id: req.body.id }).then((user) => {
    const reviewData = {
      restName: req.body.restName,
      userName: user.name,
      raiting: req.body.raiting,
      comment: req.body.comment,
    };
    // console.log(reviewData);
    user.reviews.push(reviewData);
    user
      .save()
      .then(() => res.json("review added!"))
      .catch((err) => {
        res.status(400).json(`Error ${err}`);
      });
  });
});
router.route("/reviews/:id").get((req, res) => {
  // console.log(req.params.id);
  User.findByIdAndUpdate({ _id: req.params.id }).then((user) => {
    res.json(user.reviews);
  });
});
router.route("/liked/:id").get((req, res) => {
  User.findByIdAndUpdate({ _id: req.params.id }).then((user) => {
    res.json(user.likedRest);
  });
});

router.route("/profile/:id").post(upload.single("avatar"), (req, res) => {
  User.findById({ _id: req.params.id }).then((user) => {
    user.image = req.file.filename;

    console.log(user);
    user
      .save()
      .then(() => res.json("Image Added!"))
      .catch((err) => {
        res.status(400).json(`Error ${err}`);
      });
  });
});

router.route("/profile/addbg/:id").post((req, res) => {
  User.findById({ _id: req.params.id }).then((user) => {
    const { _id, bg, color } = req.body;

    (user.selectedBg.bgimage = bg),
      (user.selectedBg.color = color),
      (user.selectedBg._id = _id);
    user
      .save()
      .then(() =>
        res.status(200).json({
          message: "Bg added!",
          bg: user.selectedBg.bgimage,
          color: user.selectedBg.color,
          _id: user.selectedBg._id,
        })
      )
      .catch((err) => {
        res.status(400).json(`Error ${err}`);
      });
  });
});

router.route("/profile/addnote/:id").post((req, res, exec) => {
  const id = req.params.id;

  const note = {
    _id: new mongoose.Types.ObjectId(),
    status: req.body.status,
    title: req.body.title,
    note: req.body.note,
    date: new Date().toLocaleDateString(),
  };

  User.findById({ _id: id })
    .exec()
    .then((user) => {
      user.notes.push(note);
      user
        .save()
        .then(() => res.json({ message: "success" }))
        .catch((err) => res.status(500).json({ message: `Error ${err}` }));
    })
    .catch((err) => err);
});

router.route("/profile/getnote/:id").get((req, res) => {
  const id = req.params.id;

  User.findById({ _id: id })
    .then((user) => {
      res.json(user.notes);
    })
    .catch((err) => res.status(500).json({ message: `Error ${err}` }));
});

router.route("/profile/deletenote/:id").post((req, res) => {
  const userId = req.params.id;
  const id = req.body._id;

  User.findByIdAndUpdate(
    { _id: userId },
    { $pull: { notes: { _id: mongoose.Types.ObjectId(id) } } }
  )
    .exec()
    .then(() => res.json("Deleted !"))
    .catch((err) => res.status(400).json(`Error ${err}`));
});

export default router;
