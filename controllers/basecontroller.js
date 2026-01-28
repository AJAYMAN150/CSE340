// controllers/baseController.js

const utilities = require("../utilities") // Bring in getNav for navigation

// Home page controller
async function buildHome(req, res, next) {
  try {
    const nav = await utilities.getNav() // Get navigation links
    res.render("index", {
      title: "Home",
      nav
    })
  } catch (err) {
    // If anything goes wrong, pass it to Express Error Handler
    next(err)
  }
}

module.exports = { buildHome }
