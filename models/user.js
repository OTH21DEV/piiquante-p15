const mongoose = require('mongoose')
const uniqueValidator= require('mongoose-unique-validator')

//creation du schema de données user por mail et mdp
/*unique permet de s'assurer que adresse email est unique et impeche de s'inscrire 
plusiers fois avec la meme adresse , on rajoute un plus package mongoose-unique-validator

*/
const userSchema = mongoose.Schema({
email:{type:String, required:true,unique:true},
password:{type:String,required:true}
})
//on applique le plugin de validator au Schema avant de creer le model User

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema)