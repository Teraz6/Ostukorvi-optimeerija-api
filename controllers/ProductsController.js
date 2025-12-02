const { db } = require('../db')
const Utilities = require('./Utilities')
const UUID = require ('uuid')

exports.getAll = 
async (req, res) => {
    const products = await db.Products.findAll();
    console.log("getAll: " + products)
    res.status(200)
    .send(products.map(({ProductID,Name}) => {return{ProductID,Name}}))
}