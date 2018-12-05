
const Sequelize = require('sequelize')
const config = require('./config')
// 使用sequelize操作数据库
// 1.创建sequelize示例
// 参数 1.database 2.username 3.password 4.object
const seque = new Sequelize(config.database, config.username, config.password, {
    host:config.host,
    // 链接的数据库类型
    dialect:'mysql',
    port:config.port,
    pool:{
        // 连接池的最大连接数量 maxConnections
        max:5,
        // 最小连接数 minConnections
        min:0,
        // 最大空闲时间，超时将释放链接 maxIdleTime
        idle:30000
    }
});
// 2.定义pet模型，告诉sequelize如何映射数据库表
var Pet = seque.define('pet', {
    id:{
        type:Sequelize.STRING(50),
        primaryKey:true
    },
    name:Sequelize.STRING(100),
    gender:Sequelize.BOOLEAN,
    birth:Sequelize.STRING(10),
    createdAt:Sequelize.STRING(100),
    updatedAt:Sequelize.STRING(100),
    version:Sequelize.BIGINT,
},{ timestamps:false })
// 3.插入数据
const now = Date.now()
const data = {
    id:2,
    name:'goodguoba',
    gender:false,
    birth: '2018-11-19',
    createdAt: now,
    updatedAt: now,
    version: 1
}
// 插入数据
const insertData = async () => {
    try {
        const dog = await Pet.create(data)
        console.log('insert data success at.' + new Date())
    } catch (e) {
        console.log(e)
    }
}
// insertData()
// 查询数据
const queryData = async () => {
    try {
        const data = await Pet.findAll({
            where:{ name:'goodguoba' }
        })
        for (let p of data) {
            console.log(JSON.stringify(p));
        }
        return data
    } catch (err) {
        console.log(err)
    }
}
// queryData()
// 更新数据
const updateData = async () => {
    try {
        const data = await queryData()
        data[0].gender = true
        data[0].version++
        // 每个对象中带的save方法可以更新该数据
        await data[0].save()
        console.log('update succeed.')
    } catch (e) {
        console.log(e)
    }
}
// updateData()
// 删除数据
const deleteData = async () => {
    try {
        const data = await queryData()
        await data[0].destroy()
        console.log('destroyed')
    } catch (e) {
        console.log(e)
    }
}
deleteData()