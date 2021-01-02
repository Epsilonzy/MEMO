<template>
   <div class="container">
      <topBar title="发布备忘录" iconLeft="keyboard_arrow_left" @leftClick="back()"></topBar>
      <div class="body">
          <p class="date">{{date}}</p>
          <md-field class="animate__animated">
            <label>备忘录标题</label>
            <md-input v-model="memo.title"></md-input>
          </md-field>
          <md-field>
            <label>备忘录内容</label>
            <md-textarea v-model="memo.contentRaw" placeholder="在这里输入备忘录内容" md-autogrow></md-textarea>
         </md-field>
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
               memo:{
                  id:'',
                  title:'',
                  content:'',
                  contentRaw:"",
                  time:'',
                  timeHMS:'',
                  timeYMD:'',
                  updateTime:[]
               },
               date:void 0
            }
       },
       computed: {
           
       },
       watch: {
           
       },
       methods: {
          back(){
             window.history.back();
          },
          submit(){
             if(this.memo.title!=""&&this.memo.contentRaw!=""){
                this.$store.commit('CONFIRM',{
                   title:'提示',
                   content:'确认添加新任务吗?',
                   success:()=>{
                      this.$store.commit('memo/ADD',this.memo);
                      window.history.back(-1);
                   }
                })
             } else {
                this.$store.commit('ALERTF',{
                   content:'标题或内容不能为空',
                   confirmText:'我知道啦!'
                })
             }
          }
       },
       created() {
           
       },
       mounted() {
           let d = new Date();
           this.memo.timeYMD = `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
           this.date = this.memo.timeYMD;
       },
};
</script>

<style lang='scss' scoped>
   .body{
      margin:0 20px;
   }
   .date{
      text-align: center;
      font-size:18px;
      margin:10px auto;
      font-weight: 600;
   }
   .center{
      margin-top:80px;
      width:100%;
      text-align: center;
   }
</style>