const { db } = require('../db')
const Utilities = require('./Utilities')
const UUID = require ('uuid')

exports.create = 
async (req, res) => {
    if (
        !req.body.Name ||
        !req.body.Description
    ){
        return res.status(400).send({error: 'Missing parameter, please review your request data.'})
    }
    const newBasket = {
        BasketID: UUID.v7(),
        Name: req.body.Name,
        Description: req.body.Description,
        TotalPrice: req.body.TotalPrice,
    }

    const createdBasket = await db.Basket.create(newBasket)
    return res.location(`${Utilities.getBaseURL(req)}/baskets/${createdBasket.BasketID}`)
    .sendStatus(201);
}

exports.getAll = 
async (req,res) => {
    const baskets = await db.Basket.findAll();
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