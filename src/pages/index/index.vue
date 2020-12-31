<template>
   <div class="container">
       <topbar title="不知道起什么名"></topbar>
       <div class="body">
           <transition :name="routerTransition">
                <router-view></router-view>
           </transition>
       </div>
       <tabbar></tabbar>
   </div>
</template>

<script>
   import topbar from '../layout/topbar.vue';
   import tabbar from '../layout/tabbar.vue'
   export default {
       components:{topbar,tabbar},
       props:{},
       data(){
           return{
               routerTransition:''
            }
       },
       computed: {
           
       },
       watch: {
           $route(to, from) {
            //如果to索引大于from索引,判断为前进状态,反之则为后退状态
                if(to.meta.index > from.meta.index){
                    //设置动画名称
                    this.routerTransition = 'slide-left';
                }else if(to.meta.index < from.meta.index){
                    this.routerTransition = 'slide-right';
                } else {
                    this.routerTransition = 'slide-equal';
                }
            }
       },
       methods: {
           
       },
       created() {
           
       },
       mounted() {
           this.$store.dispatch("main/initLocal");
           this.$store.dispatch("memo/initLocal");
       }
    };
</script>

<style lang='scss' scoped>
        body{
            overflow:hidden;
        }
       .container{
           min-height:100vh;
       }
       .body{
           margin-bottom:65px;
           position:relative;
       }
       .slide-equal-enter-active,
    .slide-equal-leave-active{
      will-change: transform;
      transition: all 300ms;
    //   position: absolute;
    //   top:0;
    //   left:0;
    //   bottom:0;
    //   right:0;
    //   height:100%;
    //   width:100%;
    }
    .slide-equal-enter,
    .slide-equal-leave-active {
      opacity: 0;
      transform: scale(0.9);
    }
    .slide-right-enter-active,
    .slide-right-leave-active,
    .slide-left-enter-active,
    .slide-left-leave-active {
        will-change: transform;
        transition: all 300ms;
        position: absolute;
        top:0;
        left:0;
        bottom:0;
        right:0;
        height:100%;
        width:100%;
    }
    .slide-right-enter {
      opacity: 0;
      transform: translate3d(-100%, 0, 0);
    }
    .slide-right-leave-active {
      opacity: 0;
      transform: translate3d(100%, 0, 0);
    }
    .slide-left-enter {
      opacity: 0;
      transform: translate3d(100%, 0, 0);
    }
    .slide-left-leave-active {
      opacity: 0;
      transform: translate3d(-100%, 0, 0);
    }
</style>