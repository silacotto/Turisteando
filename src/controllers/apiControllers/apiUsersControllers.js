const db = require('../../../database/models');
//const { get } = require('../../routes/routesApi/apiUsers');
const sequelize = db.sequelize;

const apiUsersControllers = {

list_register: (req,res)=>{
    db.UserRegister.findAll()
        .then(userregister => {
            return res.status(200).json({
                meta: {
                    total: userregister.length,
                    status: 200,
                    url: "http://localhost:5020/api/users/register"
                },
                data: userregister
                // data: {
                //     id: user_id,
                //     name: userregister.user,
                //     email: userregister.email
                // }
            })
        })
},

list_customers: (req,res)=>{
    db.Customers.findAll({
       include:[{association:"province"}/*,{association:"userRegister"}*/],
       })
        .then(customers=>{
            return res.status(200).json({
                meta:
                {   
                    total: customers.length,
                    status: 200,
                    url: "http://localhost:5020/api/users/customers"
                },
                data: customers,
            })
        })
},

detail_register: (req,res)=>{
    let user_id = req.params.id
    db.UserRegister.findByPk(user_id)
        .then(user => {
            res.status(200).json({
                meta: {
                    status: 200,
                    url: "http://localhost:5020/api/users/register/:id"
                },
                data:{
                    id: user.user_id,
                    name:user.user,
                    email: user.email,
                    url_avatar:"http://localhost:5020/images/users/avatars/"+user.avatar
                }
             

            })
        })
        .catch( error => console.error(error));
},

detail_customers: (req,res)=>{
    let user_id = req.params.id
        db.Customers.findByPk(user_id, {
            include:[{association:"province"}],
        })
        .then(customer=>{
            res.status(200).json({
                meta:
                    {   
                    status: 200,
                    url: "http://localhost:5020/api/users/customers/:id"
                    },
                data: customer,
            })
        })
        .catch( error => console.error(error));
},



last_customer: (req,res)=>{
    db.Customers.findAll({
        include:[{association:"userRegister"}/*,{association:"userRegister"}*/],
        limit:1,
        order: [
            ['customer_id', 'DESC'],
        ]
   
    })
        .then(customer=>{
            return res.json({
                meta:{
                    method: "get",
                    status: 200,
                    url: "http://localhost:5020/api/users/ultimo/customer",
                   },
                data:customer,
                url_avatar: "http://localhost:5020/images/users/avatars/"
            
            })
        })
   
}

}
module.exports = apiUsersControllers;