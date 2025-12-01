const { db } = require('../db')
const Utilities = require('./Utilities')

exports.getAll = 
async (req, res) => {
    const products = await db.Products.findAll();
    console.log("getAll: " + products)
    res.status(200)
    .send(products.map(({ProductID,Name}) => {return{ProductID,Name}}))
}

exports.getByID = 
async (req, res) => {
    const product = await getProduct(req, res);
    if (!product) {return res.status(404).send({error: 'Product not found'})}
}

const getProducts = 
async (req, res) => {
    const idNumber = req.params.ProductID
    if (isNaN(idNumber)){
        res.status(400).send({error:`Entered id is not valid ${idNumber}`})
        return null;
    }
    const product = await db.products.findByPk(idNumber)
    if(!product) {
        res.status(404).send({Error: `Product with this id was not found ${idNumber}`})
        return null;
    }
    return product
}