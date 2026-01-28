/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/

/* ***********************
 * Require Statements
 *************************/
const express = require("express")
const expressLayouts = require("express-ejs-layouts")
require("dotenv").config()
const app = express()
const staticRoutes = require("./routes/static")
const path = require("path")
const inventoryRoute = require("./routes/inventoryRoute")

// Utilities module (getNav + handleErrors)
const utilities = require("./utilities")

// Base controller (home page logic)
const baseController = require("./controllers/baseController")

/* ***********************
 * View Engine Setup (EJS)
 *************************/
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout")
app.set("views", path.join(__dirname, "views"))

// Serve static files from public folder
app.use(express.static(path.join(__dirname, "public")))

/* ***********************
 * Routes
 *************************/
app.use(staticRoutes)
// Inventory routes
app.use("/inv", inventoryRoute)


// Home / Index route (wrapped with error middleware)
app.get("/", utilities.handleErrors(baseController.buildHome))

/* ***********************
 * File Not Found Route
 * MUST be after all other routes
 *************************/
app.use((req, res, next) => {
  next({ status: 404, message: "Sorry, we appear to have lost that page." })
})

/* ***********************
 * Express Error Handler
 *************************/
app.use(async (err, req, res, next) => {
  const nav = await utilities.getNav()
  console.error(`Error at "${req.originalUrl}": ${err.message}`)

  let message =
    err.status === 404
      ? err.message
      : "Oh no! There was a crash. Maybe try a different route?"

  res.status(err.status || 500).render("errors/error", {
    title: err.status || "Server Error",
    message,
    nav
  })
})

/* ***********************
 * Local Server Information
 *************************/
const port = process.env.PORT || 5500
const host = process.env.HOST || "localhost"

/* ***********************
 * Server Start
 *************************/
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`)
})
