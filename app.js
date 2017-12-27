const koa = require('koa');
const koaBody = require('koa-body');
const koaStatic = require('koa-static');
const IO = require('koa-socket');
// const indexRoute = require('./routes/index');
// const uploadRoute = require('./routes/upload');

const app = new koa();
const io = new IO();

io.attach(app);

app.use(koaBody({ multipart: true }));

// 设置静态资源目录
app.use(koaStatic(__dirname + '/public'));

app._io.on('connection', sock => {
    console.log(sock);
})


app.listen(3020);