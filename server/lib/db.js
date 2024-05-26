const mysql = require('mysql')

const config = require('../config/default')

const db = mysql.createConnection({ //链接数据库
    host: config.database.HOST,
    user: config.database.USER,
    password: config.database.PASSWORD,
})

const pool = mysql.createPool({ //链接指定的数据库
    host: config.database.HOST,
    user: config.database.USER,
    password: config.database.PASSWORD,
    database: config.database.WALL
})

//直接使用pool.query
let bdbs = (sql, values) => {
    return new Promise((resolve, reject) => {
        db.query(sql, values, (err, result) => {
            if(err){
                reject(err);
            }else{
                resolve(result)
            }
        })
    })
}

//通过pool.getConnection 获取链接
let query = (sql, values) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if(err){
                reject(err);
            }else{
                connection.query(sql, values, (err, rows) => {
                    if(err){
                        reject(err)
                    }else{
                        resolve(rows)
                    }
                    connection.release(); //释放
                })
            }
        })
    })
}

//创建数据库
let WALLTS = `create database if not exists WALLTS default charset utf8 collate utf8_general_ci;`

let createDatabase = (db) => {
    return bdbs(db, [])
}

//创建数据表
//留言/照片
let walls = `CREATE TABLE IF NOT EXISTS walls (
        id INT NOT NULL AUTO_INCREMENT,
        type INT NOT NULL COMMENT '类型',
        message VARCHAR(1000) COMMENT '消息内容',
        name VARCHAR(100) NOT NULL COMMENT '姓名',
        userId VARCHAR(100) NOT NULL COMMENT '用户ID',
        moment VARCHAR(100) NOT NULL COMMENT '时间点',
        label INT NOT NULL COMMENT '标签',
        color INT COMMENT '颜色',
        imgurl VARCHAR(100) COMMENT '图片URL',
        PRIMARY KEY (id)
    );`

let feedbacks =`CREATE TABLE IF NOT EXISTS feedbacks (
    id INT NOT NULL AUTO_INCREMENT,
    wallId INT NOT NULL COMMENT '关联的墙ID',
    userId VARCHAR(100) NOT NULL COMMENT '用户ID',
    type INT NOT NULL COMMENT '反馈类型',
    moment VARCHAR(100) NOT NULL COMMENT '反馈时间点',
    PRIMARY KEY (id)
);`

// 留言评论
let comments= `CREATE TABLE IF NOT EXISTS comments (
    id INT NOT NULL AUTO_INCREMENT,
    wallId INT NOT NULL COMMENT '关联的墙ID',
    userId VARCHAR(100) NOT NULL COMMENT '用户ID',
    imgurl VARCHAR(100) COMMENT '图片URL',
    comment VARCHAR(1000) COMMENT '评论内容',
    name VARCHAR(100) NOT NULL COMMENT '用户姓名',
    moment VARCHAR(100) NOT NULL COMMENT '评论时间点',
    PRIMARY KEY (id)
);
`

let createTable = (sql) => {
    return query(sql, [])
}

//先创建数据库再创建表
async function create(){
    await createDatabase(WALLTS)
    createTable(walls)
    createTable(feedbacks)
    createTable(comments)
}

create()

//新建walls
exports.insertWall = (value) => {
    let _sql = "insert into walls set type=?, message=?, name=?, userId=?, moment=?, label=?, color=?, imgurl=?;"
    return query(_sql, value)
}

//新建反馈
exports.insertFeedbacks = (value) => {
    let _sql = "insert into feedbacks set wallId=?, userId=?, type=?, moment=?;"
    return query(_sql, value)
}

//新建评论
exports.insertComments = (value) => {
    let _sql = "insert into comments set wallId=?, userId=?, imgurl=?, comment=?, name=?, moment=?;"
    return query(_sql, value)
}

//删除墙，主表对应子表一起删除
exports.deleteWall = (id) => {
    let _sql = "delete a, b, c from walls a left join feedbacks b on a.id=b.wallId left join comments c on a.id=c.wallId where a.id='${id}';"
    return query(_sql)
}

//删除反馈
exports.deleteFeedback = (id) => {
    let _sql = "delete from feedbacks where id='${id}';"
    return query(_sql)
}

//删除评论
exports.deleteComments = (id) => {
    let _sql = "delete from comments where id='${id}';"
    return query(_sql)
}

//分页查询墙
exports.findWallPage = (page, pageSize, type, label) => {
    let _sql;
    if(label == -1){
        _sql = `select * from walls where type='${type}' order by id desc limit ${(page - 1) * pageSize}, ${pageSize};`
    }else{
        _sql = `select * from walls where type='${type}' and label="${label}" order by id desc limit ${(page - 1) * pageSize}, ${pageSize};`
    }
    return query(_sql)
}

//倒叙分页查墙的评论
exports.findCommentPage = (page, pageSize, id) => {
    let _sql = `select * from comments where wallId="${id}" order by id desc limit ${(page - 1) * pageSize}, ${pageSize};`
    return query(_sql)
}

//查询各反馈总数据
exports.feedbackCount = (wid, type) => {
    let _sql = `select count(*) as count from feedbacks where wallId="${wid}" and type="${type}";`
    return query(_sql)
}

//查询评论总数
exports.commentCount = (wid) => {
    let _sql = `select count(*) as count from comments where wallId="${wid}";`
    return query(_sql)
}

//是否点赞
exports.likeCount = (wid, uid) => {
    let _sql = `select count(*) as count from feedbacks where wallId="${wid}" and userId="${uid}" and type=0;`
    return query(_sql)
}