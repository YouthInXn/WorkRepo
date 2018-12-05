
const Router = require('koa-router');
const router = new Router();
const mapping = require('./controllers/api');


module.exports = function () {
    console.log(mapping)
    for (let url in mapping) {
        router.get(url, mapping[url])
    }
    return router.routes();
}
