// 200324 updated.
// npm install -D koa koa-static
// npm install


// 静态服务器
const Koa = require('koa')
const path = require('path')
const static = require('koa-static')
const send = require('koa-send')
const app = new Koa()
const staticPath = './dist'
const opts = {
  maxage: 1000 * 60 * 60 * 24 * 365, // 1年，默认为0
  // hidden: false, // 能否返回隐藏文件（以`.`打头），默认false不返回
  // index: 'index.js', // 默认文件名
  // defer: true, // 在yield* next之后返回静态文件，默认在之前
  gzip: true
  // 允许传输gzip，如静态文件夹下有两个文件，index.js和index.js.gz，
  // 会优先传输index.js.gz，默认开启
};
app.use(static(
  path.join( __dirname,  staticPath), opts
))

// const router = require('koa-router')();
// app.use(router.routes(), router.allowedMethods())


// 放最后，
// 匹配不被koa-static和koa-router捕获的其余路径，比如：http://localhost:3000/hhh
// 不能放在 app.use(router.routes(), router.allowedMethods()) 的前面
app.use(async (ctx) => {
  // ctx.body = 'hello world';
  await send(ctx, 'dist/index.html');
})

app.listen(4000, () => {
  console.log('Server is starting at port 4000')
})
