<template>
   <div> 
       <div class="container">
            <md-bottom-bar md-type="fixed" :md-theme="'bottom-bar-' + theme" :md-active-item="$store.state.tabbarSelected">
                <md-bottom-bar-item id="MainPage" md-label="任务" md-icon="add_comment" @click="setTheme('blue','MainPage')"  ></md-bottom-bar-item>
                <md-bottom-bar-item id="MemoPage" md-label="备忘录" md-icon="folder" @click="setTheme('blue','MemoPage')" ></md-bottom-bar-item>
                <md-bottom-bar-item id="AccountPage" md-label="记账本" md-icon="dock" @click="setTheme('blue','AccountPage')" ></md-bottom-bar-item>
                <md-bottom-bar-item id="MinePage" md-label="我的" md-icon="dashboard" @click="setTheme('red','MinePage')" ></md-bottom-bar-item>
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
                theme: 'blue',
                pathCur: 'MainPage'
            }
       },
       computed: {

       },
       watch: {
           
       },
       methods: {
            setTheme(theme,path) {
                if(path!=this.pathCur){
                  this.pathCur = path;
                  console.log(theme,path,this.$store.state.tabbarSelected);
                  this.theme = theme;
                  this.$store.commit("CHANGE_TABBAR",path);
                  this.$router.push({name:path});
                }
            }
       },
       created() {
           
       },
       mounted() {
          const pathName = this.$route.name;
          if(this.pathCur!=pathName){
            this.pathCur = pathName;
            this.$store.state.tabbarSelected = pathName;
          }
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