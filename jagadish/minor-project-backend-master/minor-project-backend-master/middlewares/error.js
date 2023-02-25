const { JSON } = require("sequelize");

module.exports = (err, req, res, next) => {
  console.log("dd");
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "internal server error";

  res.status(err.statusCode).json({
    success: false,
    error: err.message,
  });
  next();
};
