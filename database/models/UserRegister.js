module.exports = (sequelize, dataTypes) => {

        let alias = "UserRegister";
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
           },
           password_valid: {
            type: dataTypes.STRING(100),
            allowNull: false,
           },
           avatar: {
            type: dataTypes.STRING(150),
            allowNull: false,
           },
    
    
        }
    
        let config = {
            tableName: "userregister",
            timestamps: false
            }
    
        const UserRegister = sequelize.define(alias, cols, config);
                
        UserRegister.associate = function(models){
         UserRegister.hasMany(models.Cart, {
            as: "carts",
            foreignKey: "user_id"
         });
    
        UserRegister.hasMany(models.CartPending, {
            as: "cartsPendings",
            foreignKey: "user_id"
        });
    
        UserRegister.hasMany(models.Transaction, {
            as: "transactions",
            foreignKey: "user_id"
        });
    
        UserRegister.hasMany(models.DetailTransaction, {
            as: "detailTransactions",
            foreignKey: "user_id"
        }); 
        UserRegister.belongsTo(models.Customers, {
            as: "customers",
            foreignKey: "user_id"
        }); 
    
        
         }
        return UserRegister; 
    
    }