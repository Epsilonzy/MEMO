<template>
   <div>
       <div class="container">
           <div class="leftBox" @click="leftClickS()">
                <md-icon id="iconL">{{iconLeft}}</md-icon>
           </div>
           <p class="title">{{title}}</p>
           <div class="rightBox" @click="rightClickS()">
                <md-icon id="iconR">{{iconRight}}</md-icon>
           </div>
       </div>
   </div>
</template>

<script>
   export default {
       components:{},
       props:{
           title:String,
           iconLeft:{
               type:String,
               default:""
           },
           iconRight:{
               type:String,
               default:""
           },
           leftClick:{
               type:Function,
               default:()=>{
                   console.log('left')
               }
           },
           rightClick:{
               type:Function,
               default:()=>{
                   console.log('right')
               }
           }
        },
       data(){
           return{
               
            }
       },
       computed: {
           
       },
       watch: {
           
       },
       methods: {
           leftClickS(){
               this.$emit('leftClick');
           }
       },
       created() {
           
       },
       mounted() {
 
       },
};
</script>

<style lang='scss' scoped>
    @import '@/config/style.scss';
    .container{
        font-size:18px;
        width:100%;
        height:50px;
        background-color: #448aff;
        position: relative;
        >p{
            position:absolute;
            width:50%;
            left:0;
            top:0;
            right:0;
            bottom:0;
            margin:auto;
            color:white;
            font-weight: 600;
            letter-spacing: 3px;
            text-align: center;
            line-height: 50px;
        }
        .leftBox{
            float: left;
            line-height: 50px;
            margin-left:20px;
            height:50px;
            text-align: center;
        }
        .rightBox{
            float: right;
            line-height: 50px;
            margin-right:20px;
            height:50px;
            text-align: center;
        }
        #iconL{
            color:white;
            font-size:40px !important;
            text-align: center;
        #iconR{
            color:white;
            font-size:40px !important;
            text-align: center;
        }
      }
    }
</style>