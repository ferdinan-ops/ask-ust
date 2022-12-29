const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reportSchema = new Schema({
   userSender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
   },
   userTarget: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
   },
   message: {
      type: String,
      required: true,
   },
   link: {
      type: String,
      required: true,
   },
   date: {
      type: Date,
      default: Date.now,
   },
});

const Report = mongoose.model("reports", reportSchema);
module.exports = Report;