<template>
   <div class="animate__bounceIn">
       <md-card>
         <md-card-header>
            <div class="md-title">{{dataObj.title}}</div>
         </md-card-header>
         <md-card-content>
            {{dataObj.content}}
         </md-card-content>
         <md-card-actions>
            <md-button class="md-accent" @click="cancel(index)">取消</md-button>
            <md-button class="md-primary" @click="finish(index)">完成</md-button>
         </md-card-actions>
    </md-card>
   </div>
</template>

<script>
   export default {
       components:{},
       props:{
           dataObj:Object,
           index:Number
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
           cancel(index){
            //   alert(index);
               this.$store.commit('CONFIRM',{
                title:'提示',
                content:"确认删除此任务吗?",
                success:()=>{
                    this.$store.commit("main/DELETE",index);
                }
            })
           },
           finish(index){
               this.$store.commit('CONFIRM',{
                  title:'提示',
                  content:"确认完成此任务吗?真的确定吗?你真的完成了吗???",
                  success:()=>{
                     this.$store.commit("main/FINISH",index);
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
       .md-card{
          width:320px;
          margin:10px auto;
       }
</style>