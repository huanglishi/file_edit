<!--填写质量文件-->
<template>
    <div class="fw-box" >
         <div class="fw-content">
             <!--预览区-->
             <div class="editor-container" >
                 <div class="editor-content">
                     <!--保存按钮-->
                  <el-button type="primary" class="savebtn" @click="printFile" circle >
                        印
                    </el-button>
                     <!--编辑器-->
                     <vue-easy-print  tableShow ref="easyPrint" >
                        <div ref="container" ></div>
                     </vue-easy-print>
                 </div>
             </div>
         </div>
    </div>
 </template>
 <script lang="ts"  >
 import { defineComponent, onMounted, reactive,ref,nextTick, toRefs } from 'vue';
 import { getDocValue, getPluginValue} from "/@/utils";//数据存储本地
 import { cards, plugins, pluginConfig } from "../FileEditor/script/config";
 //数据
 import { inputItem,inputItemData} from '../FileEditor/script/data';
 //打印
 import vueEasyPrint from 'vue-easy-print'
 //编辑器
 import {
   $,
   View,
   EngineInterface,
 } from "@aomao/engine";
 export default defineComponent({
   name: 'FileWrite',
   // 注册组件
   components: {
    vueEasyPrint,
   },
   setup() {
     const winHeight=ref(document.documentElement.clientHeight-0)
      //获取组件数据
      const plugindata=getPluginValue()||''
      const pluginList=ref<inputItem[]>([])
     //  console.log('获取组件：', plugindata)
      if(plugindata&&plugindata!="undefined"){
         pluginList.value=JSON.parse(plugindata)
      }
     
      // 编辑器容器
      const container = ref<HTMLElement | null>(null);
     // 编辑器引擎
     const engine = ref<EngineInterface | null>(null);
     // 默认设置为当前在加载中
     const loading = ref(true);
     onMounted(() => {
         document.title="质量文件编辑器-打印预览表端"
       // 容器加载后实例化编辑器引擎
       if (container.value) {
             //实例化引擎
                 const engineInstance = new View(container.value, {
                 // 启用的插件
                 plugins,
                 // 启用的卡片
                 cards,
                 // 所有的卡片配置
                 config: pluginConfig,
             });
             const value = getDocValue() || "";
             // 非协同编辑，设置编辑器值，异步渲染后回调
             engineInstance.render(value,true);
             engineInstance.trigger("render")
             engineInstance.on("render", () => {
                 alert(9)
             })
             //监听渲染完成
            nextTick(()=>{
             setTimeout(() => {
                 pluginList.value.forEach((item:inputItem,index:number)=>{
                 const pluginDom=<HTMLInputElement>document.getElementById(item.domid)
                 if(pluginDom){
                     if(item.type=="input"){
                        if(pluginDom.parentElement&&pluginDom.parentElement.parentElement)
                        pluginDom.parentElement.parentElement.innerHTML=`<span style="width:${item.style.width}px;display: inline-block;border-bottom: 1px solid #d9d9d9;"> ${item.value||" "}</span>`
                     }else if(item.type=="textarea"){
                        if(pluginDom.parentElement)
                         pluginDom.parentElement.innerHTML=item.value
                     }else if(item.type=="checkbox"){
                        let htmlstr=""
                        if(item.value&&parseInt(item.value)==1){
                            htmlstr=`<span style="width:${item.style.width}px;height:${item.style.height}px;position: relative;display: inline-block;vertical-align: text-bottom;border: 1px solid #000000;border-radius: 3px;" >
                                <i style=" content: ''; width: ${item.style.height/2}px; height: ${item.style.height/3}px; border-left: 1px solid #000000; border-bottom: 1px solid #000000; position: absolute;  top: 3px;left: 3px;transform: rotate(-45deg);"></i>
                                </span>`
                        }else{
                            htmlstr=`<span style="width:${item.style.width}px;height:${item.style.height}px;position: relative;display: inline-block;vertical-align: text-bottom;border: 1px solid #000000;border-radius: 3px;" ></span>`
                        }
                        if(pluginDom.parentElement&&pluginDom.parentElement.parentElement)
                        pluginDom.parentElement.parentElement.innerHTML=htmlstr
                     }else if(item.type=="image"){
                        console.log("input:",item)
                        if(pluginDom.parentElement)
                         pluginDom.parentElement.innerHTML=`<img id="image_${item.uuid}" style="width:${item.style.width}px;margin-bottom: ${item.style.marginBottom}px;" src="https://www.shijuepi.com/uploads/allimg/210818/1-210QP91537.jpg"/>`
 
                     }else if(item.type=="textsync"){//动态数据
                        if(pluginDom.parentElement&&pluginDom.parentElement.parentElement)
                        pluginDom.parentElement.parentElement.innerText=item.value
                     }
                    //事件
                   if(item.type=="image"){//放大图片
                     $(`#${item.domid}`).on("click",(event)=>{
                        //  alert("放大图片")
                     });
                   } 
                 }
             });
             }, 500);
            })
         }
     });
     //打印预览
     const easyPrint = ref()
     const printFile=()=>{
        if(easyPrint.value)
        easyPrint.value.print()
     }
     return{
         winHeight,
         container,engine,loading,
         printFile,easyPrint,
     }
   }
 });
 
 </script>
 <style lang="scss" scoped>
 @import "./style/index.scss";
 </style>