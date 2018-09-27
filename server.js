
const Koa = require('koa');
const app = new Koa();
const fs = require('fs');
const Router = require('koa-router');
const router = new Router();
const session = require('koa-session');
const mongoClient = require('mongodb').MongoClient;
const dbUrl = 'mongodb://localhost:27017/';
const dbName = 'sjb';
console.time('start')

mongoClient.connect(dbUrl,(err,client)=>{
    var user = client.db(dbName).collection('user');
    user.find().toArray((err,items)=>{
        if(!err){
            console.timeEnd('start')
            items.forEach(item=>{
                console.log(item._id)
            })
        }
    })
})
app.keys = ['busyzz'];

const sessionConfig = {
    key:'koa:sess',
    maxAge:10000,

}
app.use(session(sessionConfig, app));
router.get('/',async (ctx)=>{
    console.log(ctx.session.username)
})
router.get('/login',async (ctx)=>{
    ctx.session.username = 'busyzz';
    console.log(ctx.session.username)
})


app.use(router.routes()).use(router.allowedMethods());
app.listen(8099)
