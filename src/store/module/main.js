import api from '../../api/index.js';
import methods from './methods/index'
const state = {
    missions: [],
    finishMissions: [],
    username: 'EPSILONZY',
    focusCnt: 0, //每分钟
    plan: {
        lastUpdateTime: {
            year: 0, //年
            month: 0, //月
            day: 0, //日
            dayInYear: 0 //一年中的第X天
        }, //上次更新时间
        queue: [],
        // {
        //     title: '', //计划标题
        //     content: '', //计划内容
        //     weight: 0, //计划权重 权重值越高越优先
        //     interval: 0, //计划间隔天数
        //     startDayInYear: 0 //单位天数 开始时间
        // }
        hasPlan: false
    }
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
        api.getInit("main").then(data => {
            if (data) {
                commit('INIT', data);
            }
        })
    }
}

const mutations = {
    INIT(state, data) {
        state.username = data.username;
        //对PLAN进行校验
        if (data.plan != void 0) {

            //表示有计划存在
            state.plan.hasPlan = true;
            state.plan.queue = [...data.plan.queue];
            state.plan.lastUpdateTime = data.plan.lastUpdateTime;
            //比对时间
            let nowTime = methods.getTimeDetailNow();
            let oldTime = state.plan.lastUpdateTime;
            if (nowTime.year == oldTime.year && nowTime.dayInYear == oldTime.dayInYear) {

                //时间相同
                state.missions = [...data.missions];
                state.finishMissions = [...data.finishMissions];
                console.log("时间相同");
            } else {
                //添加任务
                console.log('添加任务');
                state.plan.queue.forEach((item, index) => {
                        //拿到差值
                        let distance = Math.abs(nowTime.dayInYear - item.startDayInYear);
                        //对差值进行设定的任务间隔判断
                        if (distance % (item.interval + 1) == 0) {
                            //取余得0判断需间隔数加1,每天就是0,所以任意值对0+1取余都为0
                            state.missions.push({
                                //**此处待更新**
                                title: item.title,
                                content: item.content
                            })
                        }
                    })
                    //更新时间
                state.plan.lastUpdateTime = nowTime;
            }
        }
    },
    ADD_PLAN(state, plan) {
        let isInsert = false;
        plan.startDayInYear = methods.getTimeDetailNow().dayInYear;
        for (let i = 0; i < state.plan.queue.length; i++) {
            //权重值由大到小排列
            if (!(state.plan.queue[i].weight > plan.weight)) {
                //切割以i位置为起始点到数组末尾的这段数组，需要把plan插入到i的前面去
                let temp = state.plan.queue.splice(i, state.plan.queue.length - i + 1);
                state.plan.queue.push(plan, ...temp);
                isInsert = true;
                break;
            }
        }
        if (!isInsert) {
            state.plan.queue.push(plan);
        }
        api.saveLocal("main", state);
    },
    DELETE_PLAN(state, index) {
        state.plan.queue.splice(index, 1);
        api.saveLocal("main", state);
    },
    UPDATE_PLAN(state, data) {
        // data:{
        //     index:Number//索引位置
        //     data:plan//更新的计划
        // }
        state.plan.queue[data.index] = data.plan;
        api.saveLocal("main", state);
    },
    ADD(state, data) {
        state.missions.unshift(data);
        api.saveLocal("main", state);
    },
    FINISH(state, index) {
        state.finishMissions.push(state.missions.splice(index, 1));
        api.saveLocal("main", state);
    },
    DELETE(state, index) {
        state.missions.splice(index, 1);
        api.saveLocal("main", state);
    },
    ADDFOCUS(state, time) {
        state.focusCnt += parseInt(time);
        api.saveLocal("main", state);
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}