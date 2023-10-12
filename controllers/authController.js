const usersDB = {
    users:require('../model/user.json'),
    setUsers: function (data) {this.user = data},
}


const bcrypt = require('bcrypt');
const handleLogin = async (req, res) => {
    const {user, pwd} = req.body
    if(!user || !pwd) return res.status(400).json({"message": " in valid username and password"})
    const foundUser = usersDB.users.find(person => person.username === user)
    if(!foundUser) return res.sendStatus(401) // unauthorize

    const match = await compare(pwd, foundUser.password)
        if(match) {
            res.json({"success": `user${user} is logged in!`})
        }else {
            res.sendStatus(401)
        }

}


module.exports = {handleLogin}