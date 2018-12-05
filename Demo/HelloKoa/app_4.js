
const Koa = require('koa');
const serve = require('koa-static');
const path = require('path');

const static = serve(path.join(__dirname));

const app = new Koa();
app.use(static);
app.listen(8080);
console.log('Server is Running at 8080.');