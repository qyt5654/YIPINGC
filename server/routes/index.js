const controller = require('../controller/dbServer')

module.exports = function(app){
    //test
    app.get('/test', (req, res) => {
        res.type('html')
        res.render('test')
    })

    //新建wall数据
    app.post('/insertWall', (req, res) => {
        controller.insertWall(req, res)
    })

    //新建反馈
    app.post('/insertFeedback', (req, res) => {
        controller.insertFeedbacks(req, res)
    })

    //新建评论
    app.post('/insertComment', (req, res) => {
        controller.insertComments(req, res)
    })

    //删除墙，主表对应子表一起删除
    app.post('/deleteWall', (req, res) => {
        controller.deleteWall(req, res)
    })

    //删除反馈
    app.post('/deleteFeedback', (req, res) => {
        controller.deleteFeedback(req, res)
    })

    //删除评论
    app.post('/deleteComments', (req, res) => {
        controller.deleteComments(req, res)
    })

    //分页查询墙
    app.post('/findWallPage', (req, res) => {
        controller.findWallPage(req, res)
    })

    //倒叙分页查墙的评论
    app.post('/findCommentPage', (req, res) => {
        controller.findCommentPage(req, res)
    })

    //用户进入进行ip登记
    app.post('/signip', (req, res) => {
        let ip = req.ip
        res.send({
            code: 200,
            ip: ip,
        })
    })
}
