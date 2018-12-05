
/**
 * user表model
 * */

const db = require('../db')

const User = db.defineModel('user', {
    name:db.STRING(50),
    password:db.STRING(100),
    gender:db.BOOLEAN,
    email:{
        type:db.STRING(100),
        validate:{
            isEmail:true
        },
        unique:true
    }
})
module.exports = User