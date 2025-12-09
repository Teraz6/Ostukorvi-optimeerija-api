const BasketController = require("../controllers/BasketsController")

module.exports = (app) => {
    app.route("/baskets")
    .get(BasketController.getAll)
    .post(BasketController.create)
    app.route("/baskets/:BasketID")
    .get(BasketController.getById)
}