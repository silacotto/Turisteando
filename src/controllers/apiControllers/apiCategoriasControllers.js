const db = require("../../../database/models");
const sequelize = db.sequelize;


const apiCategoriasControllers = {

    ofertas: (req, res) => {

        db.Producto
            .findAll({
                attributes: [[sequelize.fn('COUNT', sequelize.col('package_category')), 'ofertas']],
                where: {package_category: '2' }

              })
            .then(datos => {
                return res.json({
                    data: datos
                })
            })

    },

    regulares: (req, res) => {

        db.Producto
            .findAll({
                attributes: [[sequelize.fn('COUNT', sequelize.col('package_category')), 'regulares']],
                where: {package_category: '1' }

              })
            .then(datos => {
                return res.json({
                    data: datos
                })
            })

    },
    
    aereos: (req, res) => {

        db.Producto
            .findAll({
                attributes: [[sequelize.fn('COUNT', sequelize.col('package_transportation')), 'aereos']],
                where: {package_transportation: '1' }

              })
            .then(datos => {
                return res.json({
                    data: datos
                })
            }) 

    },
    
    micros: (req, res) => {

        db.Producto
            .findAll({
                attributes: [[sequelize.fn('COUNT', sequelize.col('package_transportation')), 'micros']],
                where: {package_transportation: '2' }

              })
            .then(datos => {
                return res.json({
                    data: datos
                })
            }) 

    },
    
    autos: (req, res) => {

        db.Producto
            .findAll({
                attributes: [[sequelize.fn('COUNT', sequelize.col('package_transportation')), 'autos']],
                where: {package_transportation: '3' }

              })
            .then(datos => {
                return res.json({
                    data: datos
                })
            }) 

    },
    
    hoteles: (req, res) => {

        db.Hotel
            .findAll({
                attributes: [[sequelize.fn('COUNT', sequelize.col('id')), 'hoteles']],
                

              })
            .then(datos => {
                return res.json({
                    data: datos
                })
            }) 

    },

    
};

module.exports = apiCategoriasControllers;
    
