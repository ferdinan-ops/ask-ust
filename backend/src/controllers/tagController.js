const Tag = require("../models/tagModel");
const Posts = require("../models/postModel");

const createTag = async (req, res) => {
   const { name, desc } = req.body;

   try {
      const tagName = await Tag.findOne({ name });
      if (tagName) return res.status(400).json({
         msg: "Nama tag sudah ada"
      });
      const data = await Tag.create({ name, desc });
      res.status(200).json(data);
   } catch (error) {
      res.status(500).json({ error });
   }
}

const getTags = async (req, res) => {
   const { search, page } = req.query;
   let data;

   try {
      if (search) {
         data = await Tag.aggregate([
            {
               $search: {
                  index: "searchTag",
                  compound: { must: [{ autocomplete: { query: search, path: "name" } }] }
               }
            },
            { $project: { _id: 1, name: 1, desc: 1 } }
         ]);
      } else {
         data = await Tag.find()
      };

      const counts = data.length;
      data = data.slice(0, parseInt(page));
      res.status(200).json({ data, counts });
   } catch (error) {
      res.status(500).json({ error });
   }
}

const getTag = async (req, res) => {
   const { name } = req.params;
   try {
      const data = await Tag.findOne({ name }, { name: 1, desc: 1, _id: 0 });
      res.status(200).json(data);
   } catch (error) {
      res.status(500).json({ error });
   }
}

const getAllTags = async (req, res) => {
   try {
      const data = await Tag.find({}, { name: 1, _id: 0 });
      res.status(200).json(data);
   } catch (error) {
      res.status(500).json({ error })
   }
}

const getPostByTag = async (req, res) => {
   const { page, tag } = req.query;

   try {
      let data = await Posts.aggregate([
         { $match: { tags: [tag] } },
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

module.exports = { createTag, getTags, getAllTags, getPostByTag, getTag }; 