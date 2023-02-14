<template>
    <div class="module-list">
        <el-collapse v-model="activeName" >
            <el-collapse-item v-for="item in mdata" :title="item.title" :name="item.id">
                <div class="block-box">
                    <template v-for="list in item.block">
                        <div class="block-item pointer" v-if="item.id=='layout'" @click="insertComponent($event,list.key)">
                            <span class="custom-tabs-label" >
                                <svg-icon :iconName="list.icon"></svg-icon>
                                <span> {{ list.name}}</span>
                            </span>
                        </div>
                        <div class="block-item pointer" v-if="item.id=='form'" @click="insertComponent($event,list.key)">
                            <span class="custom-tabs-label" >
                                <svg-icon :iconName="list.icon"></svg-icon>
                                <span> {{ list.name}}</span>
                            </span>
                        </div>
                    </template>
                </div>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import SvgIcon from '../iconfont/SvgIcon.vue'
  export default defineComponent({
    name: 'moduleList',
    components: { 
    SvgIcon,
    },
    emits: ['success', 'pointershow','insert'],
    setup(_, { emit }) {
        const activeName = ref<string[]>([])
        const mdata=ref([
                {id:"layout",title:"布局组件",block:[
                    {key:"title",icon:"icon-biaoti",name:"标题"},
                    {key:"table",icon:"icon-biaodanzujian-biaoge",name:"表格"},
                ]},
                {id:"form",title:"表单组件",block:[
                    {key:"input",icon:"icon-wenbenkuang",name:"文本输入框"},
                    // {key:"select",icon:"icon-xialakuang",name:"下拉"},
                    {key:"checkbox",icon:"icon-fuxuankuang-true",name:"复选框"},
                    // {key:"radio",icon:"icon-danxuankuang-copy",name:"单选框"},
                    {key:"image",icon:"icon-tupian",name:"图片/签名"},
                    {key:"textsync",icon:"icon-2dongtaiwenzi",name:"动态绑定数据"},
                ]},
            ])
        //这个是展开
        mdata.value.forEach((item)=>{
            activeName.value.push(item.id)
        })
        //-------------点击组件-------------------------------
        const insertComponent=(event: MouseEvent,keys: string)=>{
            event.preventDefault();
            emit('insert', keys);
        }
        return { 
            activeName,
            mdata,
            insertComponent,
        };
    },
  });
</script>
<style lang="scss" scoped>
:deep(.el-collapse-item__header) {
    margin-left: 8px;
    // font-style: italic;
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
        &.pointer{
            cursor: pointer;
        }
        &.move{
            cursor: move;
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