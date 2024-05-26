const db = require('../lib/db')

//新建walls
exports.insertWall = async (req, res) => {
    let data = req.body;
    console.log('123' + data)

    await db.insertWall([data.type, data.message, data.name, data.userId, data.moment, data.label, data.color, data.imgurl])
        .then(result => {
            res.send({
                code: 200,
                message: result,
            })
        })
}

//新建反馈
exports.insertFeedbacks = async (req, res) => {
    let data = req.body
    await db.insertFeedbacks([data.wallId, data.userId, data.type, data.moment]).then(result => {
        res.send({
            code: 200,
            message: result,
        })
    })
}

//新建评论
exports.insertComments = async (req, res) => {
    let data = req.body
    await db.insertComments([data.wallId, data.userId, data.imgurl, data.comment, data.name, data.moment]).then(result => {
        res.send({
            code: 200,
            message: result,
        })
    })
}

//删除墙，主表对应子表一起删除
exports.deleteWall = async (req, res) => {
    let data = req.body
    // if(data.imgurl){
    //     //如果存在图片，删除对应图片
    //     Mkdir.delFiles('data/' + data.imgurl)
    // }
    await db.deleteWall(data.id).then(result => {
        res.send({
            code: 200,
            message: result,
        })
    })
}

//删除反馈
exports.deleteFeedback = async (req, res) => {
    let data = req.body
    await db.deleteFeedback(data.id).then(result => {
        res.send({
            code: 200,
            message: result,
        })
    })
}

//删除评论
exports.deleteComments = async (req, res) => {
    let data = req.body
    await db.deleteComments(data.id).then(result => {
        res.send({
            code: 200,
            message: result,
        })
    })
}

//分页查询墙
exports.findWallPage = async (req, res) => {
    let data = req.body
    await db.findWallPage(data.page, data.pageSize, data.type, data.label).then(async result => {
        for (let i = 0; i < result.length; i ++) {
            //查找相应wall的赞，举报，撤销数据
            //喜欢
            result[i].like = await db.feedbackCount(result[i].id, 0)
            //举报
            result[i].report = await db.feedbackCount(result[i].id, 1)
            //要求撤销
            result[i].revoke = await db.feedbackCount(result[i].id, 2)
            //是否点赞
            result[i].islike = await db.likeCount(result[i].id, data.userId)
            //评论数
            result[i].comment = await db.commentCount(result[i].id)
        }
        res.send({
            code: 200,
            message: result,
        })
    })
}

//倒叙分页查墙的评论
exports.findCommentPage = async (req, res) => {
    let data = req.body
    await db.findCommentPage(data.page, data.pageSize, data.id).then(result => {
        res.send({
            code: 200,
            message: result,
        })
    })
}