const express = require("express");
const router = express.Router();
const Mentee = require("../models/Mentee");
const User = require("../models/User");

router.get("/", (req, res, next) => {
  const { _id: user } = req.user;
  Mentee.findOne({ user })
    .then((mentee) => {
      res.status(201).json({ result: mentee });
    })
    .catch((error) => {
      res.status(400).json({ msg: "Algo salió mal", error });
    });
});

router.post("/create_mentee", (req, res, next) => {
  const { _id: user } = req.user;
  User.findByIdAndUpdate(user, { role: "mentee" }, { new: true })
    .then((mentor) => {})
    .catch((error) => {});
  Mentee.create({ ...req.body, user })
    .then((mentee) => {
      res.status(201).json({ result: mentee });
    })
    .catch((error) => {
      res.status(400).json({ msg: "Algo salió mal", error });
    });
});

router.patch("/update_mentee", (req, res, next) => {
  const { _id: user } = req.user;
  Mentee.findOneAndUpdate({ user }, { ...req.body }, { new: true })
    .then((mentee) => {
      res.status(201).json({ result: mentee });
    })
    .catch((error) => {
      res.status(400).json({ msg: "Algo salió mal", error });
    });
});

module.exports = router;
