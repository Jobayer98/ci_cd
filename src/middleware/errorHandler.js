// src/middleware/errorHandler.js - Error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);

  // Default error
  let error = {
    success: false,
    error: "Internal Server Error",
  };

  // Validation error
  if (err.name === "ValidationError") {
    error.error = "Validation Error";
    error.details = err.message;
  }

  // Cast error (invalid ObjectId, etc.)
  if (err.name === "CastError") {
    error.error = "Invalid ID format";
  }

  res.status(err.statusCode || 500).json(error);
};

module.exports = { errorHandler };
