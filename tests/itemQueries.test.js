// npm test itemQueries.test.js
const itemQueries = require('../database/mysql/itemQueries')
//const { connection } = require('../database/mysql/connexionDB')

const numberOfItems = 50;

describe('bd_getAllItems', () =>{
    beforeAll(() =>{
        //connection.connect();
    })

    afterAll(() =>{
      //  connection.end()
    })

    it('should return an array of '+ numberOfItems + ' items',(done) => {
        itemQueries.bd_getAllItems((err, results) => {
            expect(err).toBeNull()
            expect(Array.isArray(results)).toBe(true)
            expect(results).toHaveLength(numberOfItems);
            done()
        })
    
    })
})
describe('bd_getAllItemsForUser', () =>{
    beforeAll(() =>{
       // connection.connect();
    })

    afterAll(() =>{
       // connection.end()
    })

    it('should return an array of 3 items',(done) => {
        itemQueries.bd_getAllItemsForUser(10,(err, results) => {
            expect(err).toBeNull()
            expect(Array.isArray(results)).toBe(true)
            expect(results).toHaveLength(3);
            done()
        })
    
    })

    
})
describe('bd_addItem', () =>{
    beforeAll(() =>{
       // connection.connect();
    })

    afterAll(() =>{
       // connection.end()
    })

    it('should return an array of '+numberOfItems+1+' items',(done) => {
        const newItem = {
            'id':99999,
            'name':'test',
            'description':'test add_item',
            'rarity':'epic',
            'path':'test.png'
        }
        itemQueries.bd_addItem(newItem,(err, results) => {
            expect(err).toBeNull()
            done()
        })
        itemQueries.bd_getAllItems((err,results) => {
            expect(err).toBeNull()
            expect(Array.isArray(results)).toBe(true)
            expect(results).toHaveLength(numberOfItems+1);
            done()
        })
    
    })    
})
describe('bd_updateItem', () =>{
    beforeAll(() =>{
       // connection.connect();
    })

    afterAll(() =>{
       // connection.end()
    })

    it('should return an array of one modified items then give back the old info',(done) => {
        const oldItem = {
            'id':99999,
            'name':'update',
            'description':'test add_item',
            'rarity':'epic',
            'path':'test.png'
        }
        const newItem = {
            'id':99999,
            'name':'test',
            'description':'test add_item',
            'rarity':'epic',
            'path':'test.png'
        }
        itemQueries.bd_updateItem(newItem,newItem.id,(err, results) => {
            expect(err).toBeNull()
            done()
        })
        itemQueries.bd_updateItem(oldItem,oldItem.id,(err,results) => {
            expect(err).toBeNull()
            done()

        })
    
    })    
})
describe('bd_deleteItem', () =>{
    beforeAll(() =>{
       // connection.connect();
    })

    afterAll(() =>{
       // connection.end()
    })

    it('should return an array of '+numberOfItems+' items',(done) => {
        const item = {
            'id':99999,
            'name':'test',
            'description':'test add_item',
            'rarity':'epic',
            'path':'test.png'
        }
        itemQueries.bd_deleteItem(item.id,(err, results) => {
            expect(err).toBeNull()
            done()
        })
        itemQueries.bd_getAllItems((err,results) => {
            expect(err).toBeNull()
            expect(Array.isArray(results)).toBe(true)
            expect(results).toHaveLength(numberOfItems);
            done()
        })
    
    })    
})