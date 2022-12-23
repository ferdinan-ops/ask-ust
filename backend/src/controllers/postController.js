const Posts = require("../models/postModel");

const createPost = async (req, res) => {
   const { title, tags, desc } = req.body;
   const { userInfo } = req;

   if (!title && !tags && !desc) return res.status(400).json({
      msg: "Masukkan seluruh data dengan benar"
   });

   try {
      const { data } = await Posts.create({ title, tags, desc, userInfo });
      res.status(200).json(data);
   } catch (error) {
      res.status(500).json({ error });
   }
}

module.exports = { createPost };