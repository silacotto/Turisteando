const User = require('../model/Users.js');
const db = require('../../database/models');

function user_logged_middleware(req, res, next) {
    res.locals.is_logged = false;

    let email_in_cookie = req.cookies.user_email;
    if (email_in_cookie) {
        let user_from_cookie = db.UserRegister.findOne({
            where: {email: email_in_cookie}
            }).then(user_data => {
                user_from_cookie = user_data;
                return user_from_cookie;
            }).then(user => {
                if (user_from_cookie) {
                    req.session.user_logged = user_from_cookie;
                    return user;
                }
            }).then(locals_data => {
                if (req.session.user_logged) {
                    res.locals.is_logged = true;
                    res.locals.user_logged = req.session.user_logged;
                    return locals_data
                }
            }).catch(error => {
                console.log(error);
            });
    }

    if (req.session.user_logged) {
            res.locals.is_logged = true;
            res.locals.user_logged = req.session.user_logged
        }
    
    
    // if (user_from_cookie) {
    //     req.session.user_logged = user_from_cookie;
    // }

    // if (req.session.user_logged) {
    //     res.locals.is_logged = true;
    //     res.locals.user_logged = req.session.user_logged
    // }

/*-----------codigo viejo con json --------------------*/
// function user_logged_middleware(req, res, next) {
//     res.locals.is_logged = false;

//     let email_in_cookie = req.cookies.user_email;
//     let user_from_cookie = User.find_by_field('email', email_in_cookie);


//     if (user_from_cookie) {
//         req.session.user_logged = user_from_cookie;
//     }

//     if (req.session.user_logged) {
//         res.locals.is_logged = true;
//         res.locals.user_logged = req.session.user_logged
//     }
/* ----------------------------------------------------*/
    next();
}

module.exports = user_logged_middleware;