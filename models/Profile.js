const { DataTypes, ValidationError } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Profile = sequelize.define(
        'Profile', {
            UserID: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUID
            },
            Email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                Validate: {
                    isEmail: true
            },
            Password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: [8, 100]
                }
            },
            IsAdmin: {
                type: DataTypes.BOOLEAN,
                defaulValue: false
            }
        }
    )
    console.log(Profile === sequelize.models.Profile)
    return Profile;
}