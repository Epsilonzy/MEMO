<template>
   <div class="container">
      <topBar 
      title="查看计划"
      iconLeft="keyboard_arrow_left" 
      @leftClick="back()"
      ></topBar>
      <div class="noMission" v-if="plans.length==0">
          <p>暂时还没有计划哦</p>
      </div>
      <div class="plan" v-for="(item,index) in plans" :key="index">
          <p class="title">{{item.title}}</p>
          <p class="date">计划将定于{{item.startTime}}开始</p>
          <p class="content">{{item.content}}</p>
          <p class="interval"><md-icon>alarm</md-icon>{{item.interval==0?'每天':item.interval+'天'}}</p>
          <p class="weight" 
          :class="{
              'weight-top':item.weight>=3,
              'weight-medium':item.weight==2,
              'weight-bottom':item.weight<=1
            }"     
          >{{weight[item.weight]}}</p>
          <div class="opList">
              <div @click="toUrl(item,index)">
                  <md-icon>edit</md-icon>
              </div>
              <div @click="deletePlan(index)">
                  <md-icon>delete</md-icon>
              </div>
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
               weight:['最低优先级','低优先级','中优先级','高优先级','最高优先级'],
               isStar:false
            }
       },
       computed: {
           plans(){
               return this.$store.state.main.plan.queue;
           }
       },
       watch: {
           
       },
       methods: {
          back(){
              window.history.back(-1);
          },
          toUrl(plan,index){
              this.$router.push({
                  name: 'AddMission',
                  params:{
                      plan:plan,
                      index:index
                  }
              })
          },
          deletePlan(index){
              this.$store.commit('CONFIRM',{
                   title:'提示',
                   content:'确认删除此计划吗?',
                   success:()=>{
                       this.$store.commit('main/DELETE_PLAN',index);
                   },
                   fail:()=>{}
              })
          }
       },
       created(){
       },
       mounted() {
           
       },
};
</script>

<style lang='scss' scoped>
      .noMission{
         padding:20px;
         color:gray;
         text-align: center;
         font-size:18px;
      }
    .plan{
        width:325px;
        margin:20px auto;
        height:auto;
        overflow: hidden;
        border-radius:10px;
        padding:10px;
        box-shadow:0px 0px 3px #666;
        position: relative;
        >.title{
            font-size:18px;
            margin-right:20px;
            clear: both;
        }
        >.content{
            margin:5px 0;
            clear: both;
        }
        >.interval{
            float: right;
            font-size:12px;
        }
        >.weight{
            right:10px;
            top:10px;
            position:absolute;
            font-size:12px;
            color:white;
            border-radius:10px;
            padding:0 4px;
        }
        >.date{
            font-size:11px;
            padding:0;
            color:rgba(0,0,0,0.5);
        }
        >.weight-top{
            background-color: #eb4310;
        }
        >.weight-medium{
            background-color: #0080ff;
        }
        >.weight-bottom{
            background-color: #99cc33;
        }
        >.opList{
            >div{
                float:left;
            }
            font-size:14px;
        }
    }
</style>