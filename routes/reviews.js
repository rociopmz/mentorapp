const express = require("express");
const router = express.Router();
const Reviews = require("../models/Reviews");

router.get("/", (req, res, next) => {
  const { _id: owner } = req.user;
  Reviews.findOne({ owner })
    .then((reviews) => {
      res.status(201).json({ result: reviews });
    })
    .catch((error) => {
      res.status(400).json({ msg: "Algo salió mal", error });
    });
});

router.post("/create_reviews", (req, res, next) => {
  const { _id: mentee_owner } = req.user;
  Reviews.create({ ...req.body, mentee_owner })
    .then((reviews) => {
      res.status(201).json({ result: reviews });
    })
    .catch((error) => {
      res.status(400).json({ msg: "Algo salió mal", error });
    });
});

router.patch("/update_reviews", (req, res, next) => {
  const { _id: owner } = req.user;
  Reviews.findOneAndUpdate(
    { owner },
    { message: req.body.message },
    { new: true }
  )
    .then((reviews) => {
      res.status(201).json({ result: reviews });
    })
    .catch((error) => {
      res.status(400).json({ msg: "Algo salió mal", error });
    });
});

module.exports = router;
