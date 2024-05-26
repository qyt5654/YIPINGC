import { createVNode, render } from "vue"
import YKMessage from "./ypcMessage.vue"

const divVNode = createVNode('div', { class: 'xtx-message-container' })
render(divVNode, document.body)

const div = divVNode.el

const YkMessage = ({ message, type }) => {
    //1.动态创建虚拟DOM - createVNode(h) 函数
    const comVNode = createVNode(YKMessage, { message, type })
    //2.渲染到body页面中 - render 函数
    render(comVNode, div)
    setTimeout(() => {
        render(null, div)
    }, 6000)
}

export default YkMessage