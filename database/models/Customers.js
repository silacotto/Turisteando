module.exports = (sequelize, dataTypes) => {

        let alias = "Customers";
        let cols = {
    
            customer_id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: false,
            allowNull: false,
           },
           
           user_id: {
            type: dataTypes.INTEGER,
            allowNull: false,
           },
        
    
           first_name: {
            type: dataTypes.STRING(100),
            allowNull: false,
           },
    
           last_name: {
            type: dataTypes.STRING(100),
            allowNull: false,
           },
    
           birth_date: {
            type: dataTypes.DATE,
            allowNull: false,
           },
    
           age: {
            type: dataTypes.INTEGER,
            allowNull: false,
           },
    
           identity_document: {
            type: dataTypes.INTEGER,
            allowNull: false,
           },
    
           home: {
            type: dataTypes.STRING(150),
            allowNull: false,
           },
    
           postal_code: {
            type: dataTypes.INTEGER,
            allowNull: false,
           },
    
           province_id: {
            type: dataTypes.INTEGER,
            allowNull: false,
           },
    
           email_alternative: {
            type: dataTypes.STRING(150),
            allowNull: false,
           },
    
           phone_number: {
            type: dataTypes.STRING(150),
            allowNull: false,
           },
        }
    
        let config = {
            tableName: "customers",
            timestamps: false
            }
    
        const Customers = sequelize.define(alias, cols, config);
                
        Customers.associate = function(models){
        Customers.belongsTo(models.Province, {
                as: "province",
                foreignKey: "province_id"
            });
    
            Customers.belongsTo(models.UserRegister, {
            as: "userRegister",
            foreignKey: "user_id"
            });     
    
         }
        return Customers; 
    
        }