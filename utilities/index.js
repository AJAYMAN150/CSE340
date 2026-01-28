// utilities/index.js
async function getNav() {
  // Temporary navigation links
  return [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Contact", link: "/contact" }
  ]
}
/* ****************************************
 * Middleware For Handling Errors
 * Wrap other functions in this for 
 * General Error Handling
 **************************************** */
const handleErrors = fn => (req, res, next) => 
  Promise.resolve(fn(req, res, next)).catch(next)

module.exports = { getNav, handleErrors }