const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

/*
mongoose-unique-validator checks the email if it's used once
*/
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model("User", userSchema);
