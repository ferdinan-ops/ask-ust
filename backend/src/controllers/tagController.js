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
   const { search } = req.query;
   let data;

   try {
      if (!search) {
         data = await Tag.find()
      } else {
         data = await Tag.aggregate([
            {
               $search: {
                  index: 'searchTag',
                  compound: { must: [{ autocomplete: { query: search, path: "name" } }] }
               }
            },
            { $project: { _id: 1, name: 1, desc: 1 } }
         ]);
      };
      res.status(200).json(data);
   } catch (error) {
      res.status(500).json({ error });
   }
}

module.exports = { createTag, getTags };