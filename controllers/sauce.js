const Sauce = require("../models/sauce");
const cloudinary = require("../cloudinary");

exports.createSauce = async (req, res, next) => {
  try {
    //need to parse req Object
    //frontend send req data as form-data .Body of req contains
    //the String Sauce - which is Object Sauce converted on String

    const sauceObject = JSON.parse(req.body.sauce);
    const result = await cloudinary.uploader.upload(req.file.path);
    delete sauceObject._id;
    delete sauceObject.userId;

    //create instance of Sauce from Sauce model
    //adding Object with info sent from frontend and save it in Mongo DB
    const sauce = new Sauce({
      ...sauceObject,
      userId: req.auth.userId,
      imageUrl: result.secure_url,
      cloudinary_id: result.public_id,
    });
    //Save sauce in Mongo Db Atlas
    await sauce.save().then(() => {
      res.status(201).json({ message: "post" });
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};

// we create an Object sauceObject which will check
// if req.file existe , if yes, we take new image,
// otherwise we take entering Object

exports.modifySauce = async (req, res, next) => {
  console.log(req.file);
  try {
    let sauce = await Sauce.findById(req.params.id);

    let result;

    let sauceObject;
    if (req.file) {
      await cloudinary.uploader.destroy(sauce.cloudinary_id);
      result = await cloudinary.uploader.upload(req.file.path);
      sauceObject = {
        ...req.body,
        imageUrl: result.secure_url,
        cloudinary_id: result.public_id,
      };
    } else {
      sauceObject = {
        ...req.body,
        imageUrl: sauce.secure_url,
        cloudinary_id: sauce.public_id,
      };
    }

    delete sauceObject._userID;

    Sauce.findOne({ _id: req.params.id }).then((sauce) => {
      //   console.log(sauce);
      if (sauce.userId != req.auth.userId) {
        res.status(401).json({ message: "Not authorized" });
      } else {
        Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id }).then(() => {
          res.status(200).json({ message: "Sauce modified" });
        });
      }
    });
  } catch (error) {
    res.status(402).json({ error });
  }
};

exports.sauceNotation = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }).then((sauce) => {
    console.log(req.body);
    if (req.body.like == 1) {
      if (!sauce.usersLiked.includes(req.body.userId)) {
        Sauce.updateOne({ _id: req.params.id }, { $inc: { likes: 1 }, $push: { usersLiked: req.body.userId } })
          .then(() => {
            res.status(200).json({ message: "Like added" });
          })
          .catch((error) => res.status(401).json({ error }));
      }
    }

    if (req.body.like == -1) {
      if (!sauce.usersDisliked.includes(req.body.userId)) {
        Sauce.updateOne({ _id: req.params.id }, { $inc: { dislikes: 1 }, $push: { usersDisliked: req.body.userId } })
          .then(() => {
            res.status(200).json({ message: "Dislike added" });
          })
          .catch((error) => res.status(401).json({ error }));
      }
    }
    //case of like cancellation
    if (req.body.like == 0) {
      if (sauce.usersLiked.includes(req.body.userId)) {
        Sauce.updateOne({ _id: req.params.id }, { $inc: { likes: -1 }, $pull: { usersLiked: req.body.userId } })
          .then(() => {
            res.status(200).json({ message: "Like canceled" });
          })
          .catch((error) => res.status(401).json({ error }));
      }
      //case of dislike cancellation
      if (sauce.usersDisliked.includes(req.body.userId)) {
        Sauce.updateOne({ _id: req.params.id }, { $inc: { dislikes: -1 }, $pull: { usersDisliked: req.body.userId } })
          .then(() => {
            res.status(200).json({ message: "Dislike canceled" });
          })
          .catch((error) => res.status(401).json({ error }));
      }
    }
  });
};

exports.deleteSauce = (req, res, next) => {
  //we use ID received in params for access the Sauce in the
  // Mongo DB
  Sauce.findOne({ _id: req.params.id })
    //check if the user is a owner of the Sauce object
    //sauce is a entire Object
    .then((sauce) => {
      if (sauce.userId != req.auth.userId) {
        res.status(401).json({ message: "Not authorized" });
      } else {
        //Delete image from cloudinary
        cloudinary.uploader.destroy(sauce.cloudinary_id);
        const filename = sauce.imageUrl.split("/images")[1];

        //Delete the Sauce from the Mongo DB
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Sauce deleted" }))
          .catch((error) => res.status(401).json(error));
        // });
      }
    })
    .catch((error) => res.status(500).json(error));
};

exports.getOneSauce = async (req, res, next) => {
  await Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      res.status(200).json(sauce);
    })
    .catch((error) => res.status(404).json(error));
  //next();
};

exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then((sauces) => {
      res.status(200).json(sauces);
    })
    .catch((error) => res.status(400).json({ error }));
};
