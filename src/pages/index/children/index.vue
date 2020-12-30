<template>
   <div>
      <div class="container">
         <header v-show="anm1">
            <p class="animate__animated" :class="{animate__bounceInDown:anm1}"><span>Hi</span>,{{username}}</p>
         </header>
         <div class="missionVis" v-show="anm2">
            <div class="animate__animated" :class="{animate__backInLeft:anm2}">
               <p class="animate__bounceIn">{{finishCnt}}</p>
               <p>完成的任务数</p>
            </div>
            <div class="animate__animated" :class="{animate__backInRight:anm2}">
               <p>{{surplusCnt}}</p>
               <p>剩余的任务数</p>
            </div>
         </div>
         <header v-show="anm3" class="animate__animated" :class="{animate__backInUp:anm3}">
            <p>专注时间总长</p>
            <p class="timeCnt">{{focusCnt}}<span>min</span></p>
            <md-button to="/focus" class="md-accent">开始专注</md-button>
         </header>
         <div class="addBtn animate__bounceIn">
            <md-button class="md-fab md-primary" to="/add">
               <md-icon>add</md-icon>
            </md-button>
         </div>
         <div class="missionField animate__animated" :class="{animate__bounceInUp:anm4}" v-show="anm4">
            <div class="noMission" v-if="missions.length==0">
               <p>暂时还没有设置任务哦，请点击右侧+按钮进行添加</p>
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
               anm4:false,
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
           await this.Sleep(100);
           this.anm2 = true;
           await this.Sleep(100);
           this.anm3 = true;
           await this.Sleep(300);
           this.anm4 = true;
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