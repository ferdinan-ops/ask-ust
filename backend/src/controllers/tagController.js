const Tag = require("../models/tagModel");

const createTag = async (req, res) => {
   const { name, desc } = req.body;
   if (!name && !desc) return res.status(400).json({
      msg: "Masukkan seluruh data dengan benar"
   });

   try {
      const data = await Tag.create({ name, desc });
      res.status(200).json(data);
   } catch (error) {
      res.status(500).json({ error });
   }
}

const getTags = async (req, res) => {
   try {
      const data = await Tag.find();
      res.status(200).json(data);
   } catch (error) {
      res.status(500).json({ error });
   }
}

const searchTags = async (req, res) => {
   const { keyword } = req.query;

   try {
      const data = await Tag.aggregate({
         $search: {
            index: "searchTag",
            compound: { must: [{ autocomplete: { query: keyword, path: "name" } }] }
         },
         $project: { _id: 1, name: 1 },
      });

      res.status(200).json(data);
   } catch (error) {
      res.status(500).json({ error });
   }
}

module.exports = { createTag, getTags, searchTags };