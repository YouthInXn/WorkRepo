
const Koa = require('koa');

const main = (context) => {
    console.log(context.response);
    if(context.request.path !== '/') {
        context.response.type = 'text/html';
        context.response.body = '<a href="/">返回首页</a>';
    } else {
        context.response.type = 'text/html';
        context.response.body = '<h1>Hello World!</h1>';
    }
};

const app = new Koa();
app.use(main);
app.listen(8080);
console.log('Server is Running at 8080.');