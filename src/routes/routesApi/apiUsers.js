/* Sistema de Ruteo */
const path = require('path');
const express= require('express');
const cors = require('cors')
const router= express.Router(); /* Router permiete crear rutas montables y desmontables */

const apiUsersControllers = require('../../controllers/apiControllers/apiUsersControllers');



const corsOptions = {
    origin: 'http://localhost:3000/',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

router.get('/register',cors(), apiUsersControllers.list_register);//Silvana
router.get('/register/:id',cors(), apiUsersControllers.detail_register); //Ignacio

router.get('/customers',cors(), apiUsersControllers.list_customers);//Silvana
router.get('/customers/:id',cors(), apiUsersControllers.detail_customers); //Silvana
router.get('/ultimo/customer', cors(), apiUsersControllers.last_customer);//Silvana

module.exports = router;