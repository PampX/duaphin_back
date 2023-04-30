const Item = require('../model/Item.js')
const connexion = require('../connexionBD.js');


function getAllItems(req,res){
    return connexion.bd_getAllItems(req,res);
}

function addItem(newItem,req,res){
    connexion.bd_addItem(newItem,req,res)
}

function deleteItem(idItem,req,res){
    connexion.bd_deleteItem(idItem,req,res)
}

function updateItem(updateItem,idItem,req,res) {
    connexion.bd_updateItem(updateItem,idItem,req,res)
}

module.exports = {
    getAllItems: getAllItems,
    addItem: addItem,
    deleteItem:deleteItem,
    updateItem:updateItem
};