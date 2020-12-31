import api from '../../api/index.js';

const state = {
    missions: [],
    finishMissions: [],
    missionsAll: [],
    username: '奋斗者',
    focusCnt: 0 //每分钟
}

const getters = {
    finishCnt(state) {
        return state.finishMissions.length;
    },
    surplusCnt(state) {
        return state.missions.length;
    }
}

const actions = {
    initLocal({ commit }) {
        //取存mission任务的键值
        api.getInit("missions").then(data => {
            if (data) {
                commit('INIT', data);
            }
        })
    }
}

const mutations = {
    INIT(state, data) {
        state = data;
    },
    ADD(state, data) {
        state.missions.unshift(data);
        api.saveLocal("missions", state);
    },
    FINISH(state, index) {
        state.finishMissions.push(state.missions.splice(index, 1));
        api.saveLocal("missions", state);
    },
    DELETE(state, index) {
        state.missions.splice(index, 1);
        api.saveLocal("missions", state);
    },
    ADDFOCUS(state, time) {
        state.focusCnt += parseInt(time);
        api.saveLocal("missions", state);
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}