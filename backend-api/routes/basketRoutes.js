const BasketController = require("../controllers/BasketsController")

module.exports = (app) => {
    app.route("/baskets")
    .post(BasketController.create)
}