import db from "../../../libs/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { username, email, password, image } = JSON.parse(req.body);

  // middleware
  const checkEmail = await db("users").where({ email }).first();
  if (checkEmail) {
    return res
      .status(401)
      .json({ message: "Email Anda telah terdaftar" })
      .end();
  }

  // hash password
  const salt = bcrypt.genSaltSync(10);
  const passwordHash = bcrypt.hashSync(password, salt);

  // insert query
  const register = await db("users").insert({
    username,
    email,
    password: passwordHash,
    image,
  });
  const registeredUser = await db("users").where({ id: register }).first();

  // Buat token
  const token = jwt.sign(
    { id: registeredUser.id, email: registeredUser.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.status(200).json({
    message: "Regisered user successfully",
    data: registeredUser,
    token,
  });
}
