const utilities = require("../utilities/")
const baseController = {}

/* ****************************************
 * Build Home View
 **************************************** */
baseController.buildHome = async function (req, res, next) {
  try {
    const nav = await utilities.getNav()
    res.render("index", {
      title: "Home",
      nav,
      messages: req.flash("notice")
    })
  } catch (err) {
    next(err)
  }
}

module.exports = baseController
