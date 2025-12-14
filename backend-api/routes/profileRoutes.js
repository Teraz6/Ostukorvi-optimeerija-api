const ProfileController = require("../controllers/ProfilesController")

module.exports = (app) => {
  app.route("/profiles")
    .get(ProfileController.getAll)
    .post(ProfileController.create)

  app.route("/profiles/:id")
    .get(ProfileController.getById)
    .put(ProfileController.modifyById)
    .delete(ProfileController.deleteById)
}