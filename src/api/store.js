//使用JSON格式作为存储对象

const getStorage = (name) => {
    return new Promise(resolve => {
        let result = localStorage.getItem(name);
        if (result) {
            resolve(JSON.parse(result));
        }
        resolve(null);
    })
}

const setStorage = (name, data) => {
    return new Promise(resolve => {
        data = JSON.stringify(data);
        localStorage.setItem(name, data);
        let res = localStorage.getItem(name);
        if (res) {
            resolve(true);
        }
        resolve(false);
    })
}

const removeStorage = (name) => {
    return new Promise(resolve => {
        localStorage.removeItem(name);
        let res = localStorage.getItem(name);
        if (!res) {
            resolve(true);
        }
        resolve(false);
    })
}

module.exports = {
    getStorage,
    setStorage,
    removeStorage
}