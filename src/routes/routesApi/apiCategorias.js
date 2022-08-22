/* Sistema de Ruteo */
const express= require('express');
const cors = require('cors')

const router= express.Router(); /* Router permiete crear rutas montables y desmontables */

const apiCategoriasControllers = require('../../controllers/apiControllers/apiCategoriasControllers');



router.get('/ofertas', cors(), apiCategoriasControllers.ofertas); // Walter
router.get('/regulares', cors(), apiCategoriasControllers.regulares); // Walter
router.get('/aereos', cors(), apiCategoriasControllers.aereos); // Walter
router.get('/micros', cors(), apiCategoriasControllers.micros); // Walter
router.get('/autos', cors(), apiCategoriasControllers.autos); // Walter
router.get('/hoteles', cors(), apiCategoriasControllers.hoteles); // Walter

module.exports = router;