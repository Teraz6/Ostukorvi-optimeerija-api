const ProfileController = require("../controllers/ProfilesController")

module.exports = (app) => {
    app.route("/profiles")
    // .get(ProfileController.getAll)
    .post(ProfileController.create)
    // app.route("/profile/:ProfileID")
    // .get(ProfileController.getByID)
}