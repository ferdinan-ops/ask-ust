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
   refreshToken: {
      type: String,
      default: "",
   }
});

const Users = mongoose.model("Users", usersSchema);
module.exports = Users;