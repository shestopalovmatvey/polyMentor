const ApiError = require("../exceptions/api-error");

module.exports = function (err, req, res, next) {
  if (err instanceof ApiError) {
    return res.status(400).json({ message: err.message, errors: err.errors });
  }

  return res.status(500).json({ message: "Упс... Апшибка" });
};
