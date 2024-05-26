let baseUrl = '' //域名地址
let routerMode = 'hash' //路由模式
let baseImgPath //图片存放地址

if(process.env.NODE_ENV == 'development'){
    baseUrl = 'http://localhost:3000'
    baseImgPath = 'http://localhost:3000'
}else{
    baseUrl = 'https://www.yyppcc.com.cn:3002'
    baseImgPath = 'https://www.yyppcc.com.cn:3003'
}

export {
    baseUrl,
    routerMode,
    baseImgPath
}