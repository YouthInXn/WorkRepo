const Koa = require('koa');
const route = require('koa-route');

const home = (ctx) => {
    ctx.response.type = 'html';
    ctx.response.body = '<h1>Hello World</h1>';
};

const about = (ctx) => {
    ctx.response.type = 'html';
    ctx.response.body = '<a href="/">返回首页</a>'
};

const app = new Koa();
app.use(route.get('/', home));
app.use(route.get('/about', about));
app.listen(8080);
console.log('Server is Running at 8080.');