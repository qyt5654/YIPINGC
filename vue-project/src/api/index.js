import fetch from '../utils/axios.js'

//获取访问者ip
export const signIpApi = () => fetch.post('/signip')

//新建wall
export const insertWallApi = data => fetch.post('/insertWall', data)

//查询墙
export const findWallPageApi = data => fetch.post('/findWallPage', data)

//反馈
export const insertFeedbackApi = data => fetch.post('/insertFeedback', data)

//评论
export const insertCommentApi = data => fetch.post('/insertComment', data)

//评论
export const findCommentPageApi = data => fetch.post('/findCommentPage', data)


export const profileApi = data => fetch.post('/profile', data)
