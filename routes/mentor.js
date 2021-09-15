const express = require("express");
const router = express.Router();
const Mentor = require("../models/Mentor");
const User = require("../models/User");

router.get("/", (req, res, next) => {
  const { _id: user } = req.user;
  Mentor.findOne({ user })
    .then((mentor) => {
      res.status(201).json({ result: mentor });
    })
    .catch((error) => {
      res.status(400).json({ msg: "Algo salió mal", error });
    });
});

router.post("/create_mentor", (req, res, next) => {
  const { _id: user } = req.user;
  console.log("este es el user", req.user);
  User.findByIdAndUpdate(user, { role: "mentor" }, { new: true })
    .then((mentor) => {})
    .catch((error) => {});
  Mentor.create({ ...req.body, user })
    .then((mentor) => {
      res.status(201).json({ result: mentor });
    })
    .catch((error) => {
      res.status(400).json({ msg: "Algo salió mal", error });
    });
});

router.patch("/update_mentor", (req, res, next) => {
  const { _id: user } = req.user;
  Mentor.findOneAndUpdate({ user }, { ...req.body }, { new: true })
    .then((mentor) => {
      res.status(201).json({ result: mentor });
    })
    .catch((error) => {
      res.status(400).json({ msg: "Algo salió mal", error });
    });
});

module.exports = router;
