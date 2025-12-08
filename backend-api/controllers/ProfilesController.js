const { db } = require('../db')
const Utilities = require('./Utilities')
const UUID = require ('uuid')

exports.create =
async (req, res) => {
    if (
        !req.body.Email ||
        !req.body.Password ||
        !req.body.IsAdmin
    ){
        return res.status(400).send({error:'Missing parameter, please review your request data.'})
    }
    const newProfile = {
        ProfileID: UUID.v7(),
        Email: req.body.Email,
        Password: req.body.Password,
        IsAdmin: req.body.IsAdmin,
    }
    const createdProfile = await db.Profile.create(newProfile)
    
    console.log(createdProfile)
    return res.location(`${Utilities.getBaseURL(req)}/profiles/${createdProfile.ProfileID}`)
    .sendStatus(201);
}