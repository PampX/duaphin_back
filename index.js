const express = require('express');
const app = express();
const ItemController = require('./controller/ItemController.js')

app.get('/items', (req,res) => {
    const items = ItemController.getAllItems();

    res.send(items);
})

app.listen(8080, () => {
    console.log("Server started on port 8080");
})