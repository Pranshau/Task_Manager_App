const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "defaultsecret";

module.exports = function (req, res, next) {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    // Store user info
    req.user = { _id: decoded.id, role: decoded.role };
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Token is not valid" });
  }
};
