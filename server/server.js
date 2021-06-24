import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import restaurants from "./api/restaurants.route.js";
import users from "./api/user.route.js";
import background from "./api/bg.route.js";
import cookieParser from "cookie-parser";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const corsConfig = {
  origin: true,
  credentials: true,
};
const app = express();
app.use(cors(corsConfig));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/", express.static(path.join(__dirname, "upload")));
const port = process.env.PORT || 8000;

const url = process.env.DATABASE;
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    poolSize: 50,
    useFindAndModify: false,
  })
  .then(() => console.log("MONGO is conected"))
  .catch((err) => console.log(err));

app.use("/api/v1/restaurants", restaurants);
app.use("/api/v1/users", users);
app.use("/api/v1/profileBg", background);
// app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

//production!

// app.use(express.static(path.resolve(__dirname, "../client/build")));

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
// });

if (process.env.NODE_ENV === "production") {
  // app.use(express.static("../client/build"));
  app.use(express.static(path.resolve(__dirname, "../client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
  });
}
app.listen(port, () => {
  console.log(`listen on port ${port}`);
});
