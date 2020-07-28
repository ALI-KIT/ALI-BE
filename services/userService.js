const User = require('../models/user')
var bcrypt = require('bcrypt')

module.exports = {
    create: async (data) => {
        const user =new User(data)
        await user.save();
        return user.generateAuthToken()
    },
    get:(id)=>User.findById(id),
    findOne:(condition)=>User.findOne(condition),
    findByCredentials: (email, password)=> User.findByCredentials(email, password),
    checkPassword: (user,password)=>bcrypt.compareSync(password, user.password),
    generateAuthToken: function(user) {
        return user.generateAuthToken()
    }
}