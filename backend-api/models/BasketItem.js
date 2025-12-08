const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const BasketItem = sequelize.define(
        'BasketItem', {
            BasketItemID: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUID
            },
            Quantity: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 1
            }
        }
    )
    console.log(BasketItem === sequelize.models.BasketItem)
    return BasketItem;
}