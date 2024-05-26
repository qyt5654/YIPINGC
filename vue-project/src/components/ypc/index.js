import Message from "../message/message.js"

//注册
export default {
    install (app) {
        app.config.globalProperties.$message = Message
    }
}