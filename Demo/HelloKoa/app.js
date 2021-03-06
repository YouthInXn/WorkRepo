
const Koa = require('koa');


const app = new Koa();

app.use(async (ctx, next) => {
    await next();
    ctx.response.type = 'text/html';
    ctx.response.body = '<h1>Hello KOA!</h1>';
});

app.listen(3000);
console.log('Server is Running at 8080..');