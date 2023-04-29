const Item = require('../model/Item.js')
const connexion = require('../connexionBD.js');


function getAllItems(req,res) {
    /*return new Item({
        id : "AAA",
        name : "Poussin",
        description : "Petit poussin",
        rarity : Item.rarities.EPIC,
        path: "./data/item/pousin_AAA.png"
    })
    */
    return connexion.bd_getAllItems(req,res);
}


module.exports = {
    getAllItems: getAllItems
};