import authorization from "middlewares/authorization";
import db from "../../../../libs/db";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();

  const auth = await authorization(req, res);

  const { id } = req.query;

  const user = await db("users").where({ id }).first();

  if (!user) return res.status(404).end();

  res.status(200).json({
    message: "User Detail",
    data: user,
  });
}
