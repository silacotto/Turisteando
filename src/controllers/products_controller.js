/* Este controlador "products_controller" implementa todos los metodos para
manejar los productos */

// const access_database = require('../model/access_database.js');
const engine = require('../model/engine.js'); // con este modulo operamos la base de datos
const db = require('../../database/models');

// Notas: cambios para refactorizar el codigo para el uso de MySQL
// se incluye el "async" y el "await" porque se pasa de trabajar de una forma sincronica a una asincronica
// se recibe una promesa y hay que resolverla en este punto

const products_controller = {
    // productDetail: async (req, res) => {
    //     let package = await access_database.package_db();
    //     res.status(200).render('../views/productDetail', { package: package });
    // },
    productDetail: async (req, res) => {
        let package = await engine.browse_table_db();
        res.status(200).render('../views/productDetail', { package });
    },
    show_product: async (req, res) => {
        let package_id = req.params.id;
        let package = await engine.read_columm_db('Producto', package_id); 
        
        res.status(200).render('../views/productDetail', { package });
    },
    post_product: async (req, res) => {
        let data_package = req.body.id;
        await engine.add_columm_db('Producto', data_package);
        res.status(200).redirect('../views/productCart');
    }
};

module.exports = products_controller;
