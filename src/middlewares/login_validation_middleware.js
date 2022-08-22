const { body } = require('express-validator');
const db = require('../../database/models');
const bcryptjs = require('bcryptjs');

// Validaciones Login
const login_validations = [
    body('email')
        .notEmpty().withMessage('Tienes que escribir tu email.').bail()
        .isEmail().withMessage('Debes escribir un formato de correo válido.')
        .custom((value, { req }) => {
            return db.UserRegister.findOne({
                where: {email: req.body.email}
            }).then(user_in_db => {
                if (!user_in_db) {
                    throw new Error('Este email no se encuentra en nuestra base de datos.')
                }
                return true;
            })
        }),

    body('password')
        .notEmpty().withMessage('Tienes que escribir una contraseña.').bail()
        .custom((value, { req }) => {
            return db.UserRegister.findOne({
                where: {email: req.body.email}
            }).then(user_to_login => {
                if (user_to_login) {
                    let password_compare = bcryptjs.compareSync(req.body.password, user_to_login.password)
                    if (!password_compare) {
                        throw new Error('La contraseña es incorrecta. Vuelve a intentarlo.')
                    }
                    return true;
                }
            })
        })
];

module.exports = login_validations;