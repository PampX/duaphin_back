const userQueries = require('../database/mysql/userQueries.js')


function getAllUsers(req,res){
    return userQueries.bd_getAllUsers(req,res);
}
function addUser(newUser,req,res){
    userQueries.bd_addUser(newUser,req,res)
}

function deleteUser(idUser,req,res){
    userQueries.bd_deleteUser(idUser,req,res)
}

function updateUser(updateUser,idUser,req,res) {
    userQueries.bd_updateUser(updateUser,idUser,req,res)
}

function signUp(username,hashedPassword,req,res){
    userQueries.bd_signUp(username, hashedPassword,req,res)
}

function signIn(username,Password,session,req,res){
    userQueries.bd_signIn(username,Password,session,req,res)
}

function openChest(id,req,res){
    userQueries.bd_openChest(id,req,res)
}

function buyNormalDeck(id,req,res){
    userQueries.bd_buyNormalDeck(id,req,res)
}

function getUserStats(id,req,res){
    userQueries.bd_getUserStats(id,req,res)
}

function deleteAccount(id,req,res){
    userQueries.bd_deleteAccount(id,req,res)
}

module.exports = {
    getAllUsers: getAllUsers,
    addUser:addUser,
    deleteUser:deleteUser,
    updateUser:updateUser,
    signUp:signUp,
    deleteAccount:deleteAccount,
    signIn:signIn,
    openChest:openChest,
    buyNormalDeck:buyNormalDeck,
    getUserStats:getUserStats,
}