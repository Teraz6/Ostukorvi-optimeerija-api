const { db } = require('../db')
const Product = require('../models/Product')
const Utilities = require('./Utilities')
const UUID = require ('uuid')

const getBasket = 
async (req, res) => {
    const idNumber = req.params.BasketID
    console.log(idNumber)

    const basket = await db.Baskets.findByPk(idNumber)
    if(!basket) {
        res.status(404).send({Error: `Basket with this id was not found ${idNumber}`})
        return null;
    }
    return basket
}

exports.create = 
async (req, res) => {
    if (
        !req.body.Name ||
        !req.body.Description
    ){
        return res.status(400).send({error: 'Missing parameter, please review your request data.'})
    }
    let newBasket = {
        BasketID: UUID.v7(),
        Name: req.body.Name,
        Description: req.body.Description,
        TotalPrice: req.body.TotalPrice,
        ProfileID: req.body.ProfileID, // check if it is correct
        ProductID: req.body.ProductID, //check if this is correct
    }

    const createdBasket = await db.Baskets.create(newBasket)
    return res.location(`${Utilities.getBaseURL(req)}/basket/${createdBasket.BasketID}`)
    .sendStatus(201);
}

exports.getAll = 
async (req,res) => {
    const baskets = await db.Baskets.findAll();
    console.log("getAll: " + baskets)
    res.status(200)
    .send(baskets.map(({BasketID, Name}) => {return{BasketID, Name}}))
}

exports.getById = 
async (req, res) => {
    const basket = await getBasket(req, res);
    if (!basket) {return res.status(404).send({error: 'Basket not found'})}
    return res.status(200).send(basket)
}

exports.modifyById =
async (req,res) => {
    const basketToBeChanged = await getBasket(req,res);
    if(!basketToBeChanged) {
        return
    }
    if (
        !req.body.Name ||
        !req.body.Description
    ){
        return res.status(400({error:'Misiing parameter, please review your request data.'}))
    }
    basketToBeChanged.Name = req.body.Name;
    basketToBeChanged.Description = req.body.Description;
    await basketToBeChanged.save();
    return res
    .location(`${Utilities.getBaseURL(req)}/basket/${basketToBeChanged.BasketID}`).sendStatus(201)
    .send(basketToBeChanged)
}

exports.deleteById =
async (req,res) => {
    const basketToBeDeleted = await getBasket(req,res);
    if(!basketToBeDeleted)
    {
        return;
    }
    await basketToBeDeleted.destroy();
    res.status(204).send({error:"No Content"})
}