const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { connection } = require('./connexionDB.js');

function bd_getAllUsers(callback) {
    const query = 'SELECT id,username FROM users';

    connection.query(query, (err, results) => {
        if (err) {
            ////console.error('Error executing query:', err);
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
            ////console.error('Error executing query:', err);
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
            ////console.error('Error executing query:', err);
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
            ////console.error('Error executing query:', err);
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
            ////console.error('Error executing query:', err);
            callback(err, null);
            return;
        }
        if (result.length === 0) {
            ////console.log("l'utilisateur " + username + " n'est pas dans la base de donnée.");
            const id = bd_createNewUser(username, hashedPassword, callback)
            ////console.log("l'utilisateur " + username + " a été créé !");
            callback(null, { message: 'Account created successfully! You can now Sign In.', id: id })
            return;
        }
        else {
            ////console.log("Utilisateur est déjà dans la base de donnée.")
            callback(null, { message: 'This username already exists. Please choose another username.' });
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
        connection.query(querybis, [idUser, 1000], (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                callback(err, null);
                return;
            }
            return idUser;
        })
    });
}

function bd_deleteAccount(id, callback) {
    const query_stats = "DELETE FROM stats WHERE id = ?";
    connection.query(query_stats, [id], (err, results_stats) => {
        if (err) {
            callback(err, null);
            return;
        }
        if (results_stats.affectedRows === 0) {
            callback(err, {message:"user doesn't exist in stats"});
            return;
        }
        const query_users = "DELETE FROM users WHERE id = ?";
        connection.query(query_users, [id], (err, results_users) => {
        if (err) {
            callback(err, null);
            return;
        }
        if (results_users.affectedRows === 0) {
            callback(err, {message:"user doesn't exist in users"});
            return;
        }
        callback(null, {message: "account of user "+id+" has been delete"});
    });
    });
    
}

function bd_signIn(username, password, session, callback) {
    const query = 'SELECT password,id FROM users WHERE username = ?'
    connection.query(query, [username], async (err, result) => {
        if (err) {
            ////console.error('Error executing query:', err);
            callback(err, null);
            return;
        }
        ////console.log(result);
        ////console.log(result.length);
        ////console.log(result.length === 0);

        if (result.length === 0) {
            callback(null, { message: 'Invalid username or password' })
        }
        else {
            const isPasswordValid = await bcrypt.compare(password, result[0].password);
            if (!isPasswordValid) {
                callback(null, { message: 'Invalid username or password' })
            }
            else {
                const token = jwt.sign({ userId: result[0].id, isAdmin: result[0].isAdmin }, process.env.SECRET_KEY, { expiresIn: '1h' })
                session.token = token;
                callback(null, { message: "Authentication successful", token })
            }
        }
    })
}

function bd_openChest(id, callback) {
    const query = 'SELECT lastChestOpened from stats WHERE id = ?'
    connection.query(query, [id], async (err, result) => {
        if (err) {
            ////console.error('Error executing query:', err);
            callback(err, null);
            return;
        }
        if (result.length === 0) {
            callback(null, { message: 'Stats not found' });
            return;
        }
        // Vérifier si la date est supérieure à now + 1 minute
        const now = new Date();
        if (result[0].lastChestOpened < now) {
            const now = new Date();
            const oneMinuteLater = new Date(now.getTime() + 60000); // Ajouter 1 minute

            const query = 'UPDATE stats SET goldQty = goldQty + 10, lastChestOpened = ? WHERE id = ?';
            connection.query(query, [oneMinuteLater, id], async (err, result) => {
                if (err) {
                    ////console.error('Error executing query:', err);
                    callback(err, null);
                    return;
                }
                callback(null, { message: 'Stats updated' });
            });
        }
        else {
            // La date est inférieure ou égale à now + 1 minute, ne rien faire
            callback(null, { message: 'Stats not updated,you have to wait.'});
        }
    })
}

async function bd_buyNormalDeck(id, callback) {
    let doesHeCan = await canUserPay(id)
    if (doesHeCan) {
        let item = await chooseRandomItem();
        let heHasIt = await doesUserAlreadyHaveThisItem(item.id, id);

        if (heHasIt) {
            giveUserSomeGold(item.rarity, id, callback);
        }
        else {
            giveUserItem(item.id, id, callback);
        }
    } else {
        callback(null,{message:"User can't afford this deck"})
    }
}

function canUserPay(id) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT goldQty FROM stats WHERE id = ?';
        connection.query(query, [id], (err, result) => {
            if (err) {
                //console.error('Error executing query:', err);
                reject(err);
            } else {
                if (result.length === 0) {
                    reject("There is a probleme about gold qty");

                } else if (result[0].goldQty > 100) {
                    userPayingGold(id, 100)
                    resolve(true)
                }
                else {
                    //console.log("User can't afford this deck ");
                    resolve(false);
                }
            }
        });
    });
}
function userPayingGold(id, goldQty) {
    const query = 'UPDATE stats SET goldQty = goldQty - ? WHERE id = ?';
    connection.query(query, [goldQty, id], async (err, result) => {
        if (err) {
            //console.error('Error executing query:', err);
            callback(err, null);
            return;
        }
        //console.log('Stats updated user paid');
    });
}

function chooseRandomItem() {
    return new Promise((resolve, reject) => {
        const rarity = selectRarity()
        const query = 'SELECT * from items WHERE rarity = ?'
        connection.query(query, [rarity], async (err, result) => {
            if (err) {
                ////console.error('Error executing query:', err);
                reject(err)
                return;
            }
            if (result.length === 0) {
                reject('Items not found');
                return;
            }
            // on a notre liste d'item ayant la valeur de rareté chosi au hasard
            const rdIndex = Math.floor(Math.random() * result.length)
            resolve(result[rdIndex])
        })
    })
}


function doesUserAlreadyHaveThisItem(idItem, idUser) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM collection WHERE id_user = ? AND id_item = ?';
        connection.query(query, [idUser, idItem], (err, result) => {
            if (err) {
                ////console.error('Error executing query:', err);
                reject(err);
            } else {
                if (result.length === 0) {
                    ////console.log("User doesn't have this item");
                    resolve(false);
                } else {
                    ////console.log("User already has this item");
                    resolve(true);
                }
            }
        });
    });
}

function giveUserSomeGold(rarity, id, callback) {
    const worthRarityInGold = {
        common: 10,
        uncommon: 15,
        rare: 20,
        epic: 30,
        legendary: 50,
    }
    const query = 'UPDATE stats SET goldQty = goldQty + ? WHERE id = ?';
    connection.query(query, [worthRarityInGold[rarity], id], async (err, result) => {
        if (err) {
            ////console.error('Error executing query:', err);
            callback(err, null);
            return;
        }
        callback(null, {message:'Stats updated +gold already item'});
    });
}

function giveUserItem(idItem, idUser, callback) {
    const query = 'INSERT INTO collection (id_item,id_user) VALUES (?,?)';

    connection.query(query, [idItem, idUser], (err, results) => {
        if (err) {
            ////console.error('Error executing query:', err);
            callback(err, null);
            return;
        }
        callback(null, {message:"item is add to user's collection"});
    });
}


function selectRarity() {
    const rarity = ["common", "uncommon", "rare", "epic", "legendary"]
    //const rarityWeights = [52,26,13,6,3]
    const rarityWeights = [52, 26, 13, 6, 1]
    // const rarityWeightsluxe = [0,0,50,30,20]

    let rd = 0
    // sécurité pour éviter des choses étranges
    while (rd === 0) {
        rd = Math.floor(Math.random() * sumArray(rarityWeights))
    }
    let index = 0
    while (rd >= 0) {
        rd -= rarityWeights[index]
        index++
    }
    return rarity[index - 1]
}
function sumArray(array) {
    return array.reduce((acc, current) => acc + current, 0);
}

function bd_getUserStats(idUser, callback) {
    ////console.log("stats of user with id : " + idUser)
    const query = 'SELECT goldQty,signUpDate,lastChestOpened FROM stats WHERE id = ?';

    connection.query(query, [idUser], (err, results) => {
        if (err) {
            ////console.error('Error executing query:', err);
            callback(err, null);
            return;
        }
        callback(null, results[0]);
    });
}


module.exports = {
    bd_getAllUsers: bd_getAllUsers,
    bd_addUser: bd_addUser,
    bd_deleteUser: bd_deleteUser,
    bd_updateUser: bd_updateUser,
    bd_signUp: bd_signUp,
    bd_deleteAccount:bd_deleteAccount,
    bd_signIn: bd_signIn,
    bd_openChest: bd_openChest,
    bd_buyNormalDeck: bd_buyNormalDeck,
    bd_getUserStats: bd_getUserStats,

};