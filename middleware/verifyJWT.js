const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
  const token = authHeader.split(' ')[1];
  console.log(token);
  if (!process.env.JWT_SECRET) {
    console.error('JWT_SECRET not set');
    return res.sendStatus(500);
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.user = decoded.UserInfo.username;
    req.roles = decoded.UserInfo.roles;
    next();
    console.log(process.env.JWT_SECRET);
  });
};

module.exports = verifyJWT;
