const Users = require("../models/userModel");

const getUsers = async (req, res) => {
   const { search } = req.query;
   let data;

   try {
      if (search) {
         data = await Users.aggregate([
            {
               $search: {
                  index: "searchUser",
                  compound: { must: [{ autocomplete: { query: search, path: "name" } }] }
               }
            },
            {
               $lookup: {
                  from: "posts",
                  let: { userId: "$_id" },
                  pipeline: [{ $match: { $expr: { $eq: ["$userId", "$$userId"] } } }],
                  as: "posts"
               }
            },
            { $project: { _id: 1, name: 1, score: 1, postsCount: { $size: "$posts" } } }
         ]);
      } else {
         data = await Users.aggregate([
            {
               $lookup: {
                  from: "posts",
                  let: { userId: "$_id" },
                  pipeline: [{ $match: { $expr: { $eq: ["$userId", "$$userId"] } } }],
                  as: "posts"
               }
            },
            { $project: { _id: 1, name: 1, score: 1, postsCount: { $size: "$posts" } } }
         ]);
      }
      res.status(200).json(data);
   } catch (error) {
      res.status(500).json({ error });
   }
}

const getUser = async (req, res) => {
   const { userId } = req.params;

   try {
      const data = await Users.findById(userId, { password: 0, __v: 0 });
      res.status(200).json(data);
   } catch (error) {
      res.status(500).json({ error });
   }
}

const getMySavedPosts = async (req, res) => {
   const { userId } = req.userInfo;

   try {
      const data = await Users.aggregate([
         { $match: { _id: mongoose.Types.ObjectId(userId) } },
         {
            $lookup: {
               from: "posts",
               let: { saved: "$saved" },
               pipeline: [{ $match: { $expr: { $in: ["$_id", "$$saved"] } } }],
               as: "savedPosts"
            }
         },
         {
            $project: {
               _id: 1,
               savedPosts: 1,
            }
         }
      ]);
      res.status(200).json(data);
   } catch (error) {
      res.status(500).json({ error });
   }
}


module.exports = { getUsers, getUser, getMySavedPosts };