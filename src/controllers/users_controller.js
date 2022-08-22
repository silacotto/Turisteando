const fs = require('fs');
const { validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
const db = require('../../database/models');


const users_controller = {
    register: async (req, res) => {
        res.status(200).render('../views/users/register')
    },

    // ------ crear usuario con db ---------------------
    create_user: (req, res) => {
        //validaciones formulario registro
        const result_validation = validationResult(req);
        if (result_validation.errors.length > 0) {
            return res.status(200).render('../views/users/register', {
                errors: result_validation.mapped(),
                oldData: req.body
            });
        } else {
        //metodo create para registrar user en db
            db.UserRegister.create({
                user: req.body.user,
                email: req.body.email,
                password: bcryptjs.hashSync(req.body.password, 10),
                password_valid: bcryptjs.hashSync(req.body.password_valid, 10),
                avatar: req.file.filename
            });
            res.status(200).redirect('/users/login');
        };
    },

    login: (req, res) => {
        res.status(200).render('../views/users/login')
    },

    //-------------- proceso de login--------------
    user_login: async (req, res) => {
        //validaciones formulario login
        const result_validation = validationResult(req);
        if (result_validation.errors.length > 0) {
            return res.status(200).render('../views/users/login', {
                errors: result_validation.mapped(),
                oldData: req.body
            });
        } else {
            await db.UserRegister.findOne({
                where: {email: req.body.email}
            }).then(user_to_login => {
                if (user_to_login) {
                    let password_compare = bcryptjs.compareSync(req.body.password, user_to_login.password)

                    if (password_compare) {
                        delete user_to_login.password;
                        delete user_to_login.password_valid;
                        req.session.user_logged = user_to_login;

                        if (req.body.remember_user) {
                            res.cookie('user_email', req.body.email, { maxAge: (1000 * 60 ) * 10 });
                        }
                        return res.redirect('../users/profile');
                    };
                }
            //     return res.status(200).render('../views/users/login', {
            //         errors: {
            //             password: {
            //                 msg: 'La contraseña es incorrecta. Vuelve a intentarlo'
            //             }
            //         },
            //     oldData: req.body
            //     });
            // }
                
            // return res.status(200).render('../views/users/login', {
            //     errors: {
            //         email: {
            //             msg: 'No se encuentra este email en nuestra base de datos'
            //         }
            //     },
            // oldData: req.body
            // });
            });
        }
    },

    profile: async (req, res) => {
        return res.status(200).render('../views/users/user_profile', {
            user: req.session.user_logged
        });
    },

    //----------- formulario para editar perfil ----------------
    edit: async (req, res) => {
        let user = await db.UserRegister.findByPk(req.params.id)
        console.log(user);

        res.status(200).render('../views/users/user_edit', {user: user})
    },

    //----------- metodo para editar datos de la db ------------
    actualizar: async (req, res) => {
        let data_user = req.body;
       
        let user_update = await db.UserRegister.update({
            user_id:req.params.id,
            user: data_user.user,
            email:  data_user.email,
            password:  data_user.password,
            password_valid: data_user.password_valid,
            avatar: data_user.avatar
       
        }, {
            where: {user_id: req.params.id}
        });
        console.log(user_update);

        res.redirect('/users/profile')
    },
 
    logout: (req, res) => {
        res.clearCookie('user_email');
        req.session.destroy();
        return res.status(200).redirect('/index')
    }
};

module.exports = users_controller;