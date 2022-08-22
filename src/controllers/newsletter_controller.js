//const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');
const db = require('../../database/models');
const Op = db.Sequelize.Op;

/* cargo el manejador de los paquetes del modelo */
const engine = require('../model/engine.js');

const newsletter_controller = {
    new_register: async (req, res) => {
        let register = req.body
        const resalt_validation = validationResult(req);
        if(resalt_validation.errors.length > 0) {
            res.status(200).render('..views/newsletter', {
                errors: resalt_validation.mapped(),
                old_data: req.body
            });
        } else {
            let estado = await engine.add_columm_db("Newsletter", register);
            if(estado != 201) {
                console.log('Error al registrarse!')
            } else {
                res.redirect('/')
            }
        };
    }
};

module.exports = newsletter_controller;