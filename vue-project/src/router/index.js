import {createRouter, createWebHistory} from "vue-router"

const routes = [
    {
        path: '/',
        redirect: '/wall?id=0',
        // alias: '/home',//定义别名
        component: () => import( '../views/yyppcc.vue'),
        children: [
            {
                path: 'wall',
                component: () => import( '../views/MessageWall.vue')
            }
        ]
    },

]

const router = createRouter({
    //使用url的#符号之后的部分模拟url路径的变化，因为不会触发页面更新，所以不需要服务端支持
    //history: createWebHashHistory(),
    history: createWebHistory(),
    routes: routes
})

export default router

