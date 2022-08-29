import db from "../../../libs/db";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  let token;
  let registeredUser;
  const { username, email, password, image } = JSON.parse(req.body);

  const checkUser = await db("users").where({ email }).first();

  if (checkUser) {
    const checkPasswordGoogle = await db("users")
      .where({ email, password })
      .first();
    if (!checkPasswordGoogle) return res.status(401).end();
    registeredUser = checkPasswordGoogle;

    // Buat token
    token = jwt.sign(
      { id: checkPasswordGoogle.id, email: checkPasswordGoogle.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
  } else {
    const register = await db("users").insert({
      username,
      email,
      password,
      image,
    });
    registeredUser = await db("users").where({ id: register }).first();

    // Buat token
    token = jwt.sign(
      { id: registeredUser.id, email: registeredUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
  }

  res.status(200).json({
    message: "Regisered user successfully",
    data: registeredUser,
    token,
  });
}
