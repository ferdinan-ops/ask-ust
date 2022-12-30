const mongoose = require("mongoose");
const Answers = require("../models/answerModel");
const Users = require("../models/userModel");
const Posts = require("../models/postModel");

const { pushNotification } = require("./notifController");
const { createReport } = require("./reportController");

const createAnswer = async (req, res) => {
   const { desc, postId, userPostId } = req.body;
   const { userId } = req.userInfo;

   if (!desc) return res.status(400).json({ msg: "Masukkan seluruh data dengan benar" });
   const message = "Menjawab di pertanyaan Anda";
   const link = `/forum/questions/${postId}`;

   try {
      if (userId !== userPostId)
         await pushNotification({ message, userTarget: userPostId, userSender: userId, link });
      await Users.findByIdAndUpdate(userId, { $inc: { score: +5 } });
      const data = await Answers.create({ desc, postId, userId });
      res.status(200).json(data);
   } catch (error) {
      res.status(500).json({ error });
   }
}

const getAnswers = async (req, res) => {
   const { postId } = req.params;

   try {
      const data = await Answers.aggregate([
         { $match: { postId: mongoose.Types.ObjectId(postId) } },
         {
            $lookup: {
               from: "users", localField: "userId", foreignField: "_id",
               pipeline: [{ $project: { _id: 1, name: 1, profilePicture: 1 } }],
               as: "user"
            }
         },
         { $set: { user: { $arrayElemAt: ["$user", 0] } } },
         { $project: { _id: 1, user: 1, desc: 1, createdAt: 1, likes: 1, dislikes: 1 } }
      ]);
      res.status(200).json(data);
   } catch (error) {
      res.status(500).json({ error });
   }
}

const getAnswer = async (req, res) => {
   const { id } = req.params;
   try {
      const data = await Answers.findById(id, { desc: 1 });
      res.status(200).json(data);
   } catch (error) {
      res.status(500).json({ error });
   }
}

const updateAnswer = async (req, res) => {
   const { desc } = req.body;
   const { id } = req.params;

   try {
      const data = await Answers.findByIdAndUpdate(id, { desc });
      res.status(200).json(data);
   } catch (error) {
      res.status(500).json({ error });
   }
}

const deleteAnswer = async (req, res) => {
   const { id } = req.params;
   const { userId } = req.userInfo;

   try {
      const post = await Posts.findOne({ bestAnswerId: id });
      if (post) await Posts.findByIdAndUpdate(post._id, { bestAnswerId: "" });
      await Users.findByIdAndUpdate(userId, { $inc: { score: -5 } });
      await Answers.findByIdAndDelete(id);
      res.status(200).json({ msg: "Berhasil menghapus jawaban" });
   } catch (error) {
      res.status(500).json({ error });
   }
}

const likeAnswer = async (req, res) => {
   const { id } = req.params;
   const { userId } = req.userInfo;

   try {
      const answer = await Answers.findById(id);
      const isLiked = answer.likes.includes(userId);
      const isDisliked = answer.dislikes.includes(userId);

      if (isLiked) {
         await Answers.findByIdAndUpdate(id, { $pull: { likes: userId } });
      } else if (isDisliked) {
         await Answers.findByIdAndUpdate(id, { $pull: { dislikes: userId } });
         await Answers.findByIdAndUpdate(id, { $push: { likes: userId } });
      } else {
         await Answers.findByIdAndUpdate(id, { $push: { likes: userId } });
      }

      res.status(200).json({ msg: "Berhasil like jawaban" });
   } catch (error) {
      res.status(500).json({ error });
   }
}

const dislikeAnswer = async (req, res) => {
   const { id } = req.params;
   const { userId } = req.userInfo;

   try {
      const answer = await Answers.findById(id);
      const isLikes = answer.likes.includes(userId);
      const isDislikes = answer.dislikes.includes(userId);

      if (isDislikes) {
         await Answers.findByIdAndUpdate(id, { $pull: { dislikes: userId } });
      } else if (isLikes) {
         await Answers.findByIdAndUpdate(id, { $pull: { likes: userId } });
         await Answers.findByIdAndUpdate(id, { $push: { dislikes: userId } });
      } else {
         await Answers.findByIdAndUpdate(id, { $push: { dislikes: userId } });
      }
      res.status(200).json({ msg: "Berhasil dislike jawaban" });
   } catch (error) {
      res.status(500).json({ error });
   }
}

const reportAnswer = async (req, res) => {
   const { postId, message, userAnswerId } = req.body;
   const { userId } = req.userInfo;
   const messageNotif = "Jawaban anda telah dilaporkan, silahkan buat jawaban yang baik & benar";
   const link = `/forum/questions/${postId}`;
   const system = "63ad4799c1ebf859f3011684";

   try {
      await createReport({ message, postId, userSender: userId, userTarget: userAnswerId });
      await pushNotification({ message: messageNotif, userTarget: userAnswerId, link, userSender: system });
      res.status(200).json({ msg: "Berhasil melaporkan jawaban" });
   } catch (error) {
      res.status(500).json({ error });
   }
}

module.exports = { createAnswer, updateAnswer, deleteAnswer, getAnswers, likeAnswer, dislikeAnswer, getAnswer, reportAnswer };