const mongoose = require("mongoose");
const sauceSchema = mongoose.Schema({

userId: { type: String, require: true }, // l'identifiant MongoDB unique de l'utilisateur qui a créé la sauce
name: { type: String, require: true, minlength: 4, maxlength: 30 }, //nom de la sauce obligatoire
manufacturer: { type: String, require: true, minlength: 4, maxlength: 30 }, // fabricant de la sauce obligatoire
description: { type: String, require: true, minlength: 4, maxlength: 100 }, // description de la sauce obligatoire
mainPepper: { type: String, require: true, minlength: 3, maxlength: 20 }, // le principal ingrédient épicé de la sauce obligatoire
cloudinary_id:{ type: String, require: true },
imageUrl: { type: String, require: true }, // l'URL de l'image de la sauce téléchargée par l'utilisateur obligatoire
heat: { type: Number, require: true }, // // nombre entre 1 et 10 décrivant la sauce obligatoire
//Like et dislike
likes: { type: Number, default: 0 }, // nombre d'utilisateurs qui aiment (= likent) la sauce, à l'ajout il n'y en a pas donc 0 par défaut
dislikes: { type: Number, default: 0 }, // nombre d'utilisateurs qui n'aiment pas (= dislike) la sauce
usersLiked: { type: [String],default:[] }, // tableau des identifiants des utilisateurs qui ont aimé (= liked) la sauce
usersDisliked: { type: [String],default:[]  }, // tableau des identifiants des utilisateurs qui n'ont pas aimé (= disliked) la sauce
});

module.exports = mongoose.model('Sauce', sauceSchema)