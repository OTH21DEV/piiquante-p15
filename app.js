const express = require("express");
const bodyParser = require("body-parser");
let cors = require("cors");
const userRoutes = require("./routes/user");
const sauceRoutes = require("./routes/sauce");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(cors());

mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

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
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/auth/", userRoutes);
app.use("/api/sauces", sauceRoutes);

app.use(express.static("./build/"));

app.get("/*", (req, res) => {
  res.sendFile("index.html", { root: "build/" });
});

module.exports = app;
