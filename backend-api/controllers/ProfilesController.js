const { db } = require("../db");
const Utilities = require("./Utilities");
const UUID = require("uuid");

const getProfile = async (req, res) => {
  const id = req.params.ProfileID; // IMPORTANT: matches routes "/profiles/:ProfileID"
  const profile = await db.Profile.findByPk(id);

  if (!profile) {
    res.status(404).send({ error: `Profile with this id was not found ${id}` });
    return null;
  }

  return profile;
};

// GET ALL
exports.getAll = async (req, res) => {
  const profiles = await db.Profile.findAll();

  // return only safe field
  return res.status(200).send(
    profiles.map(({ ProfileID, Email, IsAdmin, createdAt, updatedAt }) => ({
      ProfileID,
      Email,
      IsAdmin,
      createdAt,
      updatedAt,
    }))
  );
};

// GET BY ID
exports.getById = async (req, res) => {
  const profile = await getProfile(req, res);
  if (!profile) return;

  return res.status(200).send(profile);
};

// CREATE
exports.create = async (req, res) => {
  // required fields
  if (!req.body.Email || !req.body.PasswordHASH) {
    return res
      .status(400)
      .send({ error: "Missing parameter, please review your request data." });
  }

  const newProfile = {
    ProfileID: UUID.v7(),
    Email: req.body.Email,
    PasswordHASH: (await Utilities.gimmePassword(req.body.PasswordHASH)).toString(),
    IsAdmin: req.body.IsAdmin ?? "false",
  };

  const createdProfile = await db.Profile.create(newProfile);

  return res
    .location(`${Utilities.getBaseURL(req)}/profiles/${createdProfile.ProfileID}`)
    .sendStatus(201);
};

// MODIFY
exports.modifyById = async (req, res) => {
  const profile = await getProfile(req, res);
  if (!profile) return;

  if (!req.body.Email && !req.body.PasswordHASH && req.body.IsAdmin === undefined) {
    return res.status(400).send({ error: "No valid data provided for update." });
  }

  if (req.body.Email) profile.Email = req.body.Email;

  if (req.body.PasswordHASH) {
    profile.PasswordHASH = (await Utilities.gimmePassword(req.body.PasswordHASH)).toString();
  }

  if (req.body.IsAdmin !== undefined) {
    profile.IsAdmin = req.body.IsAdmin;
  }

  await profile.save();

  return res
    .location(`${Utilities.getBaseURL(req)}/profiles/${profile.ProfileID}`)
    .status(200)
    .send(profile);
};

// DELETE
exports.deleteById = async (req, res) => {
  const profile = await getProfile(req, res);
  if (!profile) return;

  await profile.destroy();
  return res.sendStatus(204);
};
