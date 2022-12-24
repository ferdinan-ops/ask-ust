const Tag = require("../models/tagModel");

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

      const counts = data.length;
      data = data.slice(0, parseInt(page));
      res.status(200).json({ data, counts });
   } catch (error) {
      res.status(500).json({ error });
   }
}

module.exports = { createTag, getTags };