<template>
   <div class="container">
      <topBar title="添加任务" iconLeft="keyboard_arrow_left" @leftClick="back()"></topBar>
      <div class="body">
          <md-card-header class="animate__animated animate__bounce">
            <div class="md-title">{{title}}</div>
          </md-card-header>
          <md-field class="animate__animated animate__fadeInLeft">
            <label>任务标题</label>
            <md-input v-model="mission.title"></md-input>
            <span class="md-helper-text">不如起一个醒目的标题(ง •_•)ง</span>
          </md-field>
          <md-field class="animate__animated animate__fadeInRight">
            <label>任务内容</label>
            <md-textarea v-model="mission.content" md-autogrow></md-textarea>
            <span class="md-helper-text">可以按回车哦,设定的目标一定要做哦o(￣ヘ￣o＃)</span>
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
               title:'',
               titleList:['来加任务啦?♪(^∇^*)','添加新任务','川流不息,生命无止'],
               mission:{
                  title:'',
                  content:''
               }
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
             if(this.mission.title!=""&&this.mission.content!=""){
                this.$store.commit('CONFIRM',{
                   title:'提示',
                   content:'确认添加新任务吗?',
                   success:()=>{
                      this.$store.commit('main/ADD',this.mission);
                      window.history.back(-1);
                   }
                })
             } else {
                this.$store.commit('ALERTF',{
                   content:'任务标题或内容不能为空',
                   confirmText:'我知道啦!'
                })
             }
          }
       },
       created() {
           
       },
       mounted() {
           let random = parseInt(Math.random()*10)%3;
           this.title = this.titleList[random];
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