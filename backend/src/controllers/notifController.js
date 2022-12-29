const { default: mongoose } = require("mongoose");
const Notification = require("../models/notificationModel");

const pushNotification = async ({ message, userTarget, link, userSender }) => {
   try {
      const data = await Notification.create({ message, userTarget, userSender, link });
      return data;
   } catch (error) {
      return error;
   }
}

const getNotifications = async (req, res) => {
   const { page } = req.query;
   const { userId } = req.userInfo;

   try {
      let data = await Notification.aggregate([
         { $match: { userTarget: mongoose.Types.ObjectId(userId) } },
         {
            $lookup: {
               from: "users", localField: "userSender", foreignField: "_id",
               pipeline: [{ $project: { _id: 1, name: 1, profilePicture: 1 } }],
               as: "userSender"
            }
         },
         { $set: { userSender: { $arrayElemAt: ["$userSender", 0] } } },
         { $project: { _id: 1, userSender: 1, message: 1, link: 1, read: 1, createdAt: 1 } },
         { $sort: { createdAt: -1 } },
      ]);

      const counts = data.length;
      data = data.slice(0, parseInt(page));
      res.status(200).json({ data, counts });
   } catch (error) {
      res.status(500).json({ error });
   }
}

const markAsRead = async (req, res) => {
   const { userId } = req.userInfo;
   const { id } = req.params;
   try {
      const data = await Notification.findOneAndUpdate({ _id: id, userTarget: userId }, { read: true });
      res.status(200).json(data);
   } catch (error) {
      res.status(500).json({ error });
   }
}

const markAllAsRead = async (req, res) => {
   const { userId } = req.userInfo;
   try {
      const data = await Notification.updateMany({ userTarget: userId }, { read: true });
      res.status(200).json(data);
   } catch (error) {
      res.status(500).json({ error });
   }
}

const getReadCounts = async (req, res) => {
   const { userId } = req.userInfo;
   try {
      const data = await Notification.countDocuments({ userTarget: userId, read: false });
      res.status(200).json(data);
   } catch (error) {
      res.status(500).json({ error });
   }
}

module.exports = { pushNotification, getNotifications, markAsRead, markAllAsRead, getReadCounts };



