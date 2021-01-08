<template>
   <div class="container">
      <topBar 
      :title="isUpdate?'更改计划':'制定计划'" 
      iconLeft="keyboard_arrow_left" 
      @leftClick="back()"
      ></topBar>
      <div class="body">
          <md-card-header class="animate__animated animate__bounce">
            <div class="md-title">{{title}}</div>
          </md-card-header>
          <md-field class="animate__animated animate__fadeInLeft" :class="{'md-invalid':titleWrong}">
            <label>计划标题</label>
            <md-input v-model="plan.title"></md-input>
            <span class="md-error">标题不能为空!</span>
            <span class="md-helper-text">不如起一个醒目的标题(ง •_•)ง</span>
          </md-field>
          <md-field class="animate__animated animate__fadeInRight">
            <label>设定的计划内容(非必填)</label>
            <md-textarea v-model="plan.content" md-autogrow></md-textarea>
            <span class="md-helper-text">设定的内容一定要做哦o(￣ヘ￣o＃)</span>
          </md-field>
          <md-field class="animate__animated animate__fadeInLeft">
            <md-select v-model="plan.weight" id="weight">
               <md-option value="-1">未设定</md-option>
               <md-option value="4">最高优先级</md-option>
               <md-option value="3">高优先级</md-option>
               <md-option value="2">中优先级</md-option>
               <md-option value="1">低优先级</md-option>
               <md-option value="0">最低优先级</md-option>
            </md-select>
            <span class="md-helper-text">选择计划优先级</span>
          </md-field>
          <md-field :class="{'md-invalid':intervalWrong}">
            <md-input v-model="plan.interval"></md-input>
            <span class="md-helper-text">设定间隔时间(单位为天数) 0为每天</span>
            <span class="md-error">必须为数字，值的范围0~355 0为每天</span>
         </md-field>
         <span class="md-helper-text">设定计划开始执行的时间</span>
         <md-datepicker v-model="plan.startTime" md-immediately :md-disabled-dates="disabledDates"/>
          <div class="center">
             <md-button class="md-fab md-primary button animate__bounceIn" @click="submit()">
               <md-icon>edit</md-icon>
             </md-button>
          </div>
      </div>
   </div>
</template>

<script>
   import topBar from '../layout/topbar';
   export default {
       components:{topBar},
       props:{},
       data(){
           return{
               title:'',
               titleList:['♪(^∇^*)','','(⑉･̆-･̆⑉)','(◔‸◔)','ଘ(੭ˊᵕˋ)੭','꒰ᐢ⸝⸝•༝•⸝⸝ᐢ꒱','੯‧̀͡u (҂`･ｪ･´) <,︻╦̵̵̿╤─ ҉ - --'],
               plan:{
                  title:'',
                  content:'',
                  weight:'-1', //类型转换
                  interval:'', //类型转换,
                  startTime:new Date(),
                  setTime:''
               },
               planIndex:-1,
               titleWrong:false,
               intervalWrong:false,
               isUpdate:false,
               disabledDates:date=>{
                  return date.getTime()<this.nowDate.getTime();
               },
               nowDate:new Date()
            }
       },
       computed: {
           
       },
       watch: {
            'plan.interval': {
               handler(newV, oldV) {
                  let num = parseInt(newV);
                  if(num!=NaN&&num>=0&&num<=355){
                     this.intervalWrong = false;
                  } else {
                     this.intervalWrong = true;
                  }
               },
               immediate: true,
            },
            'plan.title':{
               handler(newV,oldV){
                  if(newV==""){
                     this.titleWrong = true;
                  } else {
                     this.titleWrong = false;
                  }
               },
               immediate:true
            }
       },
       methods: {
          back(){
             window.history.back();
          },
          submit(){
             if(!this.titleWrong&&!this.intervalWrong&&this.plan.weight!='-1'&&this.plan.startTime){
                this.$store.commit('CONFIRM',{
                   title:'提示',
                   content:this.isUpdate?'确认更改计划吗?':'确认添加新计划吗?',
                   success:()=>{
                      let d = this.plan.startTime;
                      this.plan.startTime = `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`
                      this.plan.weight = parseInt(this.plan.weight);
                      this.plan.interval = parseInt(this.plan.interval);

                      if(this.isUpdate){
                         this.$store.commit('main/UPDATE_PLAN',{
                            data:this.plan,
                            index:this.planIndex
                         });
                      } else {
                         this.$store.commit('main/ADD_PLAN',this.plan);
                      }
                      window.history.back(-1);
                   },
                   fail:()=>{}
                })
             } else {
                this.$store.commit('ALERTF',{
                   content:'标题或时间间隔或权重不能为空',
                   confirmText:'我知道啦!'
                })
             }
          }
       },
       created() {
           
       },
       mounted() {
           let random = parseInt(Math.random()*10)%this.titleList.length;
           this.title = this.titleList[random];

           let transPlan = this.$route.params.plan;//路由传递过来的参数
           this.planIndex = this.$route.params.index;
           if(transPlan){
              this.isUpdate = true;//修改UI为更新计划模式

              this.plan.startTime = new Date(transPlan.startTime);//格式化时间
              this.plan.title = transPlan.startTime;
              this.plan.content = transPlan.content;
              this.plan.weight = transPlan.weight;
              this.plan.interval = transPlan.interval
           }

           //初始化为0点，否则日历不会记入今天的日子
           this.nowDate.setHours(0);
           this.nowDate.setMinutes(0);
           this.nowDate.setSeconds(0);
           this.nowDate.setMilliseconds(0);
       },
};
</script>

<style lang='scss' scoped>
   .container{
      width:100%;
      min-height:100vh;
   }
   .body{
      width:100%;
      padding:0 20px;
   }
   .center{
      width:100%;
      text-align: center;
   }
</style>