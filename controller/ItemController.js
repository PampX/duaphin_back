const Item = require('../model/Item.js')
const itemQueries = require('../database/mysql/itemQueries.js');


function getAllItems(req,res){
    return itemQueries.bd_getAllItems(req,res);
} 

function getAllItemsForUser(id,req,res){
    return itemQueries.bd_getAllItemsForUser(id,req,res);
}

function addItem(newItem,req,res){
    itemQueries.bd_addItem(newItem,req,res)
}

function deleteItem(idItem,req,res){
    itemQueries.bd_deleteItem(idItem,req,res)
}

function updateItem(updateItem,idItem,req,res) {
    itemQueries.bd_updateItem(updateItem,idItem,req,res)
}

module.exports = {
    getAllItems: getAllItems,
    getAllItemsForUser:getAllItemsForUser,
    addItem: addItem,
    deleteItem:deleteItem,
    updateItem:updateItem
};