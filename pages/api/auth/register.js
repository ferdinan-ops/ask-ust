import db from "../../../libs/db";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  let { username, email, password, image } = JSON.parse(req.body);

  if (password !== null) {
    // random string
    const salt = bcrypt.genSaltSync(10);
    // hash password
    password = bcrypt.hashSync(password, salt);
  }

  const register = await db("users").insert({
    username,
    email,
    password,
    image,
  });

  const registeredUser = await db("users").where({ id: register }).first();

  res.status(200).json({
    message: "Regisered user successfully",
    data: registeredUser,
  });
}
