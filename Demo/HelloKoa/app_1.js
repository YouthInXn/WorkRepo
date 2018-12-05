
const fs = require('fs');
const Koa = require('koa');

const app = new Koa();

const main = (context) => {
    context.response.type = 'html';
    context.response.body = fs.createReadStream('./index.html');
};

app.use(main);
app.listen(8080);
console.log('Server is Running at 8080.');