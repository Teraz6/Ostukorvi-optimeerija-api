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
        return res.status(400({error:'Missing parameter, please review your request data.'}))
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

//Add products to basket
exports.addItemToBasket = 
async (req,res) => {
    try {
        const basket = await getBasket(req, res);
        if(!basket)
        {
            return res.status(404).send({error:"Basket not found"})
        }
        const product = await db.Products.findByPk(req.body.ProductID);
        if(!product)
        {
            return res.status(404).send({error:"Product not found"})
        }
        const productID = req.body.ProductID;
        const quantityToAdd = parseInt(req.body.Quantity) || 1;
        const existingItem = await db.BasketItem.findOne({where: {BasketID: basket.BasketID, ProductID: productID}})
        if(existingItem)
        {
            existingItem.Quantity += quantityToAdd;
            await existingItem.save();
            return res.status(200).send(existingItem)
        }
        
        await basket.addProduct(product, { 
            through: { Quantity: quantityToAdd } 
        });
        res.status(201).send({message:"Product added to basket successfully"})
    }
    catch(error) {
        console.log(error)
        res.status(500).send({error:"Server error while adding product"})
    }
}

//Get all products from basket
exports.getAllItemsFromBasket = 
async (req,res) => {
    try {
        const basket = await db.Baskets.findByPk(req.params.BasketID, {include: [db.Products]})
        const products = await basket.getProducts();
        if(!basket)
        {
            return res.status(404).send({error:"Basket not found"})
        }
        return res.status(200).send(products)
    }
    catch(error) {
        console.error("FULL ERROR:", error.parent || error); 
        res.status(500).send(error.parent || error);
    }
}

//Delete product from basket
exports.deleteItemFromBasket = 
async (req,res) => {
    try {
        const basket  = await db.Baskets.findByPk(req.params.BasketID, {include:[db.Products]})
        if(!basket)
        {
            return res.status(404).send({error: "Basket not found"})
        }

        const itemToBeDeleted = await basket.removeProduct(req.params.ProductID)
        if(!itemToBeDeleted)
        {
            return res.status(404).send({error: "Product not found in this basket"})
        }
        return res.status(204).send()
    }
    catch (error) {
        console.error(error.parent || error);
        res.status(500).send({error: "Server error"});
    }
}

// Update item quantity
exports.updateItemQuantity = async (req, res) => {
    try {
        const { BasketID, ProductID } = req.params;
        const Quantity = parseInt(req.query.Quantity, 10);

        if (isNaN(Quantity) || Quantity < 1) {
            return res.status(400).send({ 
                error: "Quantity must be a number and at least 1",
                received: req.query.Quantity 
            });
        }

        const [updatedRows] = await db.BasketItem.update(
            { Quantity: Quantity }, 
            { 
                where: { 
                    BasketID: BasketID, 
                    ProductID: ProductID 
                } 
            }
        );
        if (updatedRows === 0) {
            return res.status(404).send({ error: "Product not found in this basket" });
        }
        return res.status(200).send({ 
            message: "Quantity updated successfully",
            updatedQuantity: Quantity 
        });

    } catch (error) {
        console.error("MariaDB Update Error:", error);
        res.status(500).send({ error: "Internal Server Error" });
    }
}