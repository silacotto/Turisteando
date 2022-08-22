module.exports = (sequelize, dataTypes) => {

    let alias = "PaymenDetail";
    let cols = {

        payment_detail_id: {
        type: dataTypes.STRING(50),
        primaryKey: true,
        autoIncrement: false,
        allowNull: false,
       },

       card_number: {
        type: dataTypes.STRING(45),
        allowNull: false,
       },

       expiration: {
        type: dataTypes.DATE,
        allowNull: false,
       },

       security_code: {
        type: dataTypes.INTEGER,
        allowNull: false,
       },

      
    }

    let config = {
        tableName: "paymentdetail",
        timestamps: false
        }

    const PaymentDetail = sequelize.define(alias, cols, config);
            
    PaymentDetail.associate = function(models){
        PaymentDetail.belongsTo(models.Transaction, {
                as: "transaction",
                foreignKey: "payment_detail_id"
        });
        
       
        }
    
    return PaymentDetail; 

}