// seccion de modulos requiridos
const fs= require('fs');
const path= require('path');
const db = require('../../database/models');
const Op = db.Sequelize.Op;

/* defino las variables del entorno */
const path_relative= path.join(__dirname, '../../data/')


const engineCart = {

    browse_table_db_cart: function(name_table) {
        // se implemento el metodo "read_db para obtener los datos desde MySQL"
        return this.read_db_cart(name_table);
    },

    read_db_cart: function (name_table) {
        return db[name_table].findAll({
            include:[{association:"package"}, {association:"user"}],
            raw: true,
            nest: true,
        });
    },
    read_columm_db_cart: function(name_table, columm_table) {
        
        return registro = db[name_table].findAll( {
             where :{
                 user_id: columm_table
             },
             include:[{association:"package"}, {association:"user"}], 
                 raw: true,
                 nest: true,
             });
       
   
     }, 
 
     read_columm_db_customer: function (name_table, columm_table_id){
        let registro = db[name_table].findByPk(columm_table_id, {
            include: [{association:"userRegister"}, {association:"province"}]
                     });
        return registro;
    }, 

    // este metodo permite dar de alta una columm en la table de MySql
    add_columm_db_cart: function (name_table, object_add) {
        db[name_table].create(object_add);
        return 201 ;
    },
      
    edit_columm_db_cart: function(name_table, object_modified) {
        db[name_table].update(
            object_modified, {
            where: {
                user_id: object_modified.user_id
            }
        }, {
            include: [{association:"userRegister"}, {association:"province"}]
        });
        return 201;    
    }, 

    delete_columm_db_cart: function(name_table, columm_table_id) {
    db[name_table].destroy({
        where: {
            package_id: columm_table_id
         }
    });
        return 200;
    }, 

    delete_cart_fnal: function(name_table, columm_table_id) {
        db[name_table].destroy({
            where: {
                user_id: columm_table_id
            }
        });
        return 200;
    }, 

    porcentaje: function (precio, porcentaje,nro){
    return precio - (precio * porcentaje / nro)
    },
    
    subtotal: function(cantidad,precio){
        return cantidad * precio
    },
    
    validar_campo : function (expresion, input, campo){
        if(expresion.test(input.value)){
               
            document.getElementById(`${campo}`).classList.remove("validacion_incorrecta");
            document.getElementById(`${campo}`).classList.add("validacion_correcta");
            document.querySelector(`#${campo} i`).classList.remove("fa-circle-xmark");
            document.querySelector(`#${campo} i`).classList.add("fa-circle-check");
            document.querySelector(`#${campo} .mensaje_error`).classList.remove("mensaje_error-activo");
            
    }else{
            document.getElementById(`${campo}`).classList.add("validacion_incorrecta");
            document.getElementById(`${campo}`).classList.remove("validacion_correcta"); 
            document.querySelector(`#${campo} i`).classList.add("fa-circle-xmark");
            document.querySelector(`#${campo} i`).classList.remove("fa-circle-check");
            document.querySelector(`#${campo} .mensaje_error`).classList.add("mensaje_error-activo");
            
    }
  

}

  
} 
module.exports = engineCart;