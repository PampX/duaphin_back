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




module.exports = {
    bd_getAllItems : bd_getAllItems
};