<template>
   <div>
      <div class="container">
         <header v-show="anm1">
            <p class="animate__animated"><span>Hi</span>,{{username}}</p>
         </header>
         <div class="missionVis" v-show="anm2">
            <div class="animate__animated" >
               <p >{{finishCnt}}</p>
               <p>今天完成的任务数</p>
            </div>
            <div class="animate__animated" >
               <p>{{surplusCnt}}</p>
               <p>今天剩余的任务数</p>
            </div>
         </div>
         <header v-show="anm3" class="animate__animated" >
            <md-button to="/planDetails" class="md-accent">查看计划</md-button>
         </header>
         <div class="addBtn animate__animated animate__bounceIn">
            <md-button class="md-fab md-primary" to="/add">
               <md-icon>add</md-icon>
            </md-button>
         </div>
         <div v-show="anm4">
            <div class="noMission" v-if="missions.length==0">
               <p v-if="plan.hasPlan&&finishCnt!=0&&surplusCnt==0" >牛逼嗷哥哥&姐姐!今天的计划任务都已经完成啦!</p>
               <p v-if="plan.hasPlan&&surplusCnt==0&&finishCnt==0" >今天..好像没有任务啊..点击右侧+按钮设定暂时任务</p>
               <p v-if="!plan.hasPlan">暂时还没有制定计划，请点击右侧+按钮进行计划的制定</p>
            </div>
            <div v-for="(item,index) in missions" :key="index">
               <mission :dataObj="item" :index="index"></mission>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
   import mission from '../../../components/mission.vue';
   import {mapState} from 'vuex';
   export default {
       components:{mission},
       props:{},
       data(){
           return{
               anm1:false,
               anm2:false,
               anm3:false,
               anm4:false
            }
       },
       computed: {
          finishCnt(){
             return this.$store.getters["main/finishCnt"];
          },
          missions(){
             return this.$store.state.main.missions;
          },
          username(){
             return this.$store.state.main.username;
          },
          surplusCnt(){
             return this.$store.getters["main/surplusCnt"];
          },
          focusCnt(){
             return this.$store.state.main.focusCnt;
          },
          plan(){
             return this.$store.state.main.plan;
          }
       },
       watch: {
           
       },
       methods: {
           
       },
       created() {
           
       },
       async mounted() {
           this.anm1 = true;
    
           this.anm2 = true;
         
           this.anm3 = true;
       
           this.anm4 = true;

           console.log(this.$store.state.main.plan)

       },
};
</script>

<style lang='scss' scoped>
      .addBtn{
         position:fixed;
         bottom:80px;
         right:10px;
         z-index:99;
      }
      .noMission{
         padding:20px;
         color:gray;
         text-align: center;
         font-size:18px;
      }
       .container{
          width:100%;
          >header{
             width:100%;
             margin:10px 0;
             padding:5px;
             font-size:20px;
             text-align: center;
             span{
                font-size:24px;
                font-weight:600;
             }
             .timeCnt{
                font-size:40px;
                margin-top:20px;
             }
          }
          >.missionVis{
             width:100%;
             display:flex;
             flex-direction: row;
             >div{
                width:50%;
                height:80px;
                text-align: center;
                >p:nth-child(1){
                   display:block;
                   margin-top:10px;
                   font-size:40px;
                }
                >p:nth-child(2){
                   margin-top:10px;
                   font-size:12px;
                }
             }
          }
       }
</style>