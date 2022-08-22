/* Sistema de Ruteo para el administrador */

const path = require('path');
const express = require('express');
const multer= require('multer');
const router = express.Router(); /* Router permiete crear rutas montables y desmontables */


const admin_controllers = require('../controllers/admin_controllers.js');
const users_admin_controllers = require('../controllers/users_admin_controllers.js');
const uploadFile = require('../middlewares/multer_middleware'); 
const validations_package = require('../middlewares/validations_packge'); 
const validations_package_edit = require('../middlewares/validations_packge_edit'); 
// const validations_users_admin = require('../middlewares/validations_users_admin.js');

// configuro Multer para poder subir al servidor los archivos de las imagenes de paisajes
const storage= multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../public/images'));
    },
    filename: function (req, file, cb) {
        const new_image = 'turisteando-' + Date.now() + file.originalname;
        cb(null, new_image);
    }
});
// defino la variable del Multer
const upload= multer({ storage: storage})



/* el metodo HTTP es llamado desde Router */
/* rutas con controladores */
router.get('/', admin_controllers.get_package_view);
// Rustas para crear paquetes GET y POST
router.get('/crear', admin_controllers.crear_package_get);
// En la ruta del post para crear un paquete va como middleware del Multer y el array con validaciones del express-validator
router.post('/crear', upload.single('turisteando_image'), validations_package, admin_controllers.crear_package_post);

/* con la ruta /view muestro un paquete */
router.get('/productos', admin_controllers.lista_packages);
/* rutas para editar productos GET y POST */
router.get('/producto/:id', admin_controllers.edit_package_get);
// En la ruta del put para crear un paquete va como middleware del Multer y el array con validaciones del express-validator_edit
// Nota: hay que tener cuidado como se maneja el tema de la imagen en la modificacion por como trabaja Muter
router.put('/producto/edit', upload.single('turisteando_image'), validations_package_edit, admin_controllers.edit_package_put);
/* rutas para borrar productos GET y DELETE */
router.get('/producto/:id/delete', admin_controllers.delete_package_get);

router.delete('/producto/delete/:id', admin_controllers.delete_package_delete);



// //Registrar Usuario
// router.get('/users/register', users_admin_controllers.register_user_db);
// router.post('/users', validations_users_admin, users_admin_controllers.create_user_db);

//listar Ususarios
router.get('/users', users_admin_controllers.users_list_db);

// Detalle Usuario
router.get('/userDetail/:id', users_admin_controllers.detail_user_db);

//Buscar Usuario

//Editar Usuario
router.get('/user/:id', users_admin_controllers.edit_user_get_db);
router.put('/user/edit',uploadFile.single('avatar'), users_admin_controllers.edit_user_put_db);

//Borrar Usuario

router.get('/user/:id/delete', users_admin_controllers.delete_user_get_db);
router.delete("/user/delete/:id", users_admin_controllers.delete_user_db);

module.exports= router;