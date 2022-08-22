module.exports = (sequelize, dataTypes) => {

    let alias = "Transaction";
    let cols = {

       transaction_id: {
        type: dataTypes.STRING(50),
        primaryKey: true,
        autoIncrement: false,
        allowNull: false,
       },

       user_id: {
        type: dataTypes.INTEGER,
        allowNull: false,
       },

       sale_date: {
        type: dataTypes.DATE,
        allowNull: false,
       },

      total: {
        type: dataTypes.DOUBLE,
        allowNull: false,
       },

        payment_method:{
        type: dataTypes.STRING(45),
        allowNull: false,
       },
       
       payment_detail_id: {
        type: dataTypes.STRING(50),
        allowNull: false,
       },
       
       payment_detail_id: {
        type: dataTypes.INTEGER,
        allowNull: false,
       },
      
       customer_id: {
        type: dataTypes.INTEGER,
        allowNull: false,
       },
  
    }

    let config = {
        tableName: "transaction",
        timestamps: false
        }

    const Transaction = sequelize.define(alias, cols, config);
            
        Transaction.associate = function(models){
        Transaction.belongsTo(models.UserRegister, {
                as: "user",
                foreignKey: "user_id"
        });

        Transaction.hasMany(models.DetailTransaction, {
            as: "detailtransactions",
            foreignKey:"transaction_id"
        });

       
        // Transaction.belongsTo(models.Cart, {
        //     as: "cart",
        //     foreignKey:"cart_id"
        // });
        Transaction.belongsTo(models.Customers, {
            as: "customer",
            foreignKey:"customer_id"
        });

        }
    
    return Transaction; 

}