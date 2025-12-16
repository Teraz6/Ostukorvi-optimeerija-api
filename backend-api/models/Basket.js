const { DataTypes } = require("sequelize");

module.exports = (sequelize,DataTypes) => {
    const Basket = sequelize.define(
        'Basket', {
            BasketID: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUID
            },
            Name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            Description: {
                type: DataTypes.STRING,
                allowNull: false
            },
            TotalPrice: {
                type: DataTypes.DECIMAL(10,2),
                allowNull: true
            }
        }
    )
    console.log(Basket === sequelize.models.Basket)
    return Basket;
};