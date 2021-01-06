<template>
  <div id="app">
    <transition :name="routerTransition">
      <router-view class="child-view"/>
    </transition>
    <md-dialog-confirm
      :md-active.sync="$store.state.confirm.active"
      :md-title="$store.state.confirm.title"
      :md-content="$store.state.confirm.content"
      md-confirm-text="确认"
      md-cancel-text="取消"
      @md-cancel="$store.state.confirm.fail"
      @md-confirm="$store.state.confirm.success" />
    <md-dialog-alert
      :md-active.sync="$store.state.alertF.active"
      :md-content="$store.state.alertF.content"
      :md-confirm-text="$store.state.alertF.confirmText" />
    <md-dialog-alert
      :md-active.sync="$store.state.alertS.active"
      :md-title="$store.state.alertS.title"
      :md-content="$store.state.alertS.content"
      :md-confirm-text="$store.state.alertS.confirmText" />
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      routerTransition:''
    }
  },
  watch: {//使用watch 监听$router的变化
    $route(to, from) {
      //如果to索引大于from索引,判断为前进状态,反之则为后退状态
      window.scroll(0,0);
      if(to.meta.index > from.meta.index){
        //设置动画名称
        this.routerTransition = 'slide-left';
      }else if(to.meta.index < from.meta.index){
        this.routerTransition = 'slide-right';
      } else {
        this.routerTransition = 'slide-equal';
      }
    }
  }
}
</script>

<style>
*{
  margin:0;
  padding:0;
}
body{
  overflow:auto;
}
.child-view {  
  position: absolute;  
  left: 0;  
  top: 0;  
  width: 100%;  
  height: 100%;  
  transition: all .3s cubic-bezier(.55,0,.1,1);  
}  
    .slide-equal-enter-active,
    .slide-equal-leave-active{
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
    .slide-equal-enter,
    .slide-equal-leave-active {
      opacity: 0;
      transform: scale(0.9);
    }
    .slide-left-enter, .slide-right-leave-active {  
      opacity: 0;  
      -webkit-transform: translate(30px, 0);  
      transform: translate(30px, 0);  
    }  
    .slide-left-leave-active, .slide-right-enter {  
      opacity: 0;  
      -webkit-transform: translate(-30px, 0);  
      transform: translate(-30px, 0);  
    }  
    /* .slide-right-enter-active,
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
    } */
</style>
