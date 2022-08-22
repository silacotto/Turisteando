module.exports = (sequelize, dataTypes) => {

    let alias = "Cart";
    let cols = {

       cart_id: {
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
        primaryKey: true,
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
       
       passengers: {
        type: dataTypes.INTEGER,
        allowNull: false,
       },
       sub_total: {
        type: dataTypes.DOUBLE,
        allowNull: false,
       },

       total: {
        type: dataTypes.DOUBLE,
        allowNull: false,
       },
       
       
  
  
    }

    let config = {
        tableName: "cart",
        timestamps: false
        }

    const Cart = sequelize.define(alias, cols, config);
            
        Cart.associate = function(models){
            Cart.belongsTo(models.UserRegister, {
                as: "user",
                foreignKey: "user_id"
        });
        
       Cart.belongsTo(models.Producto, {
            as: "package",
            foreignKey:"package_id"
        });

          
        // Cart.hasMany(models.Transaction, {
        //     as: "tansactions",
        //     foreignKey:"cart_id"
        // });

       


        }
    
    return Cart; 

}