<template>
   <div class="timer">
       <button @click="sub()">-</button>
       <span :class="{after:isAfter,before:isBefore}" :data-before="countBefore" :data-after="countAfter">{{count}}</span>
       <button @click="add()">+</button>
   </div>
</template>

<script>
   export default {
       components:{
           
       },
       props:{
           minTime:{
               type:Number,
               default:10
           },
           timeDefault:{
               type:Number,
               default:10
           },
           maxTime:{
               type:Number,
               default:120
           },
           interval:{
               type:Number,
               default:10
           },
           showTime:{
               type:Function,
               default:()=>{}
           }
       },
       data(){
           return{
               count:0,
               isBefore:false,
               isAfter:false,
               lock:true//时间锁
            }
       },
       computed: {
           countBefore(){
               if(this.count<=this.minTime||this.count-this.interval<this.minTime){
                   return "-∞"
               }
               return this.count -this.interval;
           },
           countAfter(){
               if(this.count>=this.maxTime||this.count+this.interval>this.maxTime){
                   return "∞"
               }
               return this.count +this.interval;
           }
       },
       watch: {
           
       },
       methods: {
           add(){
               if(this.count+this.interval>this.maxTime||!this.lock){
                    return;
               }
               this.lock = false;
               this.isAfter = true;
               setTimeout(()=>{
                   this.count+=this.interval;
                   this.$emit('showTime',this.count);
                   this.isAfter = false;
                   this.lock = true;
               },200)
               
           },
           sub(){
               if(this.count-this.interval<this.minTime||!this.lock){
                    return;
               }
               this.lock = false;
               this.isBefore = true;
               setTimeout(()=>{
                   this.count-=this.interval;
                   this.$emit('showTime',this.count);
                   this.isBefore = false;
                   this.lock = true;
               },200)
           }
       },
       created() {
           
       },
       mounted() {
           this.count = this.timeDefault;
       },
};
</script>

<style lang='scss' scoped>
    .timer{
        width:300px;
        height:96px;
        background-color: black;
        border-radius:15px;
        display:flex;
        overflow: hidden;
        padding:18px 0;
        position: relative;
        box-shadow:0px 3px 12px rgba(0,0,0,0.2)
    }
    .timer::after{
        content:"";
        position:absolute;
        top:0;
        left:0;
        background-color: black;
        width:100%;
        height:100%;
        background:linear-gradient(
            180deg,rgba(0,0,0,0.9) 0%,rgba(0,0,0,0) 30%,
            rgba(0,0,0,0) 70%,rgba(0,0,0,0.9) 100%
        )
    }
    span{
        display:block;
        color:white;
        font-size:50px;
        line-height: 60px;
        flex:1 1 300px;
        text-align: center;
        transform: translateY(-60px);
    }
    span.after{
        transform: translateY(-120px);
        transition:.2s ease-in
    }
    span.before{
        transform: translateY(0px);
        transition:.2s ease-in
    }
    span::before{
        display:block;
        content:attr(data-before);
    }
    span::after{
        display:block;
        content:attr(data-after);
    }
    button{
        flex:0 0 72px;
        border:0;
        background: none;
        color:white;
        font-size:40px;
        line-height: 60px;
        margin:0;
        padding:0;
        width:60px;
        height:60px;
        position: relative;
        z-index:100;
    }
</style>