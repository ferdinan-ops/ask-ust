const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
   title: {
      type: String,
      required: true,
   },
   tags: {
      type: [String],
      ref: "tags",
   },
   desc: {
      type: String,
      required: true,
   },
   likes: {
      type: [String],
      default: [],
   },
   saved: {
      type: [String],
      default: [],
   },
   userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
   },
   answerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "answers",
   },
   bestAnswerId: {
      type: String,
      default: "",
   }
}, { timestamps: true });

const Posts = mongoose.model("posts", postSchema);
module.exports = Posts;