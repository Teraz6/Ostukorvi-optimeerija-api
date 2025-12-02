const { db } = require('../db')
const Utilities = require('./Utilities')
const UUID = require ('uuid')

exports.create =
async (req, res) => {
    if (
        !req.body.Name ||
        !req.body.Email ||
        !req.body.Password ||
        !req.body.Create
    ){
        return res.status(400).send({error:'Missing parameter, please review your request data.'})
    }
    const newProduct = {
        ProfileID: UUID.v7(),
        Name: req.body.Name,
        Price: req.body.Email,
        Category: req.body.Password,
        Description: req.body.Create,
    }
    
    const createdProfile = await db.Profile.create(newProduct)
    return res.location(`${Utilities.getBaseURL(req)}/films/${createdProfile.ProfileID}`)
    .sendStatus(201);
}