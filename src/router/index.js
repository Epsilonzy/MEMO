import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'start',
            meta: {
                index: 1
            },
            component: () =>
                import ( /*webpackChunkName: "start" */ "../pages/start/index")
        }, {
            path: '/add',
            name: 'AddMission',
            meta: {
                index: 3
            },
            component: () =>
                import ( /*webpackChunkName: "add" */ "../pages/add/index")
        }, {
            path: '/focus',
            name: 'Focus',
            meta: {
                index: 2
            },
            component: () =>
                import ( /*webpackChunkName: "focus" */ "../pages/focus/index")
        }, {
            path: '/focusMain',
            name: 'FocusMain',
            meta: {
                index: 2
            },
            component: () =>
                import ( /*webpackChunkName: "focus" */ "../pages/focus/main.vue")
        },
        {
            path: '/index',
            name: 'main',
            meta: {
                index: 1,
            },
            component: () =>
                import ("../pages/index/index.vue"),
            children: [{
                path: '/',
                name: 'MainPage',
                meta: {
                    index: 1
                },
                component: () =>
                    import ( /*webpackChunkName: "index" */ "../pages/index/children/index")
            }, {
                path: 'mine',
                name: 'MinePage',
                meta: {
                    index: 2
                },
                component: () =>
                    import ( /*webpackChunkName: "index" */ "../pages/index/children/mine")
            }]
        }
    ]
})