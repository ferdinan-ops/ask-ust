import db from "../../../libs/db";
import authorization from "middlewares/authorization";

export default async function handler(req, res) {
  const { method } = req;
  const auth = authorization(req, res);
  const { id } = req.query;

  switch (method) {
    case "PUT":
      try {
        const { like, dislike } = req.body;
        const updateLike = await db("post_reactions")
          .where({ id })
          .update({ like, dislike });
        const updatedData = await db("post_reactions").where({ id }).first();
        res.status(200).json({ message: "like post up", data: updatedData });
      } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error });
      }
      break;

    case "DELETE":
      try {
        const deleteLike = await db("post_reactions").where({ id }).del();
        res.status(200).json({ message: "deleted like post" });
      } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error });
      }
      break;
  }
}
