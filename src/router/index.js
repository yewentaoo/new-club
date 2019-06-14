import Vue from 'vue'
import Router from 'vue-router'
import index from '../components/pages/index'
import xiangqing from '../components/pages/xiangqing'
import comment from '../components/pages/comment'
import shouchang from '../components/pages/shouchang'
Vue.use(Router)

export default new Router({
    routes: [{
            path: '/index',
            component: index
        },
        {
            path: '/shouchang',
            component: shouchang
        },
        {
            path: '/comment/:id',
            component: comment
        },
        {
            path: '/xiangqing/:id',
            component: xiangqing
        },
        {
            path: '',
            redirect: '/index'
        }
    ]
})