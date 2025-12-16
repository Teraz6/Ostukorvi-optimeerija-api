const { DataTypes, ValidationError } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Profile = sequelize.define(
        'Profile', {
            ProfileID: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUID
            },
            Email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            PasswordHASH: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            IsAdmin: {
                type: DataTypes.BOOLEAN,
                defaulValue: false
            }
        }
    )
    //console.log(Profile === sequelize.models.Profile)
    return Profile;
}