
//
//creation premier serveur Node -  ecoute des requette http et envoie des reponses

//importation du package http depuis node (maintenant on a accées à l'objet http qui permet de creer serveur):

const http = require ('http')

//on creer le serveur 
/*
methode .createServeur prendre en argument une fonction qui sera appélée à chaque 
requette de serveur, cette fonction meme à deux arguements req (requette) et res (response)


const server = http.createServer((req, res)=>{
    
    
    on definie la reponse du serveur, si on modifie la reponse il faut 
    redemarrer le server - node server, ou utiliser nodemon server qui ecoute les changements de fichiers
    
    res.end ('voila la reponse du serveur')
})
*/
// au lieu de la logique precedente , on demande au serveur node d'utiliser notre app express
const app = require('./app')

//on doit dire à l'application express sur quel port elle va tourner

//app.set('port',process.env.PORT || 3000 );

//const server = http.createServer(app);

/*on configure l'ecoute par serveur des requettes envoyées :
par defaut en dev mode - port 3000 ou process.env.PORT si l'environnement sur lequel tourne app 
envoie un autre port .
*/
//server.listen(process.env.PORT || 3000)

/////////////////////Modif de fichier 

// renvoie un port valide, qu'il soit fourni sous la forme d'un numéro ou d'une chaîne
const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
// const port = normalizePort(process.env.PORT || '3000');
const port = normalizePort(process.env.PORT || 'mongodb+srv://admin:Coucou1984@cluster0.b4hdjgg.mongodb.net/?retryWrites=true&w=majority');
app.set('port', port);

// recherche les différentes erreurs et les gère de manière appropriée. Elle est ensuite enregistrée dans le serveur
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

server.listen(port);
