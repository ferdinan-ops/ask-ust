const Posts = require("../models/postModel");

const createPost = async (req, res) => {
   const { title, tags, desc } = req.body;
   const { userId } = req.userInfo;
   console.log({ userId });

   if (!title || !tags || !desc) return res.status(400).json({
      msg: "Masukkan seluruh data dengan benar"
   });

   try {
      const { data } = await Posts.create({ title, tags, desc, userId });
      res.status(200).json(data);
   } catch (error) {
      res.status(500).json({ error });
   }
}

const getPosts = async (req, res) => {
   const { page } = req.query;

   try {
      let data = await Posts.aggregate([
         { $sort: { createdAt: - 1 } },
         {
            $lookup: {
               from: "users", localField: "userId", foreignField: "_id", as: "user",
               pipeline: [{ $project: { _id: 1, username: 1, photo: 1 } }]
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
               likesCount: { $size: "$likes" },
               savedCount: { $size: "$saved" },
               answersCount: { $size: "$answers" },
               user: 1,
            }
         }
      ]);

      const counts = data.length;
      data = data.slice(0, parseInt(page));
      res.status(200).json({ data, counts, page });
   } catch (error) {
      res.status(500).json({ error });
   }
}

const getPost = async (req, res) => {
   const { postId } = req.query;

   try {
      const data = await Posts.aggregate([
         { $match: { _id: mongoose.Types.ObjectId(postId) } },
         {
            $lookup: {
               from: "users", localField: "userId", foreignField: "_id", as: "user",
               pipeline: [{ $project: { _id: 1, username: 1, photo: 1 } }]
            }
         },
         { $set: { user: { $arrayElemAt: ["$user", 0] } } },
      ]);
      res.status(200).json(data);
   } catch (error) {
      res.status(500).json({ error });
   }
}

const updatePost = async (req, res) => {
   const { title, desc, tags, postId } = req.body;

   try {
      const data = await Posts.findByIdAndUpdate(postId, { title, desc, tags });
      res.status(200).json(data);
   } catch (error) {
      res.status(500).json({ error });
   }
}

const deletePost = async (req, res) => {
   const { postId } = req.body;
   try {
      await Posts.findByIdAndDelete(postId);
      res.status(200).json({ msg: "Pertanyaan anda berhasil dihapus" });
   } catch (error) {
      res.status(500).json({ error });
   }
}

const likePost = async (req, res) => {
   const { postId } = req.body;
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
   const { postId } = req.body;
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

module.exports = { createPost, getPosts, getPost, updatePost, deletePost, likePost, savePost };