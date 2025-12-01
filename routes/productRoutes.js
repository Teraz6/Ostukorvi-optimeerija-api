const ProductsController = require("../controllers/ProductsController")

module.exports = (app) => {
    app.route("/products")
    .get(ProductsController.getAll)
}