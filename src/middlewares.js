const jwt = require ("jsonwebtoken");
const config = require("config");

function notFound(req, res, next) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

/* eslint-disable no-unused-vars */
function errorHandler(err, req, res, next) {
  /* eslint-enable no-unused-vars */
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
  });
}

/**
 *  @desc check is the user authenticated or not 
 **/
function isAuth(req, res, next){
  const token = req.header("x-auth-token"); // get token from header

  if (!token){
    return res.status(401).json({message: "No token, authorization denied."});
  }

  try{
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded.user;
    next();
  }catch(error){
    console.error(error.message);
    res.status(401).json({msg: "Invalid token."})
  }
}

module.exports = {
  notFound,
  errorHandler,
  isAuth
};
