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

const getInit = (key) => {
    //localstorage版本
    return new Promise(resolve => {
        let res = JSON.parse(localStorage.getItem(key));
        if (res) {
            resolve(res);
        } else {
            resolve(false);
        }
    })
}

const saveLocal = (key, data) => {
    return new Promise(resolve => {
        let send = JSON.stringify(data);
        localStorage.setItem(key, send);
        resolve(true);
    })
}

export default {
    getTest: getTest,
    getInit: getInit,
    saveLocal: saveLocal
}