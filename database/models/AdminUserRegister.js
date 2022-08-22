module.exports = (sequelize, dataTypes) => {

    let alias = "AdminUserRegister";
    let cols = {

       user_id: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
       },

       user: {
        type: dataTypes.STRING(100),
        allowNull: false,
       },

       email: {
        type: dataTypes.STRING(150),
        allowNull: false,
       },

       password: {
        type: dataTypes.STRING(100),
        allowNull: false,
       },

       password_valid: {
        type: dataTypes.STRING(100),
        allowNull: false,
       }
    };

    let config = {
        tableName: "adminuserregister",
        timestamps: false
        };

    const AdminUserRegister = sequelize.define(alias, cols, config);
            
    return AdminUserRegister; 

};