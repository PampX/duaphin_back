const User = require('../model/User.js')
const connexion = require('../connexionBD.js')

function getAllUsers(req,res){
    return connexion.bd_getAllUsers(req,res);
}
function addUser(newUser,req,res){
    connexion.bd_addUser(newUser,req,res)
}

function deleteUser(idUser,req,res){
    connexion.bd_deleteUser(idUser,req,res)
}

function updateUser(updateUser,idUser,req,res) {
    connexion.bd_updateUser(updateUser,idUser,req,res)
}

module.exports = {
    getAllUsers: getAllUsers,
    addUser:addUser,
    deleteUser:deleteUser,
    updateUser:updateUser
}