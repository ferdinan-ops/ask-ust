import db from "../../../../libs/db";
import authorization from "middlewares/authorization";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();

  const { id } = req.query;

  const auth = await authorization(req, res);

  const answerList = await db("answer")
    .join("users", "answer.id_user", "=", "users.id")
    .select("users.username", "users.image", "answer.*")
    .where({ id_post: id });

  res.status(200).json({
    message: `List Answer in this ${id} post`,
    data: answerList,
  });
}
