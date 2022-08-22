/* Este controlador "deals_controller" implementa todos los metodos para
manejar los productos */

/* cargo el manejador de los paquetes del modelo */
// const data_paquetes = require('../model/data_paquetes.js');
const engine = require('../model/engine.js'); // con este modulo operamos la base de datos
const db = require('../../database/models');

// Notas: cambios para refactorizar el codigo para el uso de MySQL
// se incluye el "async" y el "await" porque se pasa de trabajar de una forma sincronica a una asincronica
// se recibe una promesa y hay que resolverla en este punto

const deals_controller = {
    show_deals: async (req, res) => {
        let deals = await engine.browse_table_db('Producto');
        let data_deals = deals.filter((elemento) => elemento.package_category == 2);

        res.status(200).render('../views/deals', { data_deals: data_deals });
    },
    post_deal: (req, res) => {
        let data_deals = req.body.id;
        engine.add_columm_db('Producto', data_deals);

        res.status(200).redirect('../views/productDetail');
    }
};

module.exports = deals_controller;