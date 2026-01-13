const BasketController = require("../controllers/BasketsController")

module.exports = (app) => {
    app.route("/baskets/:BasketID/products")
    .get(BasketController.getAllItemsFromBasket)
    .post(BasketController.addItemToBasket)
    app.route("/baskets/:BasketID/products/:ProductID")
    .delete(BasketController.deleteItemFromBasket)
    .put(BasketController.updateItemQuantity)
}