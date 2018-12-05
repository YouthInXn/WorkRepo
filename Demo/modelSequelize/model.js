/**
 * 读取models目录，汇总导出所有的model
 * */

const fs = require('fs')
const path = require('path')
const db = require('./db')
// 读取models目录
let files = fs.readdirSync(path.join(__dirname,'/models'))

module.exports = {}

files.map(f => {
    if (f.endsWith('.js')) {
        let name = f.substr(0, f.length - 3)
        console.log(`import model: ${name}`)
        // require该model时，会调用db中的sequelize实例的defineModel方法，sequelize对象会保存所有的models
        module.exports[name] = require(`./models/${name}`)
    }
})

module.exports.sync = () => {
    db.sync()
}
module.exports.allModels = db.models

