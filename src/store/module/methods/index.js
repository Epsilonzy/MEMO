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

const packMemo = (data) => {
    //封装
    const d = new Date();
    data.id = `MP${d.getTime()}`;
    data.timeHMS = `${d.getHours()}:${d.getMinutes()}:${d.getMinutes()}`;
    data.time = `${data.timeYMD} ${data.timeHMS}`;
    data.content = data.contentRaw.split('\n');
    data.updateTime.push(d);
    return data;
}

const getTimeDetailNow = (dateStr = void 0) => {
    function calDayInMonth(month, isLeap = false) {
        if (month == 2) {
            //是否闰年
            let d = isLeap ? 29 : 28;
            return d;
        }
        if (month < 8 && month % 2 == 1) {
            return 31;
        } else if (month >= 8 && month % 2 == 0) {
            return 31;
        } else {
            return 30;
        }
    }
    let date = dateStr ? new Date(dateStr) : new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1; //0为1月
    let day = date.getDate();
    let dayInYear = 0;
    for (let i = 1; i < month; i++) {
        dayInYear += calDayInMonth(month);
    }
    dayInYear += day;
    return {
        year,
        month,
        day,
        dayInYear
    }
}
export default {
    packMemo,
    getTimeDetailNow
}