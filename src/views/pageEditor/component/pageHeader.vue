<template>
    <div class="editor-headerbox" >
        <div class="left">
            <table class="headertable">
                <tr>
                <td>单位</td>
                <td>天文台检查站</td>
                <td>监管单位</td>
                <td>中国</td>
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
            <img src="@/assets/logo.jpg" />
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
    setup() {
        return { 
        };
    },
  });
</script>
<style lang="scss" scoped>
 //页眉
 .editor-headerbox{
        display: flex;
        padding: 0px 40px;
        height: 100px;
        user-select: none;
        .left{
            flex:1;
            text-align: left;
            display: flex;
            align-items: center;
            .headertable{
                border-collapse: separate;
                border-spacing: 0;
                border-top: 1px solid #000000;
                border-left: 1px solid #000000;
                td{
                    padding: 5px 10px;
                    border: 1px solid #000000;
                    border-top: none;
                    border-left: none;
                }
            }
        }
        .right{
            text-align: right;
            img{
            height: 100%;
            cursor: pointer;
            pointer-events: auto;
           }
        }
    }
</style>