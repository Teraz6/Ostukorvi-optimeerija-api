const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const BasketItem = sequelize.define(
        'BasketItem', {
            BasketItemID: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            Quantity: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 1
            },
            ProductID: {
                type: DataTypes.UUID,
                allowNull: false
            },
            BasketID: {
                type: DataTypes.UUID,
                allowNull: false
            }
        }
    )
    console.log(BasketItem === sequelize.models.BasketItem)
    return BasketItem;
}