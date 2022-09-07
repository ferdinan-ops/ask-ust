import db from "../../../libs/db";
import authorization from "middlewares/authorization";

export default async function handler(req, res) {
  const { method } = req;
  const auth = await authorization(req, res);

  switch (method) {
    case "GET":
      try {
        const allLikes = await db("post_reactions");
        res.status(200).json({ message: "All Like Post", data: allLikes });
      } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, err });
      }
      break;

    case "POST":
      try {
        const { id_post, like, dislike } = req.body;
        const addLike = await db("post_reactions").insert({
          id_post,
          like,
          dislike,
        });
        const addLikedData = await db("post_reactions")
          .where({ id: addLike })
          .first();
        res.status(200).json({ message: "Add Like Post" });
      } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, err });
      }
      break;
  }
}
