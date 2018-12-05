/**
 * 统一Model的定义
 * */
const config = require('./config')
const Sequelize = require('sequelize')

console.log('init Sequelize..')

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host:config.host,
    dialect:'mysql',
    pool:{
        maxConnections:5,
        minConnections:0,
        maxIdleTime:10000
    }
})
const ID_TYPE = Sequelize.STRING(50)
// 一个统一Model定义的方法
// 每次调用时都会给sequelize对象上添加上该模型
const defineModel = (modelName, attributes) => {
    let att = {}
    for (let key in attributes) {
        // 给每一个字段默认加上非空约束，除非显示声明allowNull:true
        let value = attributes[key]
        if (typeof value === 'object') {
            value.allowNull = value.allowNull || false
            att[key] = value
        } else {
            att[key] = {
                type:value,
                allowNull:false
            }
        }
    }
    // 每个模型默认加上att.id字段，且自增
    att.id = { type: ID_TYPE, primaryKey: true }
    // 添加时间戳 还需添加hook函数去判断是否是第一次创建数据 暂时先不加了
    // att.createdTime = { type:Sequelize.BIGINT, allowNull:false }
    // att.updatedTime = { type:Sequelize.BIGINT, allowNull:false }
    // att.vision = { type:Sequelize.BIGINT, allowNull:false }
    // freezeTableName设置为true时，sequelize不会改变表名，否则可能会按其规则有所调整
    return sequelize.define(modelName, att, { timestamps:false, freezeTableName:true})
}

const TYPES = ['STRING', 'INTEGER', 'BIGINT', 'TEXT', 'DOUBLE', 'BOOLEAN']

const db = {
    defineModel:defineModel,
    models:sequelize.models,
    sync: () => {
        // 同步该对象上的所有模型到数据库
        sequelize.sync()
    }
}
for (let t of TYPES) {
    db[t] = Sequelize[t]
}

module.exports = db
