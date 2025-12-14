module.exports = (sequelize, DataTypes) => {
    const Profile = sequelize.define('Profile', {
        ProfileID: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        Email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            // validate: { isEmail: true }
        },
        PasswordHASH: {
            type: DataTypes.STRING,
            allowNull: false,
            // validate: { len: [8, 100] }
        }
    })

    return Profile
}
