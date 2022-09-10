import db from "../../../libs/db";
import authorization from "middlewares/authorization";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const auth = await authorization(req, res);

  const { id_user, id_post } = req.body;

  const create = await db("save").insert({ id_user, id_post });
  const createdData = await db("save").where({ id: create }).first();

  res.status(200).json({ message: "created save", data: createdData });
}
