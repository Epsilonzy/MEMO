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
        api.getInit().then(data => {
            commit('INIT', data);
        })
    }
}

const mutations = {
    TEST(state, data) {
        state.test = data;
    },
    INIT(state, data) {
        state.missions = data.missions;
        state.finishMissions = data.finishMissions;
        state.focusCnt = data.focusCnt;
    },
    ADD(state, data) {
        state.missions.unshift(data);
        api.saveLocal(state);
    },
    FINISH(state, index) {
        state.finishMissions.push(state.missions.splice(index, 1));
        api.saveLocal(state);
    },
    DELETE(state, index) {
        state.missions.splice(index, 1);
        api.saveLocal(state);
    },
    ADDFOCUS(state, time) {
        state.focusCnt += parseInt(time);
        api.saveLocal(state);
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}