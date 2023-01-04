const logger = require("./logger");

const reqLogger = (req, _res, next) => {
  logger.info("Method:", req.method);
  logger.info("Path:  ", req.path);
  logger.info("Body:  ", req.body);
  logger.info("---");
  next();
};

const tokenExtractor = (req, _res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    req.token = authorization.substring(7);
  }
  next();
};

const unknownEndpoint = (_req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, _req, res, next) => {
  logger.error(error.message);

  if (error.name === "CastError") {
    return res.status(400).json({
      error: "malformatted id",
    });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({
      error: error.message,
    });
  } else if (error.name === "JsonWebTokenError") {
    return res.status(401).json({
      error: "invalid token",
    });
  } else if (error.name === "TokenExpiredError") {
    return res.status(401).json({
      error: "expired token",
    });
  }

  next(error);
};

module.exports = {
  reqLogger,
  tokenExtractor,
  unknownEndpoint,
  errorHandler,
};
