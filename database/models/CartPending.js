module.exports = (sequelize, dataTypes) => {

    let alias = "CartPending";
    let cols = {

       cart_pending_id: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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

       /*cart_id: {
        type: dataTypes.INTEGER,
        allowNull: false,
       },*/

       package_price: {
        type: dataTypes.DOUBLE,
        allowNull: false,
       },

       package_discount: {
        type: dataTypes.DECIMAL(5,2),
        allowNull: false,
       },

       total: {
        type: dataTypes.DOUBLE,
        allowNull: false,
       },
  
    }

    let config = {
        tableName: "cartpending",
        timestamps: false
        }

    const CartPending = sequelize.define(alias, cols, config);
            
    CartPending.associate = function(models){
        CartPending.belongsTo(models.UserRegister, {
             as: "user",
            foreignKey: "user_id"
        });

    
            // CartPending.belongsTo(models.Cart, {
            //         as: "cart",
            //         foreignKey: "cart_id"
            // });
        
        CartPending.belongsTo(models.Producto, {
            as: "package",
            foreignKey: "package_id"
    });   

        }
    
    return CartPending; 

}