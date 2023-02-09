//hash for password

const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.signup = (req, res, next) => {
  console.log(req.body);
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "User created" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  //verify if user exists in Mongo DB
   User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
       return res.status(401).json({ message: "incorrect credentials" });
      }
      //compare if given password (req.body.password) is the same as in
      //MongoDb (user.password)
      else {
      bcrypt
          .compare (req.body.password, user.password)
          .then((valid) => {
            if (!valid) {
             return res.status(402).json({ message: "incorrect credentials" });
            } else {
              //send the info with userId and token
              res.status(200).json({
                userId: user._id,
                //token arguments (data to encode - here id user, secret key for encode,
                //configuration of token validity)
                token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", { expiresIn: "24h" }),
              });
            }
          })
          .catch((error) => {
            res.status(500).json({ error });
          });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
