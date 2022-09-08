import authorization from "middlewares/authorization";
import db from "../../../../libs/db";

export default async function handler(req, res) {
  if (req.method !== "DELETE") return res.status(405).end();

  // middleware
  const auth = await authorization(req, res);

  // url http request query
  const { id } = req.query;

  // delete data query
  const deleteRow = await db("posts").where({ id }).del();
  const deleteAnswer = await db("answer").where({ id_post: id }).del();

  res.status(200).json({ message: "Post deleted successfully" });
}
