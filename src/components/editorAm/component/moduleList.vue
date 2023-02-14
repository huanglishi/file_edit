<template>
    <div class="module-list">
        <el-collapse v-model="activeName" >
            <el-collapse-item v-for="item in mdata" :title="item.title" :name="item.id">
                <div class="block-box">
                    <div class="block-item" v-for="list in item.block" :key="list.key">
                        <span class="custom-tabs-label">
                            <svg-icon :iconName="list.icon"></svg-icon>
                            <span> {{ list.name}}</span>
                        </span>
                    </div>
                </div>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import SvgIcon from '../iconfont/SvgIcon.vue'
  export default defineComponent({
    name: 'FormModal',
    components: { 
        SvgIcon,
      },
    emits: ['success', 'register'],
    setup(_, { emit }) {
        const activeName = ref<string[]>([])
        const mdata=ref([
                {id:"layout",title:"布局组件",block:[
                    {key:"title",icon:"icon-biaoti",name:"标题"},
                    {key:"table",icon:"icon-biaodanzujian-biaoge",name:"表格"},
                ]},
                {id:"form",title:"表单组件",block:[
                    {key:"input",icon:"icon-wenbenkuang",name:"文本"},
                    {key:"select",icon:"icon-xialakuang",name:"下拉"},
                    {key:"checkbox",icon:"icon-fuxuankuang-true",name:"复选框"},
                    {key:"radio",icon:"icon-danxuankuang-copy",name:"单选框"},
                    {key:"image",icon:"icon-tupian",name:"图片"},
                ]},
            ])
        const pudta=()=>{
            mdata.value.forEach((item)=>{
                activeName.value.push(item.id)
            })
        }
        pudta()
        return { 
            activeName,
            mdata
        };
    },
  });
</script>
<style lang="scss" scoped>
:deep(.el-collapse-item__header) {
    margin-left: 8px;
    font-style: italic;
    font-weight: 700;
}
:deep(.el-collapse-item__wrap) {
    padding-bottom: 15px;
}
.block-box{
    padding-left: 10px;
    margin: 0;
    margin-block-start: 0;
    margin-block-end: 0.25em;
    padding-inline-start: 10px;
    .block-item{
        display: inline-block;
        height: 28px;
        line-height: 28px;
        width: 115px;
        float: left;
        margin: 2px 6px 6px 0;
        cursor: move;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        background: #f1f2f3;
        padding: 0 10px;
        user-select: none;
        &:hover{
            background: #EBEEF5;
            outline: 1px solid #409EFF
        }
    }
}

.custom-tabs-label .el-icon {
    vertical-align: middle;
  }
.custom-tabs-label span {
    vertical-align: middle;
    margin-left: 4px;
  }
</style>