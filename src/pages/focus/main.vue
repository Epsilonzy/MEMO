<template>
   <div class="body">
       <div class="background"></div>
       <div class="counter">
           <counter :time="time" @finish="finish()"></counter>
       </div>
       <div :class="{finish:isFinish}" v-show="isFinish">
           <p class="animate__animated animate__bounceIn">恭喜你，坚持了下来!</p>
           <button class="animate__animated animate__bounceIn" @click="back()">返回主页</button>
       </div>
   </div>
</template>

<script>
   import counter from '../../components/counter'    
   export default {
       components:{counter},
       props:{},
       data(){
           return{
               time:0,
               isFinish:false
            }
       },
       computed: {
           
       },
       watch: {
    
       },
       methods: {
          finish(){
              this.isFinish = true;
              this.$store.commit('main/ADDFOCUS',this.time);
          },
          back(){
              this.$router.push({
                  path:'/index'
              })
          }
       },
       created() {
           this.time = parseInt(this.$route.query.time);
       },
       mounted() {
           
       },
};
</script>

<style lang='scss' scoped>
       @import '../../config/style.scss';
       .finish{
           width:100%;
           height:100vh;
           position: absolute;
           background-color: #fff;
           animation:fadeIn .3s linear;
           text-align: center;
           >p{
               display:block;
               margin:50px;
               font-size:24px;
           }
           >button{
               margin-top:30px;
               @include zy-button-large
           }
       }
       @keyframes fadeIn{
           0%{
               opacity:0;
           }
           100%{
               opacity:1;
           }
       }
       .body{
           width:100%;
           height:100vh;
           position: relative;
           z-index:1;
       }
       .body:before{
           display:block;
           content:"";
           width:100%;
           height:100vh;
           position:absolute;
           top:0;
           left:0;
           z-index:-1;
           background-image:url('../../assets/bg.jpg');
           background-size:cover;
           filter: blur(10px);
       }
       .counter{
           position:absolute;
           margin:auto;
           left:0;
           right:0;
           bottom:0;
           top:-200px;
       }
       .background{
           width:100%;
           height:100vh;
           position:absolute;
           z-index:0;
           background-color: rgba(0,0,0,.4);
       }

</style>