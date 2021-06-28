import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const saltRounds = 10;

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      unique: 1,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
    name: {
      type: String,
      required: true,
      maxlength: 100,
    },
    lastName: {
      type: String,
      required: true,
      maxlength: 100,
    },
    likedRest: {
      type: Array,
    },
    reviews: {
      type: Array,
      restName: {
        type: String,
        unique: 1,
      },
      userName: String,
      raiting: String,
      comment: String,
    },
    role: {
      type: Number,
      default: 0,
    },
    image: { type: String },
    token: {
      type: String,
    },
    profileImg: String,
    selectedBg: {
      _id: String,
      bgimage: String,
      color: String,
    },
    notes: {
      type: Array,
      note: {
        _id: String,
        status: String,
        title: { type: String, unique: 1 },
        note: Date,
      },
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  const user = this;

  if (user.isModified("password")) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

userSchema.methods.generateToken = function (cb) {
  const user = this;
  const token = jwt.sign(user._id.toHexString(), process.env.SECRET);
  // console.log(token);
  // console.log(user);

  user.token = token;
  user.save(function (err, user) {
    // console.log(user)
    if (err) return cb(err);
    cb(null, user);
  });
};

userSchema.statics.findByToken = function (token, cb) {
  const user = this;

  jwt.verify(token, process.env.SECRET, function (err, decode) {
    user.findOne({ _id: decode, token: token }, function (err, user) {
      // console.log(user);
      if (err) return cb(err);
      cb(null, user);
    });
  });
};

export default mongoose.model("User", userSchema);
