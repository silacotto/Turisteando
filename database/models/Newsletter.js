module.exports = (sequelize, dataTypes) => {

    let alias = "Newsletter";
    let cols = {

       email_id: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
       },

       email: {
        type: dataTypes.STRING(150),
        allowNull: false,
       }
    };

    let config = {
        tableName: "newsletter",
        timestamps: false
    };

    const Newsletter = sequelize.define(alias, cols, config);
    
    return Newsletter; 

};