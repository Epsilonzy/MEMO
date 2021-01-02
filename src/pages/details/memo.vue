<template>
   <div class="container">
      <topBar 
      :title="isEdit?'编辑备忘录':'查看备忘录'"
      iconLeft="keyboard_arrow_left" 
      @leftClick="back()"
      :iconRight="isEdit?'check':'library_books'"
      @rightClick="edit()"
      ></topBar>
      <div class="body">
          <div v-show="isEdit">
          <md-field class="animate__animated">
            <label>备忘录标题</label>
            <md-input v-model="memo.title" :disabled="!isEdit"></md-input>
          </md-field>
          <textarea 
          class="zy-textarea" 
          v-model="memo.contentRaw" 
          placeholder="在这里输入备忘录内容" 
          :disabled="!isEdit"
          ></textarea>
          </div>
          <div v-show="!isEdit">
              <p class="title">{{memo.title}}</p>
                <p class="content" v-for="(item,index) in memo.content" :key="index">
                    {{item}}
                </p>
          </div>
      </div>
   </div>
</template>

<script>
   import topBar from '../layout/topbar';
   export default {
       components:{topBar},
       props:{},
       data(){
           return{
               memo:{
                  title:'',
                  contentRaw:"",
                  content:[]
               },
               index:-1,
               isEdit:false,
               date:void 0,
               id:''
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
          submit(){
                this.$store.commit('memo/UPDATE',{
                    data:this.memo,
                    index:this.index,
                    id:this.id
                });
                this.isEdit = !this.isEdit;
                this.initMemo(this.index);//重新加载备忘录内容
          },
          back(){
             if(this.isEdit){
                this.$store.commit('CONFIRM',{
                    title:'提示',
                    content:'确认保存吗?',
                    success:()=>{
                        if(this.memo.title!=""&&this.memo.contentRaw!=""){
                            this.submit();
                            window.history.back(-1);
                        } else {
                             this.$store.commit('ALERTF',{
                                content:'标题或内容不能为空',
                                confirmText:'我知道啦!'
                            })
                        }
                    },
                    fail:()=>{
                        this.isEdit = !this.isEdit;
                    }
                })
             }
          },
          edit(){
              if(this.isEdit){
                   if(this.memo.title!=""&&this.memo.contentRaw!=""){
                        this.$store.commit('CONFIRM',{
                            title:'提示',
                            content:'确认保存吗?',
                            success:()=>{
                                this.submit();
                            },
                            fail:()=>{
                                this.isEdit = !this.isEdit;
                            }
                        })
                    } else {
                        this.$store.commit('ALERTF',{
                            content:'标题或内容不能为空',
                            confirmText:'我知道啦!'
                        })
                    }
              } else {
                   this.$store.commit('CONFIRM',{
                        title:'提示',
                        content:'确认开始编辑吗?',
                        success:()=>{
                            this.isEdit = !this.isEdit;
                        }
                    })
              }
          },
          initMemo(index){
                this.memo.contentRaw = this.memos[index].contentRaw;
                this.memo.title = this.memos[index].title;
                this.memo.content = this.memos[index].content;
          }
       },
       created(){
       },
       mounted() {
           let index = this.$route.params.index;
           let id = this.$route.params.id;
           this.index = index;
           this.id = id;
           this.initMemo(index);
           //获取高度，让textarea自适应
           //console.log(document.height);
       },
};
</script>

<style lang='scss' scoped>
   .body{
      margin:0 20px;
   }
   .date{
      text-align: center;
      font-size:18px;
      margin:10px auto;
      font-weight: 600;
   }
   .zy-textarea{
       width:100%;
       min-height:360px;
       font-size:16px;
       background:none;
       font-weight:600;
       border:none;
       resize: none;
       height:auto;
       color:rgba(0,0,0,0.8)
   }
   .title{
       font-size:24px;
       font-weight: 600;
       margin:20px auto;
   }
   .content{
       font-size:16px;
       margin:10px auto;
   }
</style>