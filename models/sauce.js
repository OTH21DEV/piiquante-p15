const mongoose = require("mongoose");
const sauceSchema = mongoose.Schema({
  userId: { type: String, require: true },
  name: { type: String, require: true, minlength: 4, maxlength: 30 },
  manufacturer: { type: String, require: true, minlength: 4, maxlength: 30 },
  description: { type: String, require: true, minlength: 4, maxlength: 100 },
  mainPepper: { type: String, require: true, minlength: 3, maxlength: 20 },
  cloudinary_id: { type: String },
  imageUrl: { type: String },
  heat: { type: Number, require: true },
  //Like et dislike
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  usersLiked: { type: [String], default: [] },
  usersDisliked: { type: [String], default: [] },
});

module.exports = mongoose.model("Sauce", sauceSchema);
