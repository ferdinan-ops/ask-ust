const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
   userTarget: {
      type: Schema.Types.ObjectId,
      ref: 'User',
   },
   userSender: {
      type: Schema.Types.ObjectId,
      ref: 'User',
   },
   message: {
      type: String,
      required: true
   },
   link: {
      type: String,
      required: true
   },
   read: {
      type: Boolean,
      default: false
   }
}, { timestamps: true });

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;