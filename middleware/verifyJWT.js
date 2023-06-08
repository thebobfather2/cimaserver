const jwt = require('jsonwebtoken');
const User = require('../model/User');
require('dotenv').config();

const verifyJWT = (req, res, next) => {
  console.log('Request sent to verifyJWT.js in middleware');
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
  const token = authHeader.split(' ')[1];
  console.log("CHECKKKKKK");
  console.log(token);
  console.log(process.env.JWT_SECRET);


  if (!process.env.JWT_SECRET) {
    console.log(process.env.JWT_SECRET);
    console.error('JWT_SECRET not set');
    return res.sendStatus(500);
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.user = {
      username: decoded.UserInfo.username
    };
    console.log(req.user);

    req.roles = decoded.UserInfo.roles;
    console.log(req.roles);
    next();
  });
};

module.exports = verifyJWT;
