
// const db = require('./db')
const models = require('./model')
// models : { User:user, Pet:pet }
// force为true意思是如果存在就先删除表
models.sync()

console.log('init database done.')
