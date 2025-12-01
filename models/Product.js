const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define(
        'Product', {
            ProductID: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUID
            },
            Name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            Category: {
                type: DataTypes.STRING,
                allowNull: false
            },
            Price: {
                type: DataTypes.DECIMAL,
                allowNull: false
            }
        }
    )
    console.log(Product === sequelize.models.Product)
    return Product;
}