import db from "../../../libs/db";
import authorization from "middlewares/authorization";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  // middleware
  const auth = await authorization(req, res);

  // body request
  const { title, content, id_user } = JSON.parse(req.body);

  // insert data
  const create = await db("posts").insert({ title, content, id_user });

  // select data
  const createdData = await db("posts").where("id", create).first();

  res.status(200).json({
    message: "Post Created Successfully",
    data: createdData,
  });
}
