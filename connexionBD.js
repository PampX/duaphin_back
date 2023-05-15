const mysql = require('mysql');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

dotenv.config()

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
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
    const query = 'SELECT id,username,stats FROM users';

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

function bd_signUp(username, hashedPassword, callback) {
    const query = 'SELECT id FROM users where username = ?';
    connection.query(query, [username], (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            callback(err, null);
            return;
        }
        if (result.length === 0) {
            console.log("l'utilisateur " + username + " n'est pas dans la base de donnée.");
            bd_createNewUser(username, hashedPassword, callback)
            console.log("l'utilisateur " + username + " a été créé !");
            return;
        }
        else{
            console.log("Utilisateur est déjà dans la base de donnée.")
            callback(null, `User already exists please choose another username`);
        }
    });
}

function bd_createNewUser(username, hashedPassword, callback) {
    // NEW USERS WITH STATS
    const query = 'INSERT INTO users (username, password,isAdmin) VALUES (?,?,?);';
    connection.query(query, [username, hashedPassword, 0], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            callback(err, null);
            return;
        }
        const idUser = results.insertId;
        // NEW STATS 
        const querybis = "INSERT INTO stats (id,goldQty,lastChestOpened,signUpDate) VALUES (?,?,DATE_SUB(NOW(), INTERVAL 24 HOUR),NOW()) "
        connection.query(querybis, [idUser,1000], (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                callback(err, null);
                return;
            }
            callback(null, results);
        })
    });
}

function bd_signIn(username,password,session,callback){
    const query = 'SELECT password,id FROM users WHERE username = ?'
    connection.query(query,[username], async (err,result) =>{
        if (err) {
            console.error('Error executing query:', err);
            callback(err, null);
            return;
        }
        if (result.length === 0) {
            callback(null,'Invalid username or password')
        }
        else{
            const isPasswordValid = await bcrypt.compare(password,result[0].password);
        if(!isPasswordValid){
            callback(null,'Invalid username or password')
        }
        else{
            const token = jwt.sign({ userId: result[0].id },process.env.SECRET_KEY,{ expiresIn: '1h'})
            session.token = token;
            callback(null,{ message:"Authentication succeful", token})
        }
        }
    })
}

module.exports = {
    // Items
    bd_getAllItems: bd_getAllItems,
    bd_addItem: bd_addItem,
    bd_deleteItem: bd_deleteItem,
    bd_updateItem: bd_updateItem,
    // Users
    bd_getAllUsers: bd_getAllUsers,
    bd_addUser: bd_addUser,
    bd_deleteUser: bd_deleteUser,
    bd_updateUser: bd_updateUser,
    bd_signUp: bd_signUp,
    bd_signIn: bd_signIn,

};