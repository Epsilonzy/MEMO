import url from './url';
import axios from 'axios';

const getTest = (apiUrl) => {
    return new Promise(async(resolve, reject) => {
        // try {
        //     let result = await axios.get(`${url.serverUrl}${apiUrl}`);
        //     resolve(result);
        // } catch (err) {
        //     reject(err);
        // }
        setTimeout(() => {
            resolve({
                info: 'success',
                content: 'testSample'
            })
        }, 3000);
    })
}

const getInit = () => {
    //localstorage版本
    return new Promise(resolve => {
        let res = JSON.parse(localStorage.getItem('memo'));
        if (res) {
            resolve(res);
        } else {
            resolve({
                missions: [],
                finishMissions: [],
                focusCnt: 0
            })
        }
    })
}

const saveLocal = (data) => {
    return new Promise(resolve => {
        let send = JSON.stringify({
            missions: data.missions,
            finishMissions: data.finishMissions,
            focusCnt: data.focusCnt
        });
        localStorage.setItem('memo', send);
        resolve(true);
    })
}

export default {
    getTest: getTest,
    getInit: getInit,
    saveLocal: saveLocal
}