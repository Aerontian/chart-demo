module.exports = async (ctx, next) => {
    console.log(`Process ${ctx.method} ${ctx.url}...`);
    let start = new Date().getTime(),
        execTime;
    await next();
    execTime = new Date().getTime() - start;
    console.log(`Time: ${execTime} ms`);
};