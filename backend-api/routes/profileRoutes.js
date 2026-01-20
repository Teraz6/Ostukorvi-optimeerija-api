const ProfileController = require("../controllers/ProfilesController");
const SessionsController = require("../controllers/SessionsController");

module.exports = (app) => {
    app.route("/profiles")
        .get(ProfileController.getAll)
        .post(ProfileController.create);

    app.route("/profiles/:ProfileID")
        .get(ProfileController.getById)
        .put(ProfileController.modifyById)
        .delete(ProfileController.deleteById);
    app.route("/auth/:LoginEmail")
        .get(ProfileController.getByEmail)
    app.route("/sessions")
        .post(SessionsController.newSession)
};