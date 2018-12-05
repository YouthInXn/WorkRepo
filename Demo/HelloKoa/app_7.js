// 异步中间件

const Koa = require('koa');
const fs = require('fs');

const app = new Koa();

const main = async function (context) {
    context.response.type = 'text/html';
    context.response.body = await fs.createReadStream('./index.html');
};

app.use(main);
app.listen(8080);