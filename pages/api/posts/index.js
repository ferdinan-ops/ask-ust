import db from "../../../libs/db";
import authorization from "middlewares/authorization";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();

  // Middleware
  const auth = await authorization(req, res);

  // Select all posts
  const posts = await db("posts");

  res.status(200).json({
    message: "All Posts",
    data: posts,
  });
}
