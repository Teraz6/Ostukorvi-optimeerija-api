const { db } = require('../db')
const Utilities = require('./Utilities')
const UUID = require ('uuid')

exports.create =
async (req, res) => {
    if (
        !req.body.Email ||
        !req.body.PasswordHASH
    ){
        return res.status(400).send({error:'Missing parameter, please review your request data.'})
    }
    const newProfile = {
        ProfileID: UUID.v7(),
        Email: req.body.Email,
        PasswordHASH: (await Utilities.gimmePassword(req.body.PasswordHASH)).toString(),
        //IsAdmin: req.body.IsAdmin,
    }
    const createdProfile = await db.Profile.create(newProfile)
    
    console.log(createdProfile)
    return res.location(`${Utilities.getBaseURL(req)}/profiles/${createdProfile.ProfileID}`)
    .sendStatus(201);
}

exports.getAll = async (req, res) => {
  const profiles = await db.Profile.findAll();
  console.log("getAll: " + profiles);

  return res.status(200).send(
    profiles.map(({ ProfileID, Email }) => ({ ProfileID, Email }))
  );
};

exports.getById =
async (req, res) => {
    const id = req.params.id || req.params.ProfileID;
    if (!id) {
        return res.status(400).send({ error: 'ProfileID is missing.' })
    }

    const profile = await db.Profile.findByPk(id)
    if (!profile) {
        return res.status(404).send({ error: 'Profile not found' })
    }

    return res.status(200).send(profile)
}


exports.modifyById =
async (req, res) => {
    const id = req.params.id || req.params.ProfileID;
    if (!id) {
        return res.status(400).send({ error: 'ProfileID is missing.' })
    }

    const profileToBeChanged = await db.Profile.findByPk(id)
    if (!profileToBeChanged) {
        return res.status(404).send({ error: 'Profile not found' })
    }

    // change email
    if (!req.body.Email && !req.body.PasswordHASH) {
        return res.status(400).send({ error: 'No valid data provided for update.' })
    }

    if (req.body.Email) {
        profileToBeChanged.Email = req.body.Email
    }

    if (req.body.PasswordHASH) {
        profileToBeChanged.PasswordHASH = (await Utilities.gimmePassword(req.body.PasswordHASH)).toString()
    }

    await profileToBeChanged.save()

    // Update task requires: return status 200 and the updated profile
    return res.status(200).send(profileToBeChanged)
}


exports.deleteById =
async (req, res) => {
    const id = req.params.id || req.params.ProfileID;
    if (!id) {
        return res.status(400).send({ error: 'ProfileID is missing.' })
    }

    const profileToBeDeleted = await db.Profile.findByPk(id)
    if (!profileToBeDeleted) {
        return res.status(404).send({ error: 'Profile not found' })
    }

    await profileToBeDeleted.destroy()
    return res.sendStatus(204)
}
