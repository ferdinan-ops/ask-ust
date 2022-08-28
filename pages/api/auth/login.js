import db from "../../../libs/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  // body request
  const { email, password } = JSON.parse(req.body);

  // Check email middleware
  const checkUser = await db("users").where({ email }).first();
  if (!checkUser) return res.status(401).end();

  // Check password middleware
  if (checkUser.password !== null) {
    const checkPassword = await bcrypt.compare(password, checkUser.password);
    if (!checkPassword) return res.status(401).end();
  } else {
    // check password google auth provider
    const checkPasswordGoogle = await db("users")
      .where({ email, password })
      .first();
    if (!checkPasswordGoogle) return res.status(401).end();
  }

  // Buat token

  const token = jwt.sign(
    { id: checkUser.id, email: checkUser.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.status(200).json({
    message: "Login successfully",
    token,
  });
}
