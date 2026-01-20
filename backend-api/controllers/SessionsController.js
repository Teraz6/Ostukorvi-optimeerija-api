const { db } = require("../db.js")
const Utilities = require("./Utilities.js")

exports.newSession = 
async (req,res) => {
    if(!req.body.LoginEmail || !req.body.LoginPassword)
    {
        const missingparams = "";
        if(!req.body.LoginEmail)
        {
            missingparams += "No email provided.";
        }
        if(!req.body.LoginPassword)
        {
            missingparams += "No password provided."
        }
        return res.status(400).send({error: "Missing parameter for loggin" + missingparams})
    }

    LoginEmail = req.body.LoginEmail
    console.log(LoginEmail)
    var profileToProvideSessionFor = await db.Profiles.findOne({where: {EmailAddress: LoginEmail}})
    if(!profileToProvideSessionFor) {
        return res.status(404).send({error:"Profile not found"})
    }
    //const newLoginHASH = (await Utilities.gimmePassword(LoginPassword)).toString()
    var isCorrect = (await Utilities.letMeIn(req.body.LoginPassword,profileToProvideSessionFor.PasswordHASH))
    if (!isCorrect)
    {
        return res.status(401).send({error:"Password mismatch"})
    }
    req.session.ProfileID = profileToProvideSessionFor.ProfileID

    return res.status(200).send({
        ProfileID: profileToProvideSessionFor.ProfileID,
        Name: profileToProvideSessionFor.Name,
        Email: profileToProvideSessionFor.Email,
        IsAdmin: profileToProvideSessionFor.IsAdmin
    })
}

exports.reAuthenticate = 
async (req,res) => {
    if(!req.session.ProfileID) {
        return res.status(401).send({error:"Session expired, please log in again."})
    }
    var profile = await db.Profiles.findByPk(req.session.profileID)
    if(!profile)
    {
        return res.status(401).send({error: "Logged in profile not found, please log in again"})
    }
    return res.status(200).send({
        ProfileID: profile.ProfileID,
        Name: profile.Name,
        Email: profile.Email,
        IsAdmin: profile.IsAdmin,
    })
}