const User = require('../model/User.js')
const connexion = require('../connexionBD.js')

function getAllUsers(req,res){
    return connexion.bd_getAllUsers(req,res);
}

module.exports = {
    getAllUsers: getAllUsers
}