import authorization from "middlewares/authorization";
import db from "../../../../libs/db";

export default async function handler(req, res) {
  if (req.method !== "PUT") return res.status(405).end();

  // middleware
  const auth = await authorization(req, res);

  // query url http request
  const { id } = req.query;

  // body request
  const { title, content, answered } = JSON.parse(req.body);

  // update query
  const update = await db("posts").where({ id }).update({
    title,
    content,
    answered,
  });

  // select updated data
  const updatedData = await db("posts").where({ id }).first();

  res.status(200).json({
    message: "Post updated succesfully",
    data: updatedData,
  });
}
