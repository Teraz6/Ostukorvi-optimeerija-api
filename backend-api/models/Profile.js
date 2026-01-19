const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define("Profile", {
    ProfileID: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    Name: {
    type: DataTypes.STRING,
    allowNull: false
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    PasswordHASH: {
      type: DataTypes.STRING,
      allowNull: false
    },
    IsAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
    }
  });

  return Profile;
};