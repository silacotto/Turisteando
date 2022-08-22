const access_database= require('../model/access_database.js');
const { browse_table, write_json, add_columm } = require('../model/engine.js');

const engine= require('../model/engine.js'); // con este modulo operamos la base de datos
const engineCart= require('../model/engineCart.js'); // con este modulo operamos la base de datos
const {validationResult}= require("express-validator");
const { logout } = require('./users_controller.js');
const db = require('../../database/models/index.js');
const session = require('express-session');
const { suppressDeprecationWarnings } = require('moment');
const { create } = require('../model/Users.js');

const date = require("date-and-time");

const cart_controller = {       
    
    show_cart : async (req, res) => {
        let usuario =req.session.user_logged
   
        let data_show_cart = await engineCart.read_columm_db_cart("Cart", usuario.user_id);
            if (data_show_cart[0] === undefined){
            let lista_paquetes= await engine.browse_table_db('Producto'); 
                res.status(200).render('../views/empty_cart', {selector_paquetes : lista_paquetes});
            }else{

                let precio =[]  
                // sumo el total del carrito
                    for (let i = 0; i < data_show_cart.length; i++) {
                         precio.push((data_show_cart[i].total));
                    };
            
                let total = precio.reduce((acum, price)=>{ return acum + price });
               
                
                // console.log(passenger_total)
                res.status(200).render('../views/productCart', {data_show_cart : data_show_cart, total:total});
            }
            
        },
        
    add_item : async  (req, res) => {
       
        const list_package = await engine.browse_table_db("Producto");
        let data_add_cart =req.params.id
        let usuario =req.session.user_logged
        let passengers=(req.body.cantidad)

        let data_show_cart = list_package.filter(elemento=>elemento.package_id == data_add_cart);
      
        let amount_passengers = Number(passengers)
      
        let passenger_total =engineCart.porcentaje(data_show_cart[0].package_price,data_show_cart[0].package_discount, 100 )
        
        let subtotal=engineCart.subtotal(amount_passengers,passenger_total)
  
        
      
        //agrego items al carrito
        let cart =  {
            user_id: usuario.user_id,
            package_id: data_add_cart,
            package_price: data_show_cart[0].package_price,
            package_discount:data_show_cart[0].package_discount,
            passengers:amount_passengers,
            sub_total:passenger_total,
            total: subtotal
          };

        let grabar = await engineCart.add_columm_db_cart("Cart", cart);
            if (grabar != 201) {
                console.log('error al agregar paquete al carrito')
            }else{
            res.status(201).redirect("/cart")
            }
    },
           
    delete_item : async  (req, res) => {
        let data_delete_cart = req.params.id;
        let borrar=engineCart.delete_columm_db_cart("Cart", data_delete_cart)     
            if (borrar != 200) {
            console.log('error al agregar paquete al carrito')
            }else{
            res.status(200).redirect("/cart")
            }
    },
          
    purchase : async (req, res) => {
        let usuario =req.session.user_logged
        let data_show_cart = await engineCart.read_columm_db_cart("Cart", usuario.user_id);
            for (let i = 0; i < data_show_cart.length; i++) {
                let porcentaje =engineCart.porcentaje(data_show_cart[i].package_price,data_show_cart[i].package_discount, 100 );     
                
                let cart_pending = {
                    user_id : usuario.user_id,
                    package_id : data_show_cart[i].package_id,
                    package_price : data_show_cart[i].package_price,
                    package_discount: data_show_cart[i].package_discount,
                    total: porcentaje
                };
              
                let guardar = await engineCart.add_columm_db_cart("CartPending", cart_pending);
                    if (guardar != 201){
                    console.log('error')
                    }else{
                    res.render("../views/cartForm");
                }}
    },

    process_purchase: async (req,res)=>{
        let data_purchese = req.body
        let usuario =req.session.user_logged
        
        const result_validation_cart = validationResult(req);
            if (result_validation_cart.errors.length > 0){
                res.render("cartForm", { 
                    errors : result_validation_cart.mapped(),
                    oldData: req.body
                })
                return
            }else{
            let data_show_cart = await engineCart.read_columm_db_cart("Cart", usuario.user_id);
   
            let precio =[]  
            // sumo el total del carrito
                for (let i = 0; i < data_show_cart.length; i++) {
                    precio.push((data_show_cart[i].total))
                };
            let total = precio.reduce((acum, price)=>{ return acum + price });
            const order = 'factura N -' + Date.now();
        
            let paymentDetail ={
                payment_detail_id: order,
                card_number: data_purchese.card_number,
                expiration : data_purchese.expiration,
                security_code: data_purchese.security_code 
            };
    
            let grabar_detail= await engineCart.add_columm_db_cart("PaymenDetail", paymentDetail);   
        
            let customers = {
                customer_id: usuario.user_id,
                user_id: usuario.user_id,
                first_name: data_purchese.first_name,
                last_name: data_purchese.last_name,
                birth_date:data_purchese.birth_date,
                age: data_purchese.age,
                identity_document: data_purchese.identity_document,
                home:data_purchese.home,
                postal_code:data_purchese.postal_code,
                province_id:data_purchese.province,
                email_alternative: data_purchese.email_alternative,
                phone_number:data_purchese.phone_number,
                name_card_holder:data_purchese.name_card_holder,
            };
            let buscarCustomer = await engineCart.read_columm_db_customer("Customers", usuario.user_id);
            
                if (buscarCustomer == undefined){   
                  
                    let grabar_customer = await engineCart.add_columm_db_cart("Customers", customers);  
                }else{
                    let actualizar =  await engineCart.edit_columm_db_cart("Customers", customers);
                }

                Date.prototype.yyyymmdd = function() {
                    var yyyy = this.getFullYear().toString();
                    var mm = (this.getMonth()+1).toString(); // 
                    var dd  = this.getDate().toString();
                    return yyyy + "/" + (mm[1]?mm:"0"+mm[0]) + "/" + (dd[1]?dd:"0"+dd[0]); //
                  };
                  
                  var date = new Date();
                  console.log( date.yyyymmdd() ); 
                let transaction = {
                    transaction_id: order,
                    user_id: usuario.user_id,
                    sale_date : date.yyyymmdd(),
                    total: total,
                    payment_method:data_purchese.payment_method,
                    payment_detail_id: order,
                    customer_id: usuario.user_id,
            };
    
            let grabar_transaction = await engineCart.add_columm_db_cart("Transaction", transaction);  
                
                for (let i = 0; i < data_show_cart.length; i++) {
   
                    let detailTransaction ={
                        transaction_id: order,
                        user_id: usuario.user_id,
                        package_id:data_show_cart[i].package_id ,
                        package_price: data_show_cart[i].package_price,
                        package_discount: data_show_cart[i].package_discount,
                        number_passengers:data_show_cart[i].passengers
                    };
               
                    let grabar_detail_transaction = await engineCart.add_columm_db_cart("DetailTransaction", detailTransaction);   
                        };
                    };
                    // eliminar la sesion
                res.clearCookie('user_email');
                req.session.destroy();
                let borrar_cart_id= await engineCart.delete_cart_fnal("Cart", usuario.user_id)
                res.status(200).render("../views/cartFinal");
            
            
    }
};


module.exports= cart_controller;
