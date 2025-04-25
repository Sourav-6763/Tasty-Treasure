const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require("mongoose");
const recipeRouter = require('./Router/recipeRoute');
const createError = require("http-errors");
const { errorResponse } = require('./Controller/errorSuccessResponse');

dotenv.config(); // To use environment variables
const app = express(); // Initialize the express app first

app.use(cors());  // Enable all CORS requests (now placed after app initialization)

const port = process.env.PORT || 5000;


// MongoDB connection
// async function main(options = {}) {
//   try {
//     await mongoose.connect(process.env.MONGO_URL, options);
//     console.log("Connected to DB");
//   } catch (err) {
//     console.error("Error connecting to DB", err);
//   }
// }

// main();



app.use('/api/recipe',recipeRouter);

// Client error handling
app.use((req, res, next) => {
  const err = createError(404, "Route not found");
  next(err);
});

// Server error handling (generic error handler)
app.use((err, req, res, next) => {
  return errorResponse(res, {
    statusCode: err.status || 500,
    message: err.message || "Internal Server Error",
  });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
