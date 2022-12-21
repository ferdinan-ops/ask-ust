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

      const { password, refreshToken: refreshTokenDB, ...others } = user;
      const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
      const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

      const accessToken = jwt.sign(others, accessTokenSecret, { expiresIn: "20s" });
      const refreshToken = jwt.sign(others, refreshTokenSecret, { expiresIn: "1d" });

      await Users.findByIdAndUpdate(user._id, { refreshToken });
      const maxAge = new Date(2147483647 * 1000).valueOf();

      res.cookie("refreshToken", refreshToken, { maxAge, httpOnly: true });
      res.status(200).json({ accessToken });
   } catch (error) {
      res.status(500).json({ error });
   }
}

const refreshToken = async (req, res) => {
   try {
      const { refreshToken } = req.cookie;
      if (!refreshToken) return res.sendStatus(401);
      const user = await Users.findOne({ refreshToken });
      if (!user) return res.sendStatus(403);
      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decode) => {
         if (err) return res.sendStatus(403);
         const { password, refreshToken, ...others } = user;
         const accessToken = jwt.sign(others, accessTokenSecret, { expiresIn: "20s" });
         res.json({ accessToken });
      })
   } catch (error) {

   }
}

const logout = async (req, res) => {
   const { refreshToken } = req.cookie;
   if (!refreshToken) return res.sendStatus(204);
   const user = await Users.findOne({ refreshToken });
   if (!user) return res.sendStatus(204);
   await Users.findByIdAndUpdate(user._id, { refreshToken: "" });
   res.clearCookies("refreshToken").status(200).jso({ msg: "Anda berhasil keluar" });
}

module.exports = { register, login, logout, refreshToken };