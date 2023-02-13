const Sauce = require("../models/sauce");
const { checkout } = require("../routes/sauce");
const fs = require("fs");
const cloudinary = require("../cloudinary");
const upload = require("../middleware/multer-config");
/*
exports.createSauce = (req, res, next) => {
  //need to parse req Object
  //frontend send req data as form-data .Body of req contains
  //the String Sauce - which is Object Sauce converted on String

  const sauceObject = JSON.parse(req.body.sauce);
  //   console.log(req.body)
  //   console.log(req.auth)

  //creating new instance Sauce from the SAuce model
  //adding Object with info sent from frontend and save it in Mongo DB

  delete sauceObject._id;
  delete sauceObject.userId;

  const sauce = new Sauce({
    ...sauceObject,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
   
  });
  console.log(imageUrl)
  sauce
    .save()
    .then(() => {
      res.status(201).json({ message: "post" });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};
*/

//test

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

exports.modifySauce =(req, res, next) => {

try {
  let sauce = Sauce.findById(req.params.id);
  if (sauce.userId != req.auth.userId) {
    res.status(401).json({ message: "Not authorized" });
  } else {
 cloudinary.uploader.destroy(sauce.cloudinary_id);
  const result = cloudinary.uploader.upload(req.file.path);
  const sauceObject = {
    ...JSON.parse(req.body),

    imageUrl: result.secure_url,
    cloudinary_id: result.public_id,
  };
  sauce = Sauce.findByIdAndUpdate(req.params.id, sauceObject, { new: true });
  res.status(200).json({ message: "Sauce modified" });
}} catch (error) {
  res.status(401).json({ error });
}

}////////////////////
//   const sauceObject = {};
//   let sauce = await Sauce.findById(req.params.id);
//   if (req.file) {
//     await cloudinary.uploader.destroy(sauce.cloudinary_id);
//     const result = await cloudinary.uploader.upload(req.file.path);

//     sauceObject = {
//       ...JSON.parse(req.body),

//       imageUrl: result.secure_url,
//       cloudinary_id: result.public_id,
//     };
//   } else {
//     sauceObject = {
//       ...req.body,
//     };
//   }
//   delete sauceObject._userID;

//   Sauce.findOne({ _id: req.params.id }).then((sauce) => {

//     if (sauce.userId != req.auth.userId) {
//       res.status(404).json({ message: "Not authorized" });
//     } else {
//       Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
//         .then(() => {
//           res.status(200).json({ message: "Sauce modified" });
//         })
//         .catch((error) => res.status(405).json({ error }));
//     }
//   });
// };



//V tuto
// try {
//   let sauce = await Sauce.findById(req.params.id);
//   if (sauce.userId != req.auth.userId) {
//     res.status(401).json({ message: "Not authorized" });
//   } else {
//   // await cloudinary.uploader.destroy(user.cloudinary_id);
//   const result = await cloudinary.uploader.upload(req.file.path);
//   const sauceObject = {
//     ...JSON.parse(req.body),

//     imageUrl: result.secure_url,
//     cloudinary_id: result.public_id,
//   };
//   sauce = await Sauce.findByIdAndUpdate(req.params.id, sauceObject, { new: true });
//   res.status(200).json({ message: "Sauce modified" });
// }} catch (error) {
//   res.status(401).json({ error });
// }

// console.log(req.params.id);
// console.log(req);
// // console.log(req.auth.userId)

// const result = cloudinary.uploader.upload(req.file.path);
// const sauceObject = req.file
//   ? {
//       ...JSON.parse(req.body),
//       // imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
//       imageUrl: result.secure_url,
//       cloudinary_id: result.public_id,
//     }
//   : {
//       ...req.body,
//     };
// delete sauceObject._userID;

// // we check if the user is owner of the sauce Object
// Sauce.findOne({ _id: req.params.id }).then((sauce) => {
//   console.log(sauce);
//   if (sauce.userId != req.auth.userId) {
//     res.status(401).json({ message: "Not authorized" });
//   } else {
//     cloudinary.uploader.destroy(sauce.cloudinary_id);
//     Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
//       .then(() => {
//         res.status(200).json({ message: "Sauce modified" });
//       })
//       .catch((error) => res.status(401).json({ error }));
//   }
// });

// exports.modifySauce = async (req, res, next) => {
//   Sauce.findOne({ _id: req.params.id })
//     .then((sauce) => {
//       if (sauce.userId != req.auth.userId) {
//         res.status(401).json({ message: "Not authorized" });
//       } else {
//         cloudinary.uploader.destroy(sauce.cloudinary_id);
//         const result = cloudinary.uploader.upload(req.file.path);
//         const sauceObject = {
//           ...JSON.parse(req.body),
//           imageUrl: result.secure_url,
//           cloudinary_id: result.public_id,
//         };

//         Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id }).then(() => {
//           res.status(200).json({ message: "Sauce modified" });
//         });
//       }
//     })
//     .catch((error) => res.status(401).json({ error }));
// };

// // we check if the user is owner of the sauce Object
// Sauce.findOne({ _id: req.params.id }).then((sauce) => {

//   if (sauce.userId != req.auth.userId) {
//     res.status(401).json({ message: "Not authorized" });
//   } else {
//     {
//       cloudinary.uploader.destroy(sauce.cloudinary_id);
//       const result = cloudinary.uploader.upload(req.file.path);
//       const sauceObject = req.file
//         ? {
//             ...JSON.parse(req.body),
//             imageUrl: result.secure_url,
//             cloudinary_id: result.public_id,
//           }
//         : {
//             ...req.body,
//           };
//           delete sauceObject._userID;
//       Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
//         .then(() => {
//           res.status(200).json({ message: "Sauce modified" });
//         })
//         .catch((error) => res.status(401).json({ error }));
//     }
//   }
// });

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
  next();
};

exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then((sauces) => {
      res.status(200).json(sauces);
    })
    .catch((error) => res.status(400).json({ error }));
};

/**
 * exports.deleteSauce = (req, res, next) => {
  //we use ID received in params for access the Sauce in the
  // Mongo DB
  Sauce.findOne({ _id: req.params.id })
    //check if the user is a owner of the Sauce object
    //sauce is a entire Object
    .then((sauce) => {
      if (sauce.userId != req.auth.userId) {
        res.status(401).json({ message: "Not authorized" });
      } else {
        //we tale the name of file
        const filename = sauce.imageUrl.split("/images")[1];
        //we use fonction .unlink of fs package for delet the file
        //by providing in arguments the file name to delete and callback to exicute
        //once the file is deleted
        fs.unlink(`images/${filename}`, () => {
          //we delete the Sauce from the Mongo DB
          Sauce.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: "Sauce deleted" }))
            .catch((error) => res.status(401).json(error));
        });
      }
    })
    .catch((error) => res.status(500).json(error));
};
 */
/**
 * exports.modifySauce = (req, res, next) => {
  console.log(req.params.id);
  console.log(req);
  // console.log(req.auth.userId)
  const sauceObject = req.file
    ? {
        ...JSON.parse(req.body),
        // imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
        imageUrl: req.file.image.buffer,
      }
    : {
        ...req.body,
      };
  delete sauceObject._userID;

  // we check if the user is owner of the sauce Object
  Sauce.findOne({ _id: req.params.id }).then((sauce) => {
    console.log(sauce);
    if (sauce.userId != req.auth.userId) {
      res.status(401).json({ message: "Not authorized" });
    } else {
      Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
        .then(() => {
          res.status(200).json({ message: "Sauce modified" });
        })
        .catch((error) => res.status(401).json({ error }));
    }
  });
};
 */
