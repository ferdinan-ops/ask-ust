import authorization from "middlewares/authorization";
import moment from "moment/moment";
import db from "../../../../libs/db";

export default async function handler(req, res) {
  if (req.method !== "PUT") return res.status(405).end();

  // middleware
  const auth = await authorization(req, res);

  // query url http request
  const { id } = req.query;

  // body request
  const { title, content, answered } = JSON.parse(req.body);

  // date
  const updated_at = moment(new Date().getTime()).format("YYYY-MM-DD H:mm:ss");

  // update query
  const update = await db("posts").where({ id }).update({
    title,
    content,
    answered,
    updated_at,
  });

  // select updated data
  const updatedData = await db("posts").where({ id }).first();

  res.status(200).json({
    message: "Post updated succesfully",
    data: updatedData,
  });
}
