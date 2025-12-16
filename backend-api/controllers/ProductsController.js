const { db } = require('../db')
const Utilities = require('./Utilities')
const UUID = require ('uuid')

exports.getAll = 
async (req, res) => {
    const products = await db.Products.findAll();
    //console.log("getAll: " + products)
    res.status(200)
    .send(products.map(({ProductID,Name}) => {return{ProductID,Name}}))
}

exports.getByID = 
async (req, res) => {
    const product = await getProduct(req, res);
    if (!product) {return res.status(404).send({error: 'Product not found'})}
    return res.status(200).send(product)
}

exports.create =
async (req, res) => {
    if (
        !req.body.Name ||
        !req.body.Price ||
        !req.body.Category ||
        !req.body.Description
    ){
        return res.status(400).send({error:'Missing parameter, please review your request data.'})
    }
    const newProduct = {
        ProductID: UUID.v7(),
        Name: req.body.Name,
        Price: req.body.Price,
        Category: req.body.Category,
        Description: req.body.Description,
    }
    
    const createdProduct = await db.Products.create(newProduct)
    return res.location(`${Utilities.getBaseURL(req)}/product/${createdProduct.ProductID}`)
    .sendStatus(201);
}

exports.deleteById =
async (req, res) => {
    const productToBeDeleted = await getProduct(req,res);
    if(!productToBeDeleted)
    {
        return;
    }
    await productToBeDeleted.destroy();
    res.status(204).send({error:"No Content"})
}

exports.modifyById = 
async (req, res) => {
    const productToBeChanged = await getProduct(req,res);
    if(!productToBeChanged) {
        return;
    }
    if (
        !req.body.Name ||
        !req.body.Price ||
        !req.body.Category ||
        !req.body.Description
    ){
        return res.status(400).send({error:'Missing parameter, please review your request data.'})
    }
    productToBeChanged.Name = req.body.Name;
    productToBeChanged.Price = req.body.Price;
    productToBeChanged.Category = req.body.Category;
    productToBeChanged.Description = req.body.Description;
    await productToBeChanged.save();
    return res
    .location(`${Utilities.getBaseURL(req)}/product/${productToBeChanged.ProductID}`).sendStatus(201)
    .send(productToBeChanged)
}

const getProduct = 
async (req, res) => {
    const idNumber = req.params.ProductID
    //console.log(idNumber)
    // if (isNaN(idNumber)){
    //     res.status(400).send({error:`Entered id is not valid ${idNumber}`})
    //     return null;
    // }
    const product = await db.Products.findByPk(idNumber)
    if(!product) {
        res.status(404).send({Error: `Product with this id was not found ${idNumber}`})
        return null;
    }
    return product
}