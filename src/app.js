if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();
const moviesRouter = require("./movies/movies.router")
const reviewsRouter = require("./reviews/reviews.router")
const theatersRouter = require("./theaters/theaters.router")
const notFound = require("./errors/notFound")
const errorHandler = require("./errors/errorHandler")
const cors = require("cors")

app.use(cors()) // Cors enabled for entire app
app.use(express.json()) // App will utilize express json to parse incoming requests with JSON

// Routers
app.use("/movies", moviesRouter)
app.use("/reviews", reviewsRouter)
app.use("/theaters", theatersRouter)

//Not found handler
app.use(notFound)

//Error handler
app.use(errorHandler)

module.exports = app;
