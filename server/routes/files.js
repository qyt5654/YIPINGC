const multer = require('multer')
const express = require('express')
const app = express()

function random(min, max){
    return Math.floor(Math.random() * (max - min)) + min
}

const storage = multer.diskStorage({
    //保存路径
    destination: function (req, file, cb) {
        cb(null, './data/photo')
        //注意这里的文件路径,不是相对路径，直接填写从项目根路径开始写就行了
    },
    //保存在 destination 中的文件名
    filename: function (req, file, cb) {
        //正则匹配后缀名
        let type = file.originalname.replace(/.+\./,".")

        cb(null,Date.now() + random(1, 100) + type)
    }
})

const upload = multer({ storage: storage })

module.exports = function (app){
    app.post('/profile', upload.single('file'), function (req, res, next) {
        let name = req.file.filename
        let imgurl = '/photo/' + name
        console.log(imgurl)
        res.send(imgurl)
    })
}
