const express = require('express');
const session = require('express-session')
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const app = express();
const ItemController = require('./controller/ItemController.js');
const UserController = require('./controller/UserController.js');

dotenv.config()

const cors = require('cors')
app.use(cors({ origin: 'http://localhost:3000' }));

//console.log("http://localhost:3000");
// middleware pour extraire les donnée JSON
app.use(bodyParser.json())

// midlleware vérification du token 
function verifyToken(req,res,next) {
    // Récupérer le token de la session
    const token = req.session.token;

    // Vérifier la validité du token
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        // Le token est valide
        req.userId = decoded.userId;
        next();
    } catch (err) {
        // Le token est invalide ou a expiré
        res.status(401).send('Token is invalid')
    }
}

// configuration de la session 
app.use(session({
    secret: process.env.SECRET_KEY,
    resave:false,
    saveUninitialized:false
}));

/**
 * Items
 */
app.get('/items', (req, res) => {
    ItemController.getAllItems((err, users) => {
        if (err) {
            //console.error('Error fetching items:', err);
            res.status(500).send('Error fetching items from database.');
            return;
        }
        res.send(users);
    });
});

app.get('/itemsOfUser/:token', (req, res) => {
    // à mettre dans une fonction 
    const token = req.params.token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    //console.log(decoded);
    const id = decoded.userId;
    //console.log(id);
    ItemController.getAllItemsForUser(id,(err, users) => {
        if (err) {
            //console.error('Error fetching items:', err);
            res.status(500).send('Error fetching items from database.');
            return;
        }
        res.send(users);
    });
});

app.post('/addItem', (req,res) => {
    const newItem = req.body;
    ItemController.addItem(newItem,(err,item) => {
        if (err) {
            //console.error('Error fetching items:', err);
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
            //console.error('Error fetching items:', err);
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
            //console.error('Error fetching items:', err);
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
            //console.error('Error fetching users:', err);
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
            //console.error('Error fetching users:', err);
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
            //console.error('Error fetching Users:', err);
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
            //console.error('Error fetching Users:', err);
            res.status(500).send('Error deleting Users from database.');
            return;
        }
        res.send(User);
    });
})

app.patch('/deleteAccount/:idUser',(req,res) => {
    const idUser = req.params.idUser;
    UserController.deleteAccount(idUser,(err,User) => {
        if (err) {
            //console.error('Error fetching Users:', err);
            res.status(500).send('Error deleting Users from database.');
            return;
        }
        res.send(User);
    });
})

app.get('/stats',(req, res) => {
    const token = req.headers.token;
    //console.log(token);
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    //console.log(decoded);
    const id = decoded.userId;
    //console.log(id);
    UserController.getUserStats(id,(err, users) => {
        if (err) {
            //console.error('Error get stats of users:', err);
            res.status(500).send('Error get stats of users: '+err);
            return;
        }
        //console.log(users);
        res.send(users);
    });
});

app.post('/signUp',async (req,res) => {
    const {username, password} = req.body;
    const hashedPassword = await bcrypt.hash(password,10)
    UserController.signUp(username,hashedPassword,(err,User) => {
        if (err) {
            //console.error('Error signUp User:', err);
            res.status(500).send('Error SignUp User.');
            return;
        }
        res.send(User);
    });
})

app.post('/signIn', async(req,res) =>{
    const {username, password} = req.body;
    UserController.signIn(username,password,req.session,(err,User) => {
        if (err) {
            //console.error('Error signIp User:', err);
            res.status(500).send('Error SignIp User.');
            return;
        }
        res.send(User);
    })
})

app.patch('/openChest', (req,res)=>{
    const token = req.headers.token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    //console.log(decoded);
    const id = decoded.userId
    
    UserController.openChest(id,(err,User) => {
        if (err) {
            console.error('Error openChest :', err);
            res.status(500).send('Error openChest User.');
            return;
        }
        res.send(User);
    })
})

// verifyToken à mettre
app.patch('/buyNormalDeck', (req,res)=>{
    const token = req.body.token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    //console.log(decoded);
    const id = decoded.userId
    UserController.buyNormalDeck(id,(err,user)=>{
        if (err) {
            //console.error('Error buyNormalDeck :', err);
            res.status(500).send('Error buyNormalDeck User.');
            return;
        }
        res.send(user);
    
    })
})

app.listen(8080, () => {
    console.log("Server started on port 8080");
})
