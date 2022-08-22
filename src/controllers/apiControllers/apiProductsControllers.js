const { get } = require("express/lib/request");
const db = require("../../../database/models");
const sequelize = db.sequelize;


const apiProductsControllers = {



    
    total: (req,res) => {
        db.Producto.findAll({
            attributes: [
                [sequelize.fn('COUNT', sequelize.col('package_id')),"products"]
            ]
        })
        .then(product => {
            return res.json({
                meta: {
                    method: "get",
                    status: 200,
                    url: "http://localhost:5020/api/products/total"
                },
                data: product,
            })
        })
    },
    list_Products: (req,res)=>{
        db.Producto.findAll({
           include:[{association:"hotel"},{association:"tour"}],
           })
            .then(customers=>{
                return res.status(200).json({
                    meta:
                    {   
                        total: customers.length,
                        status: 200,
                        url: "http://localhost:5020/api/products/list"
                    },
                    data: customers,
                   
                })
            })
    },
    detail: (req,res)=>{
        let package_id = req.params.id;
        db.Producto.findAll({
            where:{
                package_id:package_id
            },
        
            // attributes: [
            //     ["package_name","package_title", "producto"]
            // ]
        })
        .then(product => {
            return res.json({
                meta: {
                    method: "get",
                    status: 200,
                    url: "http://localhost:5020/api/products/:id"
                },
                data: product,              
            })
        })
        
    },

    last_package: (req,res)=>{
        db.Producto.findAll({

            limit:1,
            order: [
                ['package_id', 'DESC'],
            ]
       
        })
            .then(producto=>{
                return res.json({
                    meta:{
                        method: "get",
                        status: 200,
                        url: "http://localhost:5020/api/products/ultimo/producto"
                       },
                    data:producto,
                    url: "http://localhost:5020/images/"
                })
            })
   
    }

} 
    module.exports = apiProductsControllers