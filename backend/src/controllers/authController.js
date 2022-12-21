const Users = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
   const { name, email, password } = req.body;

   try {
      const user = await Users.findOne({ email });
      if (user) return res.status(400).json({ msg: "Email anda telah terdaftar" });

      const salt = bcrypt.genSaltSync(10);
      const passwordHash = bcrypt.hashSync(password, salt);

      await Users.create({ name, email, password: passwordHash });
      res.status(200).json({ msg: "Akun Anda berhasil dibuat" });
   } catch (error) {
      res.status(500).json({ error });
   }
};

const login = async (req, res) => {
   const { email, password: passwordBody } = req.body;

   try {
      const user = await Users.findOne({ email });
      if (!user) return res.status(400).json({ msg: "Email anda salah" });

      const isMatch = bcrypt.compare(passwordBody, user.password);
      if (!isMatch) return res.status(400).json({ msg: "Password anda salah" });

      const { password, ...others } = user;
      const token = jwt.sign(others, process.env.SECRET_KEY);
      const maxAge = new Date(2147483647 * 1000).valueOf();

      res.cookie("askToken", token, { maxAge, httpOnly: true });
      res.status(200).json(others);
   } catch (error) {
      res.status(500).json({ error });
   }
}

const logout = async (req, res) => {
   res.clearCookies("askToken", {
      secure: true,
      sameSite: "none",
   }).status(200).json({ msg: "Anda telah logout" });
}

module.exports = { register, login, logout };