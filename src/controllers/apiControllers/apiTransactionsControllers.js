const { get } = require("express/lib/request");
const db = require("../../../database/models");
const sequelize = db.sequelize;


const apiTransactionsControllers = {

    list: (req,res)=>{
        db.Transaction.findAll({
            include:[{association:"user"}, {association:"customer"}, {association:"detailtransactions"}],
       
        })
        
            .then(transaction=>{
                return res.status(200).json({
                   meta:
                   {
                    method: "get",
                    status: 200,
                    total: transaction.length,
                    url: "http://localhost:5020/api/transactions",
                   } ,
                     
                data:transaction,
              
                })
                
            })
       
           
    },
    total_transactions: (req,res)=>{
        db.Transaction.findAll({
            attributes: [
                            [sequelize.fn('COUNT', sequelize.col('total')),"operaciones"], 
                            [sequelize.fn('SUM', sequelize.col('total')),"facturacion"],
                            [sequelize.fn('MAX', sequelize.col('user_id')),"Ultimo_usuario_en_comprar"],
                           

                        ]
            })
            .then(transaction=>{
                return res.json({
                    meta:{
                        method: "get",
                        status: 200,
                        url: "http://localhost:5020/api/transactions/total"
                    },
                    data:transaction,
        
                
                })
            })
        
       
       },
       
       
}
    module.exports = apiTransactionsControllers