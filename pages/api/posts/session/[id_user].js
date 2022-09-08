import db from "../../../../libs/db";
import authorization from "middlewares/authorization";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();

  const { id_user } = req.query;

  const auth = await authorization(req, res);

  const allPosts = await db("users")
    .join("posts", "users.id", "=", "posts.id_user")
    .select(
      "users.id as userId",
      "users.username",
      "users.image as userImage",
      "posts.id as postId",
      "posts.title",
      "posts.answered",
      "posts.updated_at"
    )
    .where({ id_user })
    .orderBy("posts.updated_at", "desc");

  if (!allPosts) return res.status(404).end();

  const user = await db("users").where({ id: id_user }).first();
  if (!user) return res.status(404).end();

  res.status(200).json({
    message: "User Session Posts",
    dataPost: allPosts,
    dataUser: user,
  });
}
