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
export default {
    packMemo
}