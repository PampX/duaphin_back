class User{
    constructor(object){
        this.id = object.id
        this.username = object.username;
        this.password = object.password;
        this.stats = object.stats;
    }
}


module.exports = User;