import express from "express";
import Restaurant from "../models/restaurants.model.js";
import multer from "multer";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../upload/restaurants"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let upload = multer({ storage, fileFilter });

router.route("/").get((req, res) => {
  Restaurant.find()
    .then((restaurant) => {
      res.json(restaurant);
    })
    .catch((err) => res.status(400).json(`Error ${err}`));
});

router.route("/:id").get((req, res) => {
  const id = req.params.id;

  Restaurant.findById(id)
    .then((restaurant) => res.json(restaurant))
    .catch((err) => res.status(400).json(`Error ${err}`));
});

router.route("/update/:id").post((req, res) => {
  Restaurant.findById(req.params.id)
    .then((rest) => {
      rest.reviews.push(req.body);

      rest
        .save()
        .then(() => res.json("Restaurant updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post(upload.single("photo"), (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const address = req.body.address;
  const cuisine_type = req.body.cuisine_type;
  const latlng = {
    lat: req.body.lat,
    lng: req.body.lng,
  };
  const neighborhood = req.body.neighborhood;
  const reviews = req.body.reviews;
  const image = req.file.filename;

  const newRestaurant = new Restaurant({
    id,
    name,
    address,
    cuisine_type,
    latlng,
    neighborhood,
    reviews,
    image,
  });

  newRestaurant
    .save()
    .then((rest) => res.json(rest))
    .catch((err) => res.status(400).json(`Error ${err}`));
});

export default router;
