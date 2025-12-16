const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_DBNAME,
    process.env.DB_USERNAME,
    process.env.DB_USERPASS,
    {
        host: process.env.DB_HOSTNAME,
        dialect: 'mariadb',
        //logging: console.log,
    }
)

async() => {
    try {
        await sequelize.authenticate();
        //console.log('Connection has been established successfully')
    } catch (error) {
        console.error("Unable to connect." + error)
    }
}

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Products = require("./models/Product.js")(sequelize, DataTypes);
db.Profiles = require("./models/Profile.js")(sequelize, DataTypes);
db.Baskets = require("./models/Basket.js")(sequelize, DataTypes);
db.BasketItem = require("./models/BasketItem")(sequelize, DataTypes);

db.Products.belongsToMany(db.Baskets, { through: db.BasketItem });
db.Baskets.belongsToMany(db.Products, { through: db.BasketItem });

const sync = (async ()=>{
    await sequelize.sync({alter: true});
    //console.log('DB sync has been completed.')
})

module.exports = {db, sync};