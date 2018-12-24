module.exports = async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Methods', 'GET, DELETE, OPTIONS, HEAD, PUT, POST');
    ctx.set('Access-Control-Allow-Headers', 'Origin, Accept, X-Requested-With, Last-Modified, Content-Type');
    await next();    
};