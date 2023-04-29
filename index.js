const express = require('express');
const app = express();
const ItemController = require('./controller/ItemController.js')

app.get('/items', (req, res) => {
    ItemController.getAllItems((err, items) => {
        if (err) {
            console.error('Error fetching items:', err);
            res.status(500).send('Error fetching items from database.');
            return;
        }
        res.send(items);
    });
});

app.listen(8080, () => {
    console.log("Server started on port 8080");
})