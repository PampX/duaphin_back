const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = express();
const ItemController = require('./controller/ItemController.js');
const UserController = require('./controller/UserController.js')


// middleware pour extraire les donnée JSON
app.use(bodyParser.json())

/**
 * Items
 */
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


app.post('/addItem', (req,res) => {
    const newItem = req.body;
    ItemController.addItem(newItem,(err,item) => {
        if (err) {
            console.error('Error fetching items:', err);
            res.status(500).send('Error adding items from database.');
            return;
        }
        res.send(item);
    });
});

app.delete('/deleteItem',(req,res) => {
    const idItemToDelete = req.body.id;
    ItemController.deleteItem(idItemToDelete,(err,item) => {
        if (err) {
            console.error('Error fetching items:', err);
            res.status(500).send('Error deleting items from database.');
            return;
        }
        res.send(item);
    });
})

app.patch('/updateItem/:idItem',(req,res) => {
    const updateItem = req.body;
    const idItem = req.params.idItem;
    ItemController.updateItem(updateItem,idItem,(err,item) => {
        if (err) {
            console.error('Error fetching items:', err);
            res.status(500).send('Error deleting items from database.');
            return;
        }
        res.send(item);
    });
})


/**
 * Users
 */
app.get('/users', (req, res) => {
    UserController.getAllUsers((err, users) => {
        if (err) {
            console.error('Error fetching users:', err);
            res.status(500).send('Error fetching users from database.');
            return;
        }
        res.send(users);
    });
});

app.post('/addUser', (req,res) => {
    const newUser = req.body;
    UserController.addUser(newUser,(err,user) => {
        if (err) {
            console.error('Error fetching users:', err);
            res.status(500).send('Error adding users from database.');
            return;
        }
        res.send(user);
    });
});
app.delete('/deleteUser',(req,res) => {
    const idUserToDelete = req.body.id;
    UserController.deleteUser(idUserToDelete,(err,User) => {
        if (err) {
            console.error('Error fetching Users:', err);
            res.status(500).send('Error deleting Users from database.');
            return;
        }
        res.send(User);
    });
})

app.patch('/updateUser/:idUser',(req,res) => {
    const updateUser = req.body;
    const idUser = req.params.idUser;
    UserController.updateUser(updateUser,idUser,(err,User) => {
        if (err) {
            console.error('Error fetching Users:', err);
            res.status(500).send('Error deleting Users from database.');
            return;
        }
        res.send(User);
    });
})

app.post('/signUp',async (req,res) => {
    const {username, password} = req.body;
    const hashedPassword = await bcrypt.hash(password,10)
    UserController.signUp(username,hashedPassword,(err,User) => {
        if (err) {
            console.error('Error signUp User:', err);
            res.status(500).send('Error SignUp User.');
            return;
        }
        res.send(User);
    });
})



app.listen(8080, () => {
    console.log("Server started on port 8080");
})