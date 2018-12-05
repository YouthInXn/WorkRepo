const Koa = require('koa');

const logger = (ctx) => {
    console.log(`${new Date()}  ${ctx.request.method}  ${ctx.request.url}`);
    ctx.response.body = 'Hello world';
};



const app = new Koa();
app.use(logger);
app.listen(8080);
console.log('Server is Running at 8080.');