const Users = require("../models/userModel");
const Posts = require("../models/postModel");
const mongoose = require("mongoose");

const getUsers = async (req, res) => {
   const { search, page } = req.query;
   let data;
   const query = [
      { $sort: { score: -1 } },
      {
         $lookup: {
            from: "posts",
            let: { userId: "$_id" },
            pipeline: [{ $match: { $expr: { $eq: ["$userId", "$$userId"] } } }],
            as: "posts"
         }
      },
      { $project: { _id: 1, name: 1, score: 1, profilePicture: 1, postsCount: { $size: "$posts" } } }
   ]

   try {
      if (search) {
         data = await Users.aggregate([{
            $search: {
               index: 'searchUser',
               compound: { must: [{ autocomplete: { query: search, path: "name" } }] }
            }
         }, ...query]);
      } else {
         data = await Users.aggregate(query);
      }

      const counts = data.length;
      data = data.slice(0, parseInt(page));
      res.status(200).json({ data, counts });
   } catch (error) {
      res.status(500).json({ error });
   }
}

const getUser = async (req, res) => {
   const { id } = req.params;
   try {
      const data = await Users.findById(id, { password: 0, __v: 0 });
      res.status(200).json(data);
   } catch (error) {
      res.status(500).json({ error });
   }
}

const getActiveUser = async (req, res) => {
   try {
      const data = await Users.find().sort({ score: -1 }).limit(3);
      res.status(200).json(data);
   } catch (error) {
      res.status(500).json({ error });
   }
}

const getMyPosts = async (req, res) => {
   const { page } = req.query;
   const { id } = req.params;

   try {
      let data = await Posts.aggregate([
         { $match: { userId: mongoose.Types.ObjectId(id) } },
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
               likesCount: { $size: "$likes" },
               savedCount: { $size: "$saved" },
               answersCount: { $size: "$answers" },
               user: 1,
            }
         }
      ]);
      const counts = data.length;
      data = data.slice(0, parseInt(page));
      res.status(200).json({ data, counts });
   } catch (error) {
      res.status(500).json({ error });
   }
}

const getMySavedPosts = async (req, res) => {
   const { userId } = req.userInfo;
   const { page } = req.query;

   try {
      let data = await Posts.aggregate([
         { $match: { saved: [userId] } },
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
               likesCount: { $size: "$likes" },
               savedCount: { $size: "$saved" },
               answersCount: { $size: "$answers" },
               user: 1,
            }
         }
      ]);
      const counts = data.length;
      data = data.slice(0, parseInt(page));
      res.status(200).json({ data, counts });
   } catch (error) {
      res.status(500).json({ error });
   }
}

const updateUser = async (req, res) => {
   const { name, bio, profilePicture } = req.body;
   const { userId } = req.userInfo;
   try {
      const data = await Users.findByIdAndUpdate(userId, { name, bio, profilePicture });
      const { password, email, __v, ...others } = data._doc;
      res.status(200).json(others);
   } catch (error) {
      res.status(500).json({ error });
   }
}

module.exports = { getUsers, getUser, getActiveUser, getMyPosts, getMySavedPosts, updateUser };