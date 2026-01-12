const BasketController = require("../controllers/BasketsController")

module.exports = (app) => {
    app.route("/baskets/:BasketID/products")
    .get(BasketController.getAllItemsFromBasket)
    .post(BasketController.addItemToBasket)
}