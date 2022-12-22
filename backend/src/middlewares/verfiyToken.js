const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
   const { askToken } = req.cookies;
   if (!askToken) return res.status(401).json({ msg: "Anda tidak memiliki akses" });
   jwt.verify(askToken, process.env.TOKEN_SECRET, (err, decode) => {
      if (err) return res.status(403).json({ msg: "Anda tidak memiliki akses" });
      req.userInfo = decode;
      next();
   });
}

module.exports = { verifyToken };