const Answers = require("../models/answerModel");

const createAnswer = async (req, res) => {
   const { desc, postId } = req.body;
   const { userId } = req.userInfo;

   if (!desc || !postId) return res.status(400).json({
      msg: "Masukkan seluruh data dengan benar"
   });

   try {
      const data = await Answers.create({ desc, postId, userId });
      res.status(200).json(data);
   } catch (error) {
      res.status(500).json({ error });
   }
}

const getAnswers = async (req, res) => {
   const { postId } = req.query;

   try {
      const data = await Answers.find({ postId });
      res.status(200).json(data);
   } catch (error) {
      res.status(500).json({ error });
   }
}

const updateAnswer = async (req, res) => {
   const { desc, answerId } = req.body;

   try {
      const data = await Answers.findByIdAndUpdate(answerId, { desc });
      res.status(200).json(data);
   } catch (error) {
      res.status(500).json({ error });
   }
}

const deleteAnswer = async (req, res) => {
   const { answerId } = req.query;

   try {
      await Answers.findByIdAndDelete(answerId);
      res.status(200).json({ msg: "Berhasil menghapus jawaban" });
   } catch (error) {
      res.status(500).json({ error });
   }
}

const likeAnswer = async (req, res) => {
   const { answerId } = req.body;
   const { userId } = req.userInfo;

   try {
      const answer = await Answers.findById(answerId);
      const isLiked = answer.likes.includes(userId);
      const isDisliked = answer.dislikes.includes(userId);

      if (isLiked) {
         await Answers.findByIdAndUpdate(answerId, { $pull: { likes: userId } });
      } else if (isDisliked) {
         await Answers.findByIdAndUpdate(answerId, { $pull: { dislikes: userId } });
         await Answers.findByIdAndUpdate(answerId, { $push: { likes: userId } });
      } else {
         await Answers.findByIdAndUpdate(answerId, { $push: { likes: userId } });
      }

      res.status(200).json({ msg: "Berhasil like jawaban" });
   } catch (error) {
      res.status(500).json({ error });
   }
}

const dislikeAnswer = async (req, res) => {
   const { answerId } = req.body;
   const { userId } = req.userInfo;

   try {
      const answer = await Answers.findById(answerId);
      const isLikes = answer.likes.includes(userId);
      const isDislikes = answer.dislikes.includes(userId);

      if (isLikes) {
         await Answers.findByIdAndUpdate(answerId, { $pull: { likes: userId } });
         await Answers.findByIdAndUpdate(answerId, { $push: { dislikes: userId } });
      } else if (isDislikes) {
         await Answers.findByIdAndUpdate(answerId, { $pull: { dislikes: userId } });
      } else {
         await Answers.findByIdAndUpdate(answerId, { $push: { dislikes: userId } });
      }
      res.status(200).json({ msg: "Berhasil dislike jawaban" });
   } catch (error) {
      res.status(500).json({ error });
   }
}

module.exports = { createAnswer, updateAnswer, deleteAnswer, getAnswers, likeAnswer, dislikeAnswer };