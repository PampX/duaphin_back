const Item = require('../model/Item.js')
    
    
    function getAllItems() {
        return new Item({
            id : "AAA",
            name : "Poussin",
            description : "Petit poussin",
            rarity : Item.rarities.EPIC,
            path: "./data/item/pousin_AAA.png"
        })
    }


module.exports = {
    getAllItems: getAllItems
};