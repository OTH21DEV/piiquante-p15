const express = require("express");
let cors = require("cors");
//  pour accéder au path de notre serveur :
const userRoutes = require("./routes/user");
const sauceRoutes = require("./routes/sauce");
const path = require("path");
//on rajoute package mongoose pour MongoDB ATlas

const mongoose = require("mongoose");
// const stuffRoutes = require ('./routes/stuff')
// const userRoutes = require('./routes/user')


//test


const upload = require('./middleware/multer-config')
const cloudinary = require ('./cloudinary')
const fs = require('fs');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())
app.use('/images', upload.array('image'), async (req, res) => {

  const uploader = async (path) => await cloudinary.uploads(path, 'Images');

  if (req.method === 'POST') {
    const urls = []
    const files = req.files;
    for (const file of files) {
      const { path } = file;
      const newPath = await uploader(path)
      urls.push(newPath)
      fs.unlinkSync(path)
    }

    res.status(200).json({
      message: 'images uploaded successfully',
      data: urls
    })

  } else {
    res.status(405).json({
      err: `${req.method} method not allowed`
    })
  }
})

//

mongoose
  .connect("mongodb+srv://admin:Coucou1984@cluster0.b4hdjgg.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

//on rajoute une methode pour definir la reponse de notre application :
/*
app.use((rez,res)=>{
    //la reponse sous format json contenat un objet 
    res.json({ message: 'votre requete a bien été recu!'})
})
*/

//on crée l'app

const app = express();
app.use(cors());
//on rajoute un middleware pour eviter l'erreur CORS (requete HTTP - echange entre 2 serveurs)

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

//on utilise les routes definies avec url initial
// app.use('/api/stuff', stuffRoutes)
// app.use('/api/auth', userRoutes)
app.use("/api/auth/", userRoutes);
app.use("/api/sauces", sauceRoutes);
// app.use("/images", express.static(path.join(__dirname, "images")));



/*TEST  */

// app.use(express.static(path.join(__dirname + "/../build")));
//add path to index.html for Heroku server:
/*
app.get("*", (req, res, next) => {
  //add path to index.html for Heroku server:
  res.sendFile(path.join(__dirname, "/../build/index.html"));
});

*/

app.use(express.static('./build/'));

app.get('/*', (req, res) => {
  res.sendFile('index.html', { root: 'build/' });
});


/*
app.use(express.static('./images'))
app.get('/images', (req, res) => {
  res.sendFile(path.join(__dirname, "images"));
});*/
//on export module app
module.exports = app;
