const Posts = require("../models/postModel");
const Users = require("../models/userModel");
const mongoose = require("mongoose");
const { pushNotification } = require("./notifController");
const { createReport } = require("./reportController");

const createPost = async (req, res) => {
   const { title, tags, desc } = req.body;
   const { userId } = req.userInfo;

   if (!title || !tags || !desc) return res.status(400).json({
      msg: "Masukkan seluruh data dengan benar"
   });

   try {
      await Users.findByIdAndUpdate(userId, { $inc: { score: + 3 } });
      const data = await Posts.create({ title, tags, desc, userId });
      res.status(200).json(data);
   } catch (error) {
      res.status(500).json({ error });
   }
}

const getPosts = async (req, res) => {
   const { page, search } = req.query;
   let data;

   const query = [
      { $sort: { createdAt: - 1 } },
      {
         $lookup: {
            from: "users", localField: "userId", foreignField: "_id", as: "user",
            pipeline: [{ $project: { _id: 1, name: 1, profilePicture: 1 } }]
         }
      },
      { $set: { user: { $arrayElemAt: ["$user", 0] } } },
      {
         $lookup: {
            from: "answers", let: { postId: "$_id" },
            pipeline: [{ $match: { $expr: { $eq: ["$postId", "$$postId"] } } }],
            as: "answers"
         }
      },
      {
         $project: {
            _id: 1,
            title: 1,
            desc: 1,
            tags: 1,
            createdAt: 1,
            bestAnswerId: 1,
            likesCount: { $size: "$likes" },
            savedCount: { $size: "$saved" },
            answersCount: { $size: "$answers" },
            user: 1,
         }
      }
   ]

   try {
      if (search) {
         data = await Posts.aggregate([{
            $search: {
               index: "searchPost",
               compound: { must: [{ autocomplete: { query: search, path: "title" } }] }
            }
         }, ...query]);
      } else {
         data = await Posts.aggregate(query);
      }
      const counts = data.length;
      data = data.slice(0, parseInt(page));
      res.status(200).json({ data, counts });
   } catch (error) {
      res.status(500).json({ error });
   }
}

const getPost = async (req, res) => {
   const { postId } = req.params;
   if (!mongoose.Types.ObjectId.isValid(postId)) return res.status(404).send(`No post with id: ${postId}`);

   try {
      const data = await Posts.aggregate([
         { $match: { _id: mongoose.Types.ObjectId(postId) } },
         {
            $lookup: {
               from: "users", localField: "userId", foreignField: "_id", as: "user",
               pipeline: [{ $project: { _id: 1, name: 1, profilePicture: 1 } }]
            }
         },
         { $set: { user: { $arrayElemAt: ["$user", 0] } } },
      ]);
      res.status(200).json(data[0]);
   } catch (error) {
      res.status(500).json({ success: false, error });
   }
}

const updatePost = async (req, res) => {
   const { title, desc, tags } = req.body;
   const { postId } = req.params;

   try {
      const data = await Posts.findByIdAndUpdate(postId, { title, desc, tags });
      res.status(200).json(data);
   } catch (error) {
      res.status(500).json({ error });
   }
}

const deletePost = async (req, res) => {
   const { postId } = req.params;
   const { userId } = req.userInfo;

   try {
      await Users.findByIdAndUpdate(userId, { $inc: { score: -3 } });
      await Posts.findByIdAndDelete(postId);
      res.status(200).json({ msg: "Pertanyaan anda berhasil dihapus" });
   } catch (error) {
      res.status(500).json({ error });
   }
}

const likePost = async (req, res) => {
   const { postId } = req.params;
   const { userId } = req.userInfo;

   try {
      const post = await Posts.findById(postId);
      if (post.likes.includes(userId)) {
         await Posts.findByIdAndUpdate(postId, { $pull: { likes: userId } });
      } else {
         await Posts.findByIdAndUpdate(postId, { $push: { likes: userId } });
      }
      res.status(200).json({ msg: "Berhasil likes pertanyaan" });
   } catch (error) {
      res.status(500).json({ error });
   }
}

const savePost = async (req, res) => {
   const { postId } = req.params;
   const { userId } = req.userInfo;

   try {
      const post = await Posts.findById(postId);
      if (post.saved.includes(userId)) {
         await Posts.findByIdAndUpdate(postId, { $pull: { saved: userId } });
      } else {
         await Posts.findByIdAndUpdate(postId, { $push: { saved: userId } });
      }
      res.status(200).json({ msg: "Berhasil menyimpan pertanyaan" });
   } catch (error) {
      res.status(500).json({ error });
   }
}


const makeBestAnswer = async (req, res) => {
   const { id } = req.params;
   const { answerId, userAnswerId } = req.body;
   const { userId } = req.userInfo;

   const message = "Jawaban anda telah dipilih sebagai jawaban terbaik";
   const link = `/forum/questions/${id}`;

   try {
      const post = await Posts.findById(id);
      if (post.bestAnswerId) {
         if (post.bestAnswerId == answerId) {
            await Posts.findByIdAndUpdate(id, { bestAnswerId: "" });
            await Users.findByIdAndUpdate(userAnswerId, { $inc: { score: -5 } });
            return res.status(200).json({ msg: "Berhasil menghapus jawaban terbaik" });
         }
         await Users.findByIdAndUpdate(post.bestAnswerId, { $inc: { score: -5 } });
         await Posts.findByIdAndUpdate(id, { bestAnswerId: answerId });
         await Users.findByIdAndUpdate(userAnswerId, { $inc: { score: +5 } });
         await pushNotification({ message, userTarget: userAnswerId, link, userSender: userId });
         return res.status(200).json({ msg: "Berhasil mengganti jawaban terbaik" });
      }
      await Posts.findByIdAndUpdate(id, { bestAnswerId: answerId });
      await Users.findByIdAndUpdate(userAnswerId, { $inc: { score: +5 } });
      await pushNotification({ message, userTarget: userAnswerId, link, userSender: userId });
      res.status(200).json({ msg: "Berhasil membuat jawaban terbaik" });
   } catch (error) {
      res.status(500).json({ error });
   }
}

const reportPost = async (req, res) => {
   const { postId, message, userPostId } = req.body;
   const { userId } = req.userInfo;
   const messageNotif = "Pertanyaan anda telah dilaporkan, silahkan buat pertanyaan yang benar";
   const link = `/forum/questions/${postId}`;
   const system = "63ad4799c1ebf859f3011684";

   try {
      const data = await createReport({ userTarget: userPostId, userSender: userId, postId, message });
      await pushNotification({ message: messageNotif, userTarget: userPostId, link, userSender: system });
      res.status(200).json({ msg: "Laporan berhasil dikirim", data });
   } catch (error) {
      res.status(500).json({ error });
   }
}

module.exports = { createPost, getPosts, getPost, updatePost, deletePost, likePost, savePost, makeBestAnswer, reportPost };;