const BasketController = require("../controllers/BasketsController")

module.exports = (app) => {
    app.route("/baskets/:BasketID/products")
    .post(BasketController.addItemToBasket)
}