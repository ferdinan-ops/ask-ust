const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const answerSchema = new Schema({
   desc: {
      type: String,
      required: true,
   },
   likes: {
      type: [String],
      default: [],
   },
   dislikes: {
      type: [String],
      default: [],
   },
   userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
   },
   postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "posts",
   },
}, { timestamps: true });

const Answers = mongoose.model("answers", answerSchema);
module.exports = Answers;