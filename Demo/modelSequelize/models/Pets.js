
/**
 * pets表model
 * */

const db = require('../db')

module.exports = db.defineModel('pets', {
    name:db.STRING(50),
    gender:db.BOOLEAN,
    age:db.BIGINT,
    birth:db.STRING(50)
})