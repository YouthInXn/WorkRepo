
let products = [
    {
        name:'HW Note 11',
        price:5000
    },
    {
        name:'iPhone X',
        price:'11000'
    }
];

module.exports = {
    '/api/products': async (ctx, next) => {
        ctx.response.contentType = 'application/json'
        ctx.response.body = {
            products:products
        }
    }
}
