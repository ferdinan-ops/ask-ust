import db from "../../../libs/db";
import authorization from "middlewares/authorization";

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  const auth = await authorization(req, res);

  switch (method) {
    case "GET":
      const allSave = await db("save")
        .join("posts", "save.id_post", "=", "posts.id")
        .join("users", "save.id_user", "=", "users.id")
        .select(
          "users.id as userId",
          "users.username",
          "users.image as userImage",
          "posts.id as postId",
          "posts.title",
          "posts.answered",
          "posts.updated_at",
          "save.updated_at"
        )
        .where({ "save.id_user": id })
        .orderBy("save.updated_at", "desc");
      res.status(200).json({ message: "all save", data: allSave });
      break;
    case "DELETE":
      const deleteSave = await db("save").where({ id }).del();
      res.status(200).json({ message: "deleted save successfully" });
      break;
  }
}
