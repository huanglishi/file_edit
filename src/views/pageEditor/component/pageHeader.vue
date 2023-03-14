<template>
    <div class="editor-headerbox" >
        <div class="left">
            <table class="headertable">
                <tr>
                <td>检查单位</td>
                <td>环越监测站</td>
                <td>监管单位</td>
                <td>环越</td>
                </tr>
                <tr>
                <td>文件编号</td>
                <td>488 </td>
                <td>页码</td>
                <td>
                    <div style="display: flex; justify-content: center; align-items: center;">
                        第{{page}}页 / 共{{total}}页
                    </div>  
                </td>
                </tr>
            </table>
        </div>
        <div class="right">
            <img src="@/assets/logo.png" />
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed, unref } from 'vue';
  export default defineComponent({
    name: 'pageHeader',
    components: { 
    },
    props:{
       page:{
        type: Number,
        default:1
       },
       total:{
        type: Number,
        default:1
       },
    },
    emits: ['success'],
    setup(_, { emit }) {
        const insertComponent=(event: MouseEvent,keys: string)=>{
            event.preventDefault();
            emit('success', keys);
        }
        return { 
        };
    },
  });
</script>
<style lang="scss" scoped>
</style>