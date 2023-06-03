// npm test userQueries.test.js
const userQueries = require('../database/mysql/userQueries')
//const { connection } = require('../database/mysql/connexionDB')

let numberOfUsers = 0
// Basic queries 
describe('bd_getAllUsers', () =>{
    beforeAll(() =>{
        //connection.connect();
    })

    afterAll(() =>{
      //  connection.end()
    })

    it('should return an array of users',(done) => {
        userQueries.bd_getAllUsers((err, results) => {
            expect(err).toBeNull()
            expect(Array.isArray(results)).toBe(true)
            numberOfUsers = results.length
            done()
        })
    
    })
})
describe('bd_addUser', () =>{
    beforeAll(() =>{
       // connection.connect();
    })

    afterAll(() =>{
       // connection.end()
    })

    it('should return an array of users',(done) => {
        const newUser = {
            'id':99999,
            'username':'test',
            'password':'test',
            'isAdmin':'0',
        }
        userQueries.bd_addUser(newUser,(err, results) => {
            expect(err).toBeNull()
            done()
        })
        userQueries.bd_getAllUsers((err,results) => {
            expect(err).toBeNull()
            expect(Array.isArray(results)).toBe(true)
            expect(results).toHaveLength(numberOfUsers+1);
            done()
        })
    
    })    
})
describe('bd_updateUser', () =>{
    beforeAll(() =>{
       // connection.connect();
    })

    afterAll(() =>{
       // connection.end()
    })

    it('should return an array of one modified users then give back the old info',(done) => {
        const newUser = {
            'id':99999,
            'username':'test bis',
            'password':'test',
            'isAdmin':'0',
        }
        const oldUser = {
            'id':99999,
            'username':'test',
            'password':'test',
            'isAdmin':'0',
        }
        userQueries.bd_updateUser(newUser,newUser.id,(err, results) => {
            expect(err).toBeNull()
            done()
        })
        userQueries.bd_updateUser(oldUser,oldUser.id,(err,results) => {
            expect(err).toBeNull()
            done()

        })
    
    })    
})
describe('bd_deleteUser', () =>{
    beforeAll(() =>{
       // connection.connect();
    })

    afterAll(() =>{
       // connection.end()
    })

    it('should return an array of users',(done) => {
        const user = {
            'id':99999,
            'username':'test',
            'password':'test',
            'isAdmin':'0',
        }
        userQueries.bd_deleteUser(user.id,(err, results) => {
            expect(err).toBeNull()
            done()
        })
        userQueries.bd_getAllUsers((err,results) => {
            expect(err).toBeNull()
            expect(Array.isArray(results)).toBe(true)
            expect(results).toHaveLength(numberOfUsers);
            done()
        })
    
    })    
})

// Advanced Queries
let id = 0;

describe('bd_signUp and bd_deleteAccount', () => {
    beforeAll(async () => {
        const username = "test_signUp" + Math.floor(Math.random() * 100_000);
        const password = "test";
        
        await new Promise((resolve, reject) => {
            userQueries.bd_signUp(username, password, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    id = results.id;
                    resolve();
                }
            });
        });
    });

    it('should create a new user', (done) => {
        userQueries.bd_getAllUsers((err, results) => {
            expect(err).toBeNull();
            expect(Array.isArray(results)).toBe(true);
            expect(results).toHaveLength(numberOfUsers);
            done();
        });
    },30_000);
});
describe('bd_deleteAccount', () => {
    beforeAll(async () => {
        const username = "test_signUp" + Math.floor(Math.random() * 100_000);
        const password = "test";
        
        await new Promise((resolve, reject) => {
            userQueries.bd_signUp(username, password, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    id = results.id;
                    resolve();
                }
            });
        });
    });

    afterAll(async () => {
        await new Promise((resolve, reject) => {
            userQueries.bd_deleteAccount(id, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    });

    it('should create a new user', (done) => {
        userQueries.bd_getAllUsers((err, results) => {
            expect(err).toBeNull();
            expect(Array.isArray(results)).toBe(true);
            expect(results).toHaveLength(numberOfUsers);
            done();
        });
    },30_000);

    it('should delete the account', (done) => {
        userQueries.bd_getAllUsers((err, results) => {
            expect(err).toBeNull();
            expect(Array.isArray(results)).toBe(true);
            // Expect the user to be deleted
            expect(results.some(user => user.id === id)).toBe(false);
            done();
        });
    },30_000);
});