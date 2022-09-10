import db from "../../../libs/db";
import authorization from "middlewares/authorization";

export default async function handler(req, res) {
  const { method } = req;
  const { id, id_user } = req.query;

  if (method !== "GET" || method !== "DELETE") return res.status(405).end();

  const auth = await authorization(req, res);

  switch (method) {
    case "GET":
      const allSave = await db("save").where({ id_user });
      res.status(200).json({ message: "all save", data: allSave });
      break;
    case "DELETE":
      const deleteSave = await db("save").where({ id }).del();
      res.status(200).json({ message: "deleted save successfully" });
      break;
  }
}
