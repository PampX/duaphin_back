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

function signUp(username,hashedPassword,req,res){
    connexion.bd_signUp(username, hashedPassword,req,res)
}

function signIn(username,Password,session,req,res){
    connexion.bd_signIn(username,Password,session,req,res)
}

function openChest(id,req,res){
    connexion.bd_openChest(id,req,res)
}

function buyNormalDeck(id,req,res){
    connexion.bd_buyNormalDeck(id,req,res)
}

function getUserStats(id,req,res){
    connexion.bd_getUserStats(id,req,res)
}

module.exports = {
    getAllUsers: getAllUsers,
    addUser:addUser,
    deleteUser:deleteUser,
    updateUser:updateUser,
    signUp:signUp,
    signIn:signIn,
    openChest:openChest,
    buyNormalDeck:buyNormalDeck,
    getUserStats:getUserStats,
}