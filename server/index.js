const express = require('express')
const path = require('path')
//解析html
let ejs = require('ejs')
let config = require('./config/default.js')

const app = express()

//获取静态资源
app.use(express.static(__dirname + '/data'))
//app.use(express.static(__dirname + '/data'))

//设置允许跨域访问该服务
app.all('*', function (req, res, next){
    //允许访问ip *为所有
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
    res.header("X-Powered-By", "3.2.1");
    //这段为了方便返回json
    res.header("Content-Type", "application/json; charset=utf-8");
    if(req.method == 'OPTIONS'){
        //让options请求快速返回
        res.sendStatus(200);
    }else{
        next();
    }
})

//加入html视图
app.engine('html', ejs.__express);
app.set('view engine', 'html');

//解析前端数据
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//引入路由
require('./routes/index')(app)
require('./routes/files')(app)

app.listen(config.port, () => {
    console.log(`启动了端口${config.port}`)
})

