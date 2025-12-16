const { db } = require("../db");
const Utilities = require("./Utilities");
const UUID = require("uuid");

// HELPER FUNCTION
const getProfile = async (req, res) => {
  const id = req.params.ProfileID;
  // Use db.Profiles (plural) to match your db.js definition
  const profile = await db.Profiles.findByPk(id);

  if (!profile) {
    res.status(404).send({ error: `Profile with this id was not found: ${id}` });
    return null;
  }
  return profile;
};

// GET ALL
exports.getAll = async (req, res) => {
  try {
    const profiles = await db.Profiles.findAll();
    res.status(200).send(
      profiles.map(({ ProfileID, Email }) => ({ ProfileID, Email }))
    );
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// GET BY ID
exports.getById = async (req, res) => {
  const profile = await getProfile(req, res);
  // getProfile already sends 404 if not found
  if (profile) {
    return res.status(200).send(profile);
  }
};

// CREATE
exports.create = async (req, res) => {
  if (!req.body.Email || !req.body.PasswordHASH) {
    return res.status(400).send({ error: "Missing parameter, please review your request data." });
  }

  try {
    const newProfile = {
      ProfileID: UUID.v7(),
      Email: req.body.Email,
      PasswordHASH: (await Utilities.gimmePassword(req.body.PasswordHASH)).toString(),
      // Ensure IsAdmin is a boolean, handling string "false" or "true" from JSON
      IsAdmin: req.body.IsAdmin === true || req.body.IsAdmin === "true"
    };

    const createdProfile = await db.Profiles.create(newProfile);

    // .send() is needed after .status() if you want to return the object
    return res
      .status(201)
      .location(`${Utilities.getBaseURL(req)}/profiles/${createdProfile.ProfileID}`)
      .send(createdProfile);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

// MODIFY
exports.modifyById = async (req, res) => {
  const profileToBeChanged = await getProfile(req, res);
  if (!profileToBeChanged) return;

  if (!req.body.Email || !req.body.PasswordHASH) {
    return res.status(400).send({ error: "Missing parameter, please review your data." });
  }

  try {
    profileToBeChanged.Email = req.body.Email;
    profileToBeChanged.PasswordHASH = (await Utilities.gimmePassword(req.body.PasswordHASH)).toString();
    // Optional: update IsAdmin if provided
    if (req.body.hasOwnProperty('IsAdmin')) {
        profileToBeChanged.IsAdmin = req.body.IsAdmin === true || req.body.IsAdmin === "true";
    }

    await profileToBeChanged.save();

    return res
      .status(200) // 200 is standard for updates
      .location(`${Utilities.getBaseURL(req)}/profiles/${profileToBeChanged.ProfileID}`)
      .send(profileToBeChanged);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

// DELETE
exports.deleteById = async (req, res) => {
  const profileToBeDeleted = await getProfile(req, res);
  if (!profileToBeDeleted) return;

  try {
    await profileToBeDeleted.destroy();
    return res.sendStatus(204); // 204 means Success, No Content
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};