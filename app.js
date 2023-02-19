const express = require("express");
const bodyParser = require('body-parser')
let cors = require("cors");
//  pour accéder au path de notre serveur :
const userRoutes = require("./routes/user");
const sauceRoutes = require("./routes/sauce");

//on rajoute package mongoose pour MongoDB ATlas

const mongoose = require("mongoose");






const app = express();
app.use(cors());
//on rajoute un middleware pour eviter l'erreur CORS (requete HTTP - echange entre 2 serveurs)

mongoose
  .connect("mongodb+srv://admin:Coucou1984@cluster0.b4hdjgg.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));


//on crée l'app


app.use((req, res, next) => {
  //permet d'accéder à notre API depuis n'importe quelle origine
  res.setHeader("Access-Control-Allow-Origin", "*");
  //permet d'ajouter les headers mentionnés aux requêtes envoyées vers notre API
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
  //permet d'envoyer des requêtes avec les méthodes mentionnées
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  next();
});

//Pour gérer la requête POST venant de l'application front-end, on a besoin d'en extraire le corps JSON.
app.use(express.json());
// app.use(express.urlencoded({ extended: false }))




app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
//on utilise les routes definies avec url initial

app.use("/api/auth/", userRoutes);
app.use("/api/sauces", sauceRoutes);
// app.use("/images", express.static(path.join(__dirname, "images")));

//images are stored in cloudinary 
//app.use('/images', sauceRoutes)



////////////////////////BUILD FOR HEROKU


//app.use(express.static('./build/'));

app.get('/*', (req, res) => {
  res.sendFile('index.html', { root: 'build/' });
});




////////////////////////////////////////////////////////
/*
app.use(express.static('./images'))
app.get('/images', (req, res) => {
  res.sendFile(path.join(__dirname, "images"));
});*/
//on export module app
module.exports = app;
