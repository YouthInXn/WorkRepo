// 理解中间件的栈结构

const Koa = require('koa');
const app = new Koa();

// 编写三个中间件

const one =  (ctx, next) => {
    console.log('one_in');
    next();
    console.log('one_out');
};

const two = (ctx, next) => {
    console.log('two_in');
    next();
    console.log('two_out');
};

const three = (ctx, next) => {
    console.log('three_in');
    // next();
    console.log('three_out');
};

app.use(one);
app.use(two);
app.use(three);
app.listen(8080);

