const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'duaphinbd'
})

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database!');
});

/**
 * Item
 */
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
            callback(err, null);
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

/**
 * User
 */
function bd_getAllUsers(callback) {
    const query = 'SELECT id,name FROM users';

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            callback(err, null);
            return;
        }
        callback(null, results);
    });
}
function bd_addUser(newUser, callback) {
    const query = 'INSERT INTO users SET ?';

    connection.query(query, newUser, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            callback(err, null);
            return;
        }
        callback(null, results);
    });
}

function bd_deleteUser(idUser, callback) {
    const query = 'DELETE FROM users WHERE id = ?';
    connection.query(query, idUser, (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            callback(err, null);
            return;
        }
        if (result.affectedRows === 0) {
            callback('User not found', null);
            return;
        }
        callback(null, `User with ID ${idUser} deleted successfully`);
    });
}

function bd_updateUser(updateUser, idUser, callback) {
    const query = 'UPDATE users SET ? WHERE id = ?';
    connection.query(query, [updateUser, idUser], (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            callback(err, null);
            return;
        }
        if (result.affectedRows === 0) {
            callback('User not found', null);
            return;
        }
        callback(null, `User with ID ${idUser} updated successfully`);
    });
}


module.exports = {
    // Items
    bd_getAllItems:bd_getAllItems,
    bd_addItem:bd_addItem,
    bd_deleteItem:bd_deleteItem,
    bd_updateItem:bd_updateItem,
    // Users
    bd_getAllUsers:bd_getAllUsers,
    bd_addUser:bd_addUser,
    bd_deleteUser:bd_deleteUser,
    bd_updateUser:bd_updateUser
};