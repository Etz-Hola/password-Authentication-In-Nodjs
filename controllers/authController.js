const usersDB = {
    users:require('../model/user.json'),
    setUsers: function (data) {this.user = data},
}


const bcrypt = require('bcrypt');
const handleLogin = async (req, res) => {
    const {...user, pwd} = req.body
} 