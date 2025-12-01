const ProductsController = require("../controllers/ProductsController")

module.exports = (app) => {
    app.route("/products")
    .get(ProductsController.getAll)
    app.route("/products/:ProductID")
    .get(ProductsController.getByID)
}