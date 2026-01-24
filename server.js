/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/
/* ***********************
 * Require Statements
 *************************/
const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const env = require("dotenv").config()
const app = express()
const static = require("./routes/static")
const path = require("path") // Needed for views folder path

/* ***********************
 * View Engine Setup (EJS)
 *************************/
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout") // points to views/layouts/layout.ejs
app.set("views", path.join(__dirname, "views"))

// Serve static files from public folder
app.use(express.static(path.join(__dirname, "public")))

/* ***********************
 * Routes
 *************************/
app.use(static)

// Index route
app.get("/", (req, res) => {
  res.render("index", { title: "Home" }) // Passes "Home" to the head partial
})
/* ***********************
 * Optional: Minimal index route for testing
 *************************/
app.get("/", (req, res) => {
  res.render("index", { title: "Home Page" })
})

/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT || 5500
const host = process.env.HOST || "localhost"

/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`)
})
