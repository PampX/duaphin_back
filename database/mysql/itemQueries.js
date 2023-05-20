const {connection} = require('./connexionDB.js');

function bd_getAllItems(callback) {
    const query = 'SELECT * FROM items';

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            callback(err, null);
            return;
        }
        callback(null, results);
    });
}

function bd_addItem(newItem, callback) {
    const query = 'INSERT INTO items SET ?';

    connection.query(query, newItem, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            callback(err, {message: err.message});
            return;
        }
        callback(null, results);
    });
}

function bd_deleteItem(idItem, callback) {
    const query = 'DELETE FROM items WHERE id = ?';
    connection.query(query, idItem, (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            callback(err, null);
            return;
        }
        if (result.affectedRows === 0) {
            callback('Item not found', null);
            return;
        }
        callback(null, `Item with ID ${idItem} deleted successfully`);
    });
}

function bd_updateItem(updateItem, idItem, callback) {
    const query = 'UPDATE items SET ? WHERE id = ?';
    connection.query(query, [updateItem, idItem], (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            callback(err, null);
            return;
        }
        if (result.affectedRows === 0) {
            callback('Item not found', null);
            return;
        }
        callback(null, `Item with ID ${idItem} updated successfully`);
    });
}

module.exports = {
    bd_getAllItems: bd_getAllItems,
    bd_addItem: bd_addItem,
    bd_deleteItem: bd_deleteItem,
    bd_updateItem: bd_updateItem,
}