<template>
    <div class="container">
        <router-link :to="{path:'index'}">
            <div class="anmBox">
                <div class="collection">
                </div>
                <p>点击开始</p>
            </div>
        </router-link>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                
            }
        },
        computed:{
        //    test(){
        //        return this.$store.state.main.test;
        //    }
        },
        mounted(){
            // this.$store.dispatch('main/getTest');
            let first = false;
            mui.back = function(){
               if(!first){
                   first = true;
                   mui.toast("再次点击就退出程序(杀进程)\(@^0^@)/")
                   setTimeout(()=>{
                       first = false;
                   },1000);
               } else {
                   plus.runtime.quit();
               }
            }
        },
        destroyed(){
            mui.back = function(){
                window.history.back(-1);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .container{
        position: relative;
        width:100%;
        min-height:100vh;
        background-image: linear-gradient(#ead6ee,#a0f1ea);
        // background-color: black;
        .anmBox{
            position:absolute;
            margin:auto;
            top:0;
            left:0;
            right:0;
            bottom:0;
            width:100px;
            height:100px;
            filter:contrast(10);
            >p{
                top:0;
                left:0;
                right:0;
                bottom:0;
                position:absolute;
                margin:auto;
                font-size:16px;
                min-width:60px;
                height:50px;
                line-height:50px;
                text-align: center;
                color:rgba(0,0,0,0.5);
                font-weight:600
            }
            >.collection{
                width:100px;
                height:100px;
                background-color: #fff;
                border-radius:50%;
                filter: blur(10px);
                animation: 3s collection linear infinite;
            }
            @keyframes collection{
                0%{
                    transform: scale(1) rotate(0deg);
                }
                50%{
                    transform: scale(1) rotate(100deg);
                    width:90px;
                    border-top-left-radius:40%;
                    border-bottom-left-radius:45%;
                }
                100%{
                    transform: scale(1) rotate(360deg);
                }
            }
        }
    }
</style>