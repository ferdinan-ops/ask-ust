import db from "../../../libs/db";
import authorization from "middlewares/authorization";

export default async function handler(req, res) {
  if (req.method !== "PUT") return res.status(405).end();

  const auth = await authorization(req, res);

  const { id } = req.query;
  const { username, image, banner, bio } = JSON.parse(req.body);

  const update = await db("users")
    .where({ id })
    .update({ username, image, banner, bio });

  const updatedData = await db("users").where({ id }).first();

  res.status(200).json({ message: "Updated successfully", data: updatedData });
}
