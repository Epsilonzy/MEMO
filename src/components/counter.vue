<template>
   <div class="counter">
       <p>
         <span class="hour" :class="{topToDown1:frames5,topToDown2:frames6}">{{hour}}</span>:<span class="minute" :class="{topToDown1:frames3,topToDown2:frames4}">{{minute}}</span>:<span class="second" :class="{topToDown1:frames1,topToDown2:frames2}">{{second}}</span>
       </p>
   </div>
</template>

<script>
   export default {
       components:{},
       props:{
           time:{
               type:Number,
               default:0
           },
           finish:{
               type:Function,
               default:()=>{}
           }
       },
       data(){
           return{
               minute:0,
               second:0,
               hour:0,
               frames1:false,
               frames2:false,
               frames3:false,
               frames4:false,
               frames5:false,
               frames6:false
            }
       },
       computed: {
           
       },
       watch: {
           
       },
       methods: {
           secAnm(cb){
               this.frames1 = true;
               setTimeout(()=>{
                    this.frames1 = false;
                    this.frames2 = true;
                    cb();
                    setTimeout(()=>{
                        this.frames2 = false;
                    },300);
                },300)
           },
           minAnm(cb){
               this.frames3 = true;
               setTimeout(()=>{
                    this.frames3 = false;
                    this.frames4 = true;
                    cb();
                    setTimeout(()=>{
                        this.frames4 = false;
                    },300);
                },300)
           },
           hourAnm(cb){
               this.frames5 = true;
               setTimeout(()=>{
                    this.frames5 = false;
                    this.frames6 = true;
                    cb();
                    setTimeout(()=>{
                        this.frames6 = false;
                    },300);
                },300)
           }
       },
       created() {
           
       },
       mounted() {
           this.hour = parseInt(this.time/60);
           this.minute = this.time%60;
           console.log(this.hour,this.minute,this.second);
           let counter = setInterval(()=>{
               if(this.second==0){
                   if(this.minute==0){
                       if(this.hour==0){
                           clearInterval(counter);
                           this.hour = 0;
                           this.minute = 0;
                           this.second = 0;
                           this.$emit("finish");
                       } else {
                           this.hourAnm(()=>{
                               this.hour--;
                           })
                           this.minAnm(()=>{
                               this.minute = 59;
                           })
                       }
                   } else {
                       this.minAnm(()=>{
                           this.minute--;
                       })
                       this.secAnm(()=>{
                           this.second = 59;
                       })
                   }
               } else {
                   this.secAnm(()=>{
                       this.second--;
                   })
               }
           },1000);
       },
};
</script>

<style lang='scss' scoped>
       span.topToDown1{
           transition:.3s ease-in;
           opacity:0;
           transform: translateY(60px) scale(.5);
       }
       span.topToDown2{
           opacity:0;
           transform: translateY(-60px) scale(.5);
           animation: topToDown .3s ease-in;
       }
       @keyframes topToDown{
           100%{
               opacity: 1;
               transform: translateY(0px) scale(1);
           }
       }
       .counter{
           padding:10px 0;
           width:300px;
           height:80px;
           font-size:60px;
           display:block;
           text-align: center;
           color:rgba(255,255,255,0.8);
           >p{
               text-shadow:0 0 4px rgba(255,255,255,0.4);
               line-height:60px;
               display:flex;
               justify-content: center;
               flex-direction: row;
               >span{
                  display:block;
               }
           }
       }
</style>