const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
   name: {
      type: String,
      required: true,
   },
   email: {
      type: String,
      required: true,
   },
   password: {
      type: String,
      required: true,
   },
   profilePicture: {
      type: String,
      default: "",
   },
   score: {
      type: Number,
      default: 0,
   },
});

const Users = mongoose.model("Users", usersSchema);
module.exports = Users;