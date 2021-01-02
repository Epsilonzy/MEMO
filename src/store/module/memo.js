import api from '../../api/index.js';
import methods from './methods/index';

const state = {
    memos: [],
}

const getters = {

}

const actions = {
    initLocal({ commit }) {
        api.getInit("memos").then(data => {
            commit('INIT', data);
        })
    }
}

// memo数据结构
// memo:{
//     id:String,//唯一识别id
//     title:String, //备忘录标题
//     content:String:[],//内容数组（分段落）
//     contentRaw:String, //未拆成数组的内容，
//     time:String,//YYYY-MM-DD HH:MM:SS 发布时间
//     updateTime:String:[],//修改时间的存储数组
//    timeHMS:String,//时分秒
//    timeYMD:String,//年月日
// }


const mutations = {
    INIT(state, data) {
        state.memos = data.memos;
    },
    ADD(state, data) {
        data = methods.packMemo(data);
        state.memos.unshift(data);
        //第一个是local的key名字，第二个是要存储的state状态
        api.saveLocal("memos", state);
    },
    DELETE(state, index) {
        state.memos.splice(index, 1);
        api.saveLocal("memos", state);
    },
    UPDATE(state, data) {
        let oldData = state.memos[data.index];
        let memoNew = data.data;
        if (oldData) {
            oldData.contentRaw = memoNew.contentRaw;
            oldData.content = memoNew.contentRaw.split('\n');
            oldData.title = memoNew.title;
            oldData.updateTime.push(new Date());
        }
        api.saveLocal("memos", state);
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}