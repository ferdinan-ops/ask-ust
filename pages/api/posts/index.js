import db from "../../../libs/db";
import knex from "libs/db";
import authorization from "middlewares/authorization";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();

  // Middleware
  const auth = await authorization(req, res);

  // select all post with the reference
  const posts = await db("users")
    .join("posts", "users.id", "=", "posts.id_user")
    .select(
      "users.id as userId",
      "users.username",
      "users.image as userImage",
      "posts.id as postId",
      "posts.title",
      "posts.answered",
      "posts.updated_at"
    );

  res.status(200).json({
    message: "All Posts",
    data: posts,
  });
}
