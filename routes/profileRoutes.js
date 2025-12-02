const ProfileController = require("../controllers/ProfileController")

module.exports = (app) => {
    app.route("/profile")
    // .get(ProfileController.getAll)
    .post(ProfileController.create)
    app.route("/profile/:ProfileID")
    // .get(ProfileController.getByID)
}