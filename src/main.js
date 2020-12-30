// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '@/config/rem'
// import axios from 'axios'
import vueScroller from 'vue-scroller'
import localstore from '@/api/store.js';
// import VueSocketIO from 'vue-socket.io';
// Vue.use(new VueSocketIO({
//   debug: true,
//   // 服务器端地址
//   connection: 'address',
//   vuex: {}
// }))
Vue.config.productionTip = false
    // Vue.prototype.$axios = axios;
Vue.prototype.store = localstore;
Vue.use(vueScroller);

//UI组件
import VueMaterial from 'vue-material'
import "vue-material/dist/vue-material.min.css";
import 'vue-material/dist/theme/default.css'
Vue.use(VueMaterial)

//animate
import '@/config/animate.min.css';
import store from './store/index.js';

Vue.prototype.Sleep = (time) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(true);
        }, time);
    })
}

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})