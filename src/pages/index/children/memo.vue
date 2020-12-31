<template>
   <div>
      <div class="addBtn animate__animated animate__bounceIn">
         <md-button class="md-fab md-primary" to="/addMemo">
            <md-icon>add</md-icon>
         </md-button>
      </div>
      <div class="memo" v-for="(item,index) in memos" :key="index">
         <p class="date">{{item.timeYMD}}</p>
         <div class="detailsBox">
            <p class="title"><span class="time">{{item.timeHMS}}</span>{{item.title}}</p>
            <p class="review">{{item.content[0]}}</p>
         </div>
      </div>
   </div>
</template>

<script>
   export default {
       components:{},
       props:{},
       data(){
           return{
               
            }
       },
       computed: {
           memos(){
              return this.$store.state.memo.memos;
           }
       },
       watch: {
           
       },
       methods: {
           
       },
       created() {
           
       },
       mounted() {
           this.$nextTick(()=>{
            console.log(document.documentElement.scrollTop);
            document.documentElement.scrollTop = 0;
         });
       },
       created(){
       }
};
</script>

<style lang='scss' scoped>
   .addBtn{
      position:fixed;
      bottom:80px;
      right:10px;
      z-index:99;
   }
   .memo{
      width:100%;
      margin: 20px auto;
      >.date{
         font-size:16px;
         font-weight: 600;
         margin-left: 10px;
      }
      >.detailsBox{
         width:320px;
         border-radius:5px;
         box-shadow:0px 1px 3px rgba(0,0,0,0.3);
         margin:5px auto;
         overflow: hidden;
         >.title{
            width:310px;
            font-size:16px;
            margin-left:5px;
            margin-top:10px;
            margin-bottom:10px;
            word-break:break-all;
            white-space:nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            >.time{
               font-size:14px;
               color:#4078f2;
               margin-left:5px;
               margin-right:10px;
            }
         }
         >.review{
            width:310px;
            font-size:14px;
            margin:5px auto;
            color:rgba(0,0,0,0.6);
            word-break: break-all;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
         }
      }
   }
</style>