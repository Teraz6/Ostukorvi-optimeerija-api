const { db } = require('../db')
db.Basket = require('./models/Basket')(sequelize, DataTypes);
db.Products = require('./models/Product')(sequelize, DataTypes);
db.BasketItem = require('./models/BasketItem')(sequelize, DataTypes);

// 1. Basket to Product (Many-to-Many)
db.Basket.belongsToMany(db.Products, {
    through: db.BasketItem,
    foreignKey: 'BasketID', // The foreign key in the BasketItem table that points to Basket
    as: 'Products' // The alias used when querying (e.g., basket.getProducts())
});

// 2. Product to Basket (Many-to-Many)
db.Products.belongsToMany(db.Basket, {
    through: db.BasketItem,
    foreignKey: 'ProductID', // The foreign key in the BasketItem table that points to Product
    as: 'Baskets' // The alias used when querying (e.g., product.getBaskets())
});

// Optional: Define explicit One-to-Many for BasketItem for better querying/loading
db.BasketItem.belongsTo(db.Basket, { foreignKey: 'BasketID' });
db.BasketItem.belongsTo(db.Products, { foreignKey: 'ProductID' });