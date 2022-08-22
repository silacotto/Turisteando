const { users_list } = require("./users_controller");
const engine= require('../model/engine.js');
const Users= require('../model/Users.js');
const { find_columm } = require("../model/engine.js");
const req = require("express/lib/request");
const engineUser = require("../model/engineUser");
// const { validationResult } = require('express-validator');

const users_admin_controller = {

    // /*Registro usuario*/
    // register_user_db: async (req, res) => {
    //     res.status(200).render('../views/register_user_admin')
    // },

    // create_user_db: async (req, res) => {
    //     //validaciones formulario registro
    //     const result_validation = validationResult(req);
    //     if (result_validation.errors.length > 0) {
    //         return res.status(200).render('../views/register_user_admin', {
    //             errors: result_validation.mapped(),
    //             oldData: req.body
    //         });
    //     } else {
    //     //metodo create para registrar user en db
    //         db.AdminUserRegister.create({
    //             user: req.body.user,
    //             email: req.body.email,
    //             password: bcryptjs.hashSync(req.body.password, 10),
    //             password_valid: bcryptjs.hashSync(req.body.password_valid, 10),
    //         });
    //         res.status(200).redirect('/users_admin');
    //     };
    // },

    /*Mostrar todos usuarios*/
    users_list_db: async (req, res) => {
       let users_table= await engineUser.read_table_db('UserRegister');
        res.status(200).render('../views/users_admin', {users_table: users_table });
    },

    /*Mostrar detalle del Usuario*/
    detail_user_db : async (req, res) => {
        let user_id= req.params.id;
        let user= await engineUser.read_FindByPK_db("UserRegister", user_id)
        res.status(200).render("../views/user_admin_detail", {user: user}); 
        },
    
        /*Editar los campos de un Usuario*/
    edit_user_get_db: async (req, res) => {
        let user_id= req.params.id;

        let user= await engineUser.read_FindByPK_db("UserRegister", user_id)
        let user2= await engineUser.read_FindByPK_include("Customers", user_id)
        res.status(200).render("../views/users/user_edit_admin", {user: user, user2:user2}); //como envio un objeto literal uso el indice cero del array
    },
   
    edit_user_put_db: async (req, res)=>{
       let data_user = req.body;
    
        let actualizar = {
            customer_id: data_user.user_id,
            user_id : data_user.user_id,
            first_name: data_user.first_name,
            last_name: data_user.last_name,
            birth_date:data_user.birth_date,
            age: data_user.age,
            identity_document: data_user.identity_document,
            home:data_user.home,
            postal_code:data_user.postal_code,
            province_id:data_user.province,
            email_alternative: data_user.email_alternative,
            phone_number:data_user.phone_number,
 
         }

   
        /* actualizo la base de datos */
         let actualizado = await engineUser.edit_columm_db_user("Customers", actualizar);
        
        res.redirect('/admin');
    },

    /*Muestra el Usuario a Eliminar */
    delete_user_get_db: async (req, res)=>{
        let user_id= req.params.id
        let user= await engineUser.read_FindByPK_db("UserRegister", user_id);
        res.status(200).render("../views/users/user_delete", {user : user});    
    },
   
     /* Elimina un usuario*/
    delete_user_db: async (req, res)=>{
        let user_id = req.params.id;
        await engineUser.delete_columm_db_user("UserRegister", user_id);
        res.redirect("/admin/users");
        }
    }


module.exports = users_admin_controller;