// seccion de modulos requiridos
const fs= require('fs');
const path= require('path');
const db = require('../../database/models');
const Op = db.Sequelize.Op;

/* defino las variables del entorno */
const path_relative= path.join(__dirname, '../../data/')


const engineUser = {

    read_FindByPK_db: function (name_table, columm_table_id){
        let registro = db[name_table].findByPk(columm_table_id, {
           
                     });
        return registro;
    }, 
    read_FindByPK_include: function (name_table, columm_table_id){
        let registro = db[name_table].findByPk(columm_table_id, {
            include: [ {association:"province"}]
                     });
        return registro;
                    },
    read_table_db: function (name_table) {
        return db[name_table].findAll()
           
     
    },
    edit_columm_db_user: function(name_table, object_modified) {
        db[name_table].update(object_modified, {
                    where: {
                        customer_id: object_modified.customer_id
                    },
                    include: [{association:"province"}]
                },)
        return 201;    
    }, 
    delete_columm_db_user: function(name_table, columm_table_id) {
        db[name_table].destroy( {
                    where: {
                        user_id: columm_table_id
                    },
                },)
        return 201;    
    }, 


}

    


module.exports = engineUser