class User{
    constructor(object){
        this.id = object.id
        this.name = object.name;
        this.password = object.password;
        this.stats = object.stats;
    }
}


module.exports = User;