const usersDB = {
    users:require('../model/user.json'),
    setUsers: function (data) {this.user = data},
}

const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const handleNewUser = async(req, res) => {
    const {user,pwd} = req.body;

    if(!user || !pwd) return res.status(400).json({'message': 'Username and password must be provided required'});

    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(pwd, 10)

        //store the new user
        const newUser ={'username': user, "password": hashedPwd}

        usersDB.setUsers([...usersDB.users, newUser])
        await fsPromises.writeFile(path.join(__dirname, '..', 'model', 'user.json'),
        JSON.stringify(usersDB.users))

        console.log(usersDB.users);
        res.status(201).json({success: `New user ${user} created!`})


    }catch (err) {
        res.status(500).json({'message': err.message});
    }    
}


module.exports = {handleNewUser}
