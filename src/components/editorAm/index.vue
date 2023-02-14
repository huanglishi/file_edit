<template>
    <div class="edit-box">
        <div class="ed-container">
            <!--左边工具栏-->
            <div class="ed-aside left-panel">
                <div class="ed-scrollbar" style="height: 780px;">
                    <div class="ed-scrollbar-wrap">
                        <div class="ed-scrollbar-view">
                            <div class="panel-container">
                                <!--分类切换-->
                                <el-tabs v-model="left_tool_type" class="ed-tabs" :stretch="true">
                                    <el-tab-pane name="module">
                                        <template #label>
                                            <span class="custom-tabs-label">
                                            <el-icon><Calendar /></el-icon>
                                            <span>组件库</span>
                                            </span>
                                        </template>
                                        <div class="module-list-box">
                                            <module-list></module-list>
                                        </div>
                                    </el-tab-pane>
                                    <el-tab-pane name="template">
                                        <template #label>
                                            <span class="custom-tabs-label">
                                                <el-icon><Memo /></el-icon>
                                            <span>模板库</span>
                                            </span>
                                        </template>
                                       
                                        模板库
                                    </el-tab-pane>
                                </el-tabs>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="ed-container is-vertical center-layout-container">
                <!--头部工具区-->
                <div class="ed-header toolbar-header">
                    <div class="toolbar-container">
                        
                    </div>
                </div>
                <!--编辑区-->
                <div class="ed-main form-widget-main">
                    <el-scrollbar  height="780px">
                        <div class="form-widget-container">
                         <div class="container-raw" ref="editZoomRef">
                             <!--纵向排版·A4纸大小-->
                             <template v-if="pesetting=='vertical'">
                                <div class=" verticalA4"   >
                                    1
                                </div>
                                <div class=" verticalA4"  >
                                    2
                                </div>
                            </template>
                            <!--横向排版·A4纸大小-->
                            <div class="horizontalA4" v-if="pesetting=='horizontal'">

                            </div>
                         </div>
                        </div>
                    </el-scrollbar>
                </div>
            </div>
            <!--右边组件编辑工具-->
            <div class="ed-aside right-panel">
                <div class="ed-container panel-container">
                    <!--属性编辑-->
                    <el-tabs v-model="edit_type" class="ed-tabs" :stretch="false" style="height: 100%;width: 100%;overflow: hidden;">
                        <!--考虑动态组件-->
                        <el-tab-pane label="组件设置" name="module">
                            组件库
                        </el-tab-pane>
                        <el-tab-pane label="高级设置" name="template">
                            模板库
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts"  >
import { defineComponent, onMounted, reactive,ref,nextTick, toRefs } from 'vue';
import { ModuleList } from './component'
import { Calendar,Memo } from '@element-plus/icons-vue'
export default defineComponent({
  name: 'fileeditor',
  // 注册组件
  components: {
    ModuleList,
    Calendar,Memo
  },
  setup() {
    const pesetting=ref("vertical")
    const left_tool_type=ref("module")
    const edit_type=ref("module")
    const editZoomVal=ref(100)

    const state = reactive<any>({
        editZoomRef: null, // 底部导航栏组件
    })
        
    // 缩小编辑区
    const handleChangeZoom=(val:any)=>{
        nextTick(() => {
            const editZoomRefProxy: any = state.editZoomRef; 
            editZoomRefProxy.style.zoom = val+ "%"; 
        })
    }
   //切换排版
   const handleChangPB=()=>{
      editZoomVal.value=100
      handleChangeZoom(editZoomVal.value)
   }
    return {
      ...toRefs(state),
      pesetting,
      left_tool_type,
      edit_type,
      editZoomVal,
      handleChangeZoom,handleChangPB,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "./style/index.scss";
</style>