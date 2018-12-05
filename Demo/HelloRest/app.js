
const Koa = require('koa')
const bodyParse = require('koa-body')
const controllers = require('./controllers')
const app = new Koa()


app.use(bodyParse())
/* controllers返回的是注册了多个路由的router.routes() */
app.use(controllers())
app.listen(8080, () => {
    console.log('server is running at 8080.')
})
