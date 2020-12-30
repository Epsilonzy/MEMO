<template>
   <div> 
       <div class="container">
            <md-bottom-bar md-type="fixed" :md-theme="'bottom-bar-' + theme">
                <md-bottom-bar-item md-label="任务" md-icon="add_comment" @click="setTheme('blue','MainPage')"  ></md-bottom-bar-item>
                <md-bottom-bar-item md-label="我的" md-icon="cloud" @click="setTheme('red','MinePage')" ></md-bottom-bar-item>
                <md-bottom-bar-item md-label="暂无" md-icon="cloud" @click="setTheme('yellow','')" ></md-bottom-bar-item>
                <md-bottom-bar-item md-label="暂无" md-icon="cloud" @click="setTheme('pink','')" ></md-bottom-bar-item>
            </md-bottom-bar>
        </div>
   </div>
</template>

<script>
   export default {
       components:{},
       props:{},
       data(){
           return{
                theme: 'blue'
            }
       },
       computed: {
           
       },
       watch: {
           
       },
       methods: {
            setTheme(theme,path) {
                this.theme = theme;
                this.$router.push({name:path});
            }
       },
       created() {
           
       },
       mounted() {
           
       },
};
</script>

<style lang='scss' scoped>
  @import "../../config/theme/engine.scss";

  @include md-register-theme("bottom-bar-teal", (
    primary: md-get-palette-color(teal, A200)
  ));

  @include md-register-theme("bottom-bar-orange", (
    primary: md-get-palette-color(orange, A200)
  ));

  @include md-register-theme("bottom-bar-blue", (
    primary: md-get-palette-color(blue, A200),
    accent: md-get-palette-color(red, A200)
  ));

  @include md-register-theme("bottom-bar-red", (
    primary: md-get-palette-color(red, A200)
  ));
  @import "../../config/theme/all";
  .container{
      position:fixed;
      bottom:0;
      width:100%;
      z-index:99;
  }
</style>