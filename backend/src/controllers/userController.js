const Users = require("../models/userModel");

const getUsers = async (req, res) => {
   const { search, page } = req.query;
   let data;

   try {
      if (search) {
         data = await Users.aggregate([
            {
               $search: {
                  index: 'searchUser',
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
            { $sort: { score: -1 } },
            { $project: { _id: 1, name: 1, score: 1, postsCount: { $size: "$posts" } } },
         ]);
      } else {
         data = await Users.aggregate([
            { $sort: { score: -1 } },
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

      const counts = data.length;
      data = data.slice(0, parseInt(page));
      res.status(200).json({ data, counts });
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

const getActiveUser = async (req, res) => {
   try {
      const data = await Users.find().sort({ score: -1 }).limit(3);
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


module.exports = { getUsers, getUser, getMySavedPosts, getActiveUser };