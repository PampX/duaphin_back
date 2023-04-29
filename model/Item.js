class Item {
    static rarities = {
        COMMON:"common",
        UNCOMMON:"uncommon",
        RARE:"rare",
        EPIC:"epic",
        LEGENDARY:"legendary"
    };

    constructor(object){
        this.id = object.id;
        this.name = object.name; 
        this.description = object.description
        this.rarity = object.rarity;
        this.path = object.path;
    }
}

module.exports = Item;