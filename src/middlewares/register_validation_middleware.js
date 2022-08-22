const path = require('path');
const { body } = require('express-validator');
const db = require('../../database/models');

// Validaciones Registro
const register_validations = [
    body('user').notEmpty().withMessage('Tienes que escribir un nombre').bail()
        .isLength( {min: 2} ).withMessage('El nombre debe tener como mínimo 2 caracteres'),
    body('email')
        .notEmpty().withMessage('Tienes que escribir un email').bail()
        .isEmail().withMessage('Debes escribir un formato de correo válido')
        .custom((value, { req }) => {
            return db.UserRegister.findOne({
                where: {email: req.body.email}
            }).then(user_in_db => {
                if (user_in_db) {
                    throw new Error('Este email ya está registrado')
                }
                return true;
            })
        }),
    body('password')
        .notEmpty().withMessage('Tienes que escribir una contraseña').bail()
        .isLength( {min: 8} ).withMessage('La contraseña debe tener como mínimo 8 caracteres'),
    body('password_valid')
        .notEmpty().withMessage('Tienes que repetir la contraseña').bail()
        .custom((value, { req }) => {
            if (value !== req.body.password) {
              throw new Error('La contraseña de verificación no coincide. Intentalo de nuevo ');
            }

            return true;
        }),
    body('avatar').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.jpeg', '.gif'];
        
        if (!file) {
            throw new Error('Tienes que subir una imagen');
        } else {
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
        }
        }
    
        return true;
    })
];

module.exports = register_validations;