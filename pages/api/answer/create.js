import db from "../../../libs/db";
import authorization from "middlewares/authorization";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const auth = await authorization(req, res);

  const { id_post, id_user, content } = JSON.parse(req.body);

  const answer = await db("answer").insert({
    id_post,
    id_user,
    content,
  });

  const answeredData = await db("answer")
    .join("users", "answer.id_user", "=", "users.id")
    .select("users.username", "users.image", "answer.*")
    .where({ "answer.id": answer })
    .first();

  res.status(200).json({
    message: "Answer has been created",
    data: answeredData,
  });
}
