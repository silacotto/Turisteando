const { STRING } = require("sequelize");

module.exports = (sequelize, dataTypes) => {

    let alias = "DetailTransaction";
    let cols = {

        detailtransactions_id: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
       },
       transaction_id: {
        type: dataTypes.INTEGER,
        allowNull: false,
       },
       
       user_id: {
        type: dataTypes.INTEGER,
        allowNull: false,
       },
      

       package_id: {
        type: dataTypes.INTEGER,
       allowNull: false,
       },

       

       package_price: {
        type: dataTypes.DOUBLE,
        allowNull: false,
       },

       package_discount: {
        type: dataTypes.DECIMAL(5,2),
        allowNull: false,
       },

     

       number_passengers: {
        type: dataTypes.INTEGER,
        allowNull: false,
       },
  
    }

    let config = {
        tableName: "detailtransactions",
        timestamps: false
        }

    const DetailTransaction = sequelize.define(alias, cols, config);
            
        DetailTransaction.associate = function(models){
            DetailTransaction.belongsTo(models.Transaction, {
                as: "transaction",
                foreignKey: "transaction_id"
        });

        DetailTransaction.belongsTo(models.UserRegister, {
            as: "user",
            foreignKey: "user_id"
        });
        
        DetailTransaction.belongsTo(models.Producto, {
            as: "package",
            foreignKey:"package_id"
        });

        }
    
    return DetailTransaction; 

}