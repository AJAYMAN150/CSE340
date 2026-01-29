// utilities/index.js

/* ****************************************
 * Build the navigation bar links
 **************************************** */
async function getNav() {
  // Temporary navigation links
  return [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Contact", link: "/contact" }
  ];
}

/* ****************************************
 * Build the classification view HTML
 **************************************** */
async function buildClassificationGrid(data) {
  let grid = "";
  if (data.length > 0) {
    grid = '<ul id="inv-display">';
    data.forEach(vehicle => {
      grid += `<li>
        <a href="/inv/detail/${vehicle.inv_id}" title="View ${vehicle.inv_make} ${vehicle.inv_model} details">
          <img src="${vehicle.inv_thumbnail}" alt="Image of ${vehicle.inv_make} ${vehicle.inv_model}">
        </a>
        <div class="namePrice">
          <hr>
          <h2>
            <a href="/inv/detail/${vehicle.inv_id}">
              ${vehicle.inv_make} ${vehicle.inv_model}
            </a>
          </h2>
          <span>$${new Intl.NumberFormat("en-US").format(vehicle.inv_price)}</span>
        </div>
      </li>`;
    });
    grid += "</ul>";
  } else {
    grid = '<p class="notice">Sorry, no matching vehicles could be found.</p>';
  }
  return grid;
}

/* ****************************************
 * Build the detail view HTML for a vehicle
 **************************************** */
async function buildDetailView(vehicle) {
  return `
    <div class="vehicle-detail">
      <img src="${vehicle.inv_image}" alt="Image of ${vehicle.inv_make} ${vehicle.inv_model}">
      <div class="vehicle-info">
        <h2>${vehicle.inv_make} ${vehicle.inv_model} (${vehicle.inv_year})</h2>
        <p>Price: $${new Intl.NumberFormat('en-US').format(vehicle.inv_price)}</p>
        <p>Mileage: ${new Intl.NumberFormat('en-US').format(vehicle.inv_miles)} miles</p>
        <p>${vehicle.inv_description}</p>
      </div>
    </div>
  `;
}

/* ****************************************
 * Middleware For Handling Errors
 **************************************** */
const handleErrors = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

/* ****************************************
 * Export all utility functions
 **************************************** */
module.exports = {
  getNav,
  buildClassificationGrid,
  buildDetailView,
  handleErrors
};
