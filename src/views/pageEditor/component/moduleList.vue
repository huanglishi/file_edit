<template>
    <div class="module-list">
        <el-collapse v-model="activeName" >
            <el-collapse-item v-for="item in mdata" :title="item.title" :name="item.id">
                <div class="block-box">
                    <template v-for="list in item.block">
                        <div class="block-item pointer" v-if="item.id=='layout'" @click="insertComponent($event,list.key)">
                            <span class="custom-tabs-label" >
                                <svg-icon :iconName="list.icon" :color="list.color"></svg-icon>
                                <span> {{ list.name}}</span>
                            </span>
                        </div>
                        <div class="block-item pointer" v-if="item.id=='form'" @click="insertComponent($event,list.key)">
                            <span class="custom-tabs-label" >
                                <svg-icon :iconName="list.icon" :color="list.color"></svg-icon>
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
  import { PluginList } from '../script/data';
  export default defineComponent({
    name: 'moduleList',
    components: { 
    SvgIcon,
    },
    emits: ['success', 'pointershow','insert'],
    setup(_, { emit }) {
        const activeName = ref<string[]>([])
        const mdata=ref(PluginList)//获取组件列表
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