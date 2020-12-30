<template>
   <div>
       <topBar title="开始专注吧" iconLeft="keyboard_arrow_left" @leftClick="back()"></topBar>
       <div class="body">
           <h2 style="color:grey" class="animate__animated animate__headShake">请设定专注时间(单位min)</h2>
           <timer @showTime="getTime" :minTime="1" :maxTime="60" :interval="5" :timeDefault="1" class="animate__animated animate__jello"></timer>
           <button @click="toMain()" class="button animate__animated animate__heartBeat">开始!</button>
       </div>
   </div>
</template>

<script>
   import timer from '../../components/timer'
   import topBar from '../layout/topbar'
   export default {
       components:{topBar,timer},
       props:{},
       data(){
           return{
               time:1,
               minTime:0,
               maxTime:0,
               interval:0
            }
       },
       computed: {
           
       },
       watch: {
           
       },
       methods: {
           back(){
               this.$router.push({
                   path:'/index'
               })
           },
           getTime(value){
               this.time = value;
           },
           toMain(){
               this.$store.commit('CONFIRM',{
                   title:'警告',
                   content:'注意！开始专注后，将无法退出，请确认您是否准备好了？',
                   success:()=>{
                       this.$router.push({
                        path:"/focusMain",
                        query:{
                            time:this.time
                        }
                    })
                   }
               })
           }
       },
       created() {
           
       },
       mounted() {
           
       },
};
</script>

<style lang='scss' scoped>
    @import '../../config/style.scss';
    .body{
        width:100%;
        display:flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;
        text-align: center;
        >h2{
            margin:20px 0;
        }
        .timer{
            margin:10px auto;
        }
        .button{
            margin:20px auto;
            @include zy-button-large;
        }
    }
</style>