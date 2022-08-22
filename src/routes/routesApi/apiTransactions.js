/* Sistema de Ruteo */
const path = require('path');
const express= require('express');
const cors = require('cors')

const router= express.Router(); /* Router permiete crear rutas montables y desmontables */

const apiTransactionsControllers = require('../../controllers/apiControllers/apiTransactionsControllers');


const corsOptions = {
    origin: 'http://localhost:3000/',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

router.get('/', apiTransactionsControllers.list);//Sil
router.get('/total', cors(), apiTransactionsControllers.total_transactions);//



module.exports = router;