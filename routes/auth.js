const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (error, user, errDetails) => {
    if (error) return res.status(500).json({ message: errDetails });
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    req.login(user, (error) => {
      if (error) return res.status(500).json({ message: errDetails });
      //const usr = clearRes(user.toObject());
      res.status(200).json({user});
    });
  })(req, res, next);
});

router.post("/signup", (req, res, next) => {
  const { email, password, ...restInfo } = req.body;
  if (email === "" || password === "") {
    res.json({ message: "Indicate email and password" });
    return;
  }

  User.findOne({ email }, "email", (err, user) => {
    if (user !== null) {
      res.json({ message: "The email already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      email,
      password: hashPass,
      ...restInfo,
    });

    newUser
      .save()
      .then(() => {
        res.json({user: newUser});
      })
      .catch((err) => {
        res.json({ message: "Something went wrong", err });
      });
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.json({ message: "logged out" });
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/google/callback", (req, res, next) => {
  passport.authenticate("google", { scope: ["email"] }, (err, user, info) => {
    if (err) return res.status(500).json({ err, info });
    if (!user) return res.status(401).json({ err, info });
    req.login(user, (error) => {
      if (error) return res.status(401).json({ error });
      return res.redirect("/");
    });
  })(req, res, next);
});

router.patch("/update", (req, res) =>{
  const {_id, ...restBody} = req.body 
 User.findOneAndUpdate({_id},{...restBody},{new: true})
 .then((user) => {
  res.status(200).json({ result:user})
 })
 .catch((err) => {
  res.json({ message: "Something went wrong", err });
});
} )

router.get("/getlist/:role", (req, res)=>{
  const {role} = req.params
  User.find({role})
  .then((users) => {
    res.status(200).json({ result:users})
   })
   .catch((err) => {
    res.json({ message: "Something went wrong", err });
  });
})


module.exports = router;
