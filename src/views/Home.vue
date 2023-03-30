<template>
  <div style="padding-top:20px;" class="showhtml" >
     <div class="content" v-html="showhtml">

     </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive,ref,nextTick, toRefs } from 'vue';
import { getDocValue,getDemoData} from "./pageEditor/script/index";//数据存储本地
export default defineComponent({
   name: 'Home',
   components: {
   },
   setup() {
    document.title="dom直接渲染"
    const value =  localStorage.getItem(`htmlvalue`);
    console.log("渲染:",value)
    const showhtml=value
    return{
      showhtml,
    }
   }
  });
</script>

<style lang="scss" scoped>
.showhtml{
    width: 100%;
    height: 100%;
    display: inline-flex;
    background: #f3f5f7;
  .content{
    width: 793.667px;
    margin: 0 auto;
    margin: 12px auto;
    background-color: #ffffff;
    padding: 0px 40px 0px 40px;
  }
}
:deep(.am-engine p){
      white-space: normal;
      margin: 0;
      line-height: 1.74;
    }
</style>
