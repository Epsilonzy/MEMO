import Vue from 'vue';
import Vuex from 'vuex';
import main from './module/main.js'

Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        userInfo: {
            email: "xxxxxxx@qq.com"
        },
        confirm: {
            title: '标题',
            content: '内容',
            active: false,
            success: () => {
                console.log('success');
            },
            fail: () => {
                console.log('fail');
            }
        },
        alertF: {
            content: '内容',
            active: false,
            confirmText: '确认'
        },
        alertS: {
            title: '标题',
            content: '内容',
            active: false,
            confirmText: '确认'
        }
    },
    mutations: {
        //控制弹窗
        CONFIRM(state, data) {
            state.confirm.title = data.title;
            state.confirm.content = data.content;
            state.confirm.active = true;
            if (data.success) {
                state.confirm.success = data.success;
            }
            if (data.fail) {
                state.confirm.fail = data.fail;
            }
        },
        ALERTF(state, data) {
            state.alertF.content = data.content;
            state.alertF.active = true;
            if (data.confirmText) {
                state.alertF.confirmText = data.confirmText;
            }
        },
        ALERTS(state, data) {
            state.alertS.title = data.title;
            state.alertS.content = data.content;
            state.alertS.active = true;
            if (data.confirmText) {
                state.alertS = data.confirmText
            }
        }
    },
    modules: {
        main
    },
})