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
                     <!-- <vue-easy-print  tableShow ref="easyPrint" >
                        <table border="0" >
                            <thead style="display: table-header-group;" class="table_page">
                            <TR  style="page-break-inside: avoid">
                                <TD colspan="2" align="center"> 
                                    <div class="pagehinde headerbox">
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
                                                <td>1/<span class="page-number">Page </span> </td>
                                              </tr>
                                            </table>
                                        </div>
                                        <div class="right">
                                            <img src="@/assets/logo.png" />
                                        </div>
                                    </div>
                                </TD>
                            </TR>
                            </thead>
                            <tbody style="display: table-header-group">
                            <TR><TD><div ref="container" id="containerODC"></div></TD></TR>
                            </tbody>
                            <tfoot style="display: table-footer-group;">
                                <TR style="page-break-inside: avoid">
                                    <TD  align="center" class="footer">
                                        <div class="pagehinde footerpiontion">
                                       </div>
                                    </TD>
                                </TR>
                            </tfoot>
                        </table>
                     </vue-easy-print> -->
                     <!--到处PDf-->
                        <div class="pdf-panel">
                        <div ref="container" id="containerODC"></div>
                        </div>
                        <div class="pdf-header print_font" style="padding: 35px 5px 5px 35px; width: 100%; border-bottom: 1px solid rgba(0, 0, 0, 0.85); color: rgba(0, 0, 0, 0.85); position: fixed; top: -100vh;">
                            <div class="pdf-headerbox" >
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
                                                第<div class="pdf-header-page"></div>页 / 共<div class="pdf-header-page-count"></div>页
                                            </div>  
                                        </td>
                                        </tr>
                                    </table>
                                </div>
                                <div class="right">
                                    <img src="@/assets/logo.png" />
                                </div>
                            </div>
                        </div>
                        <div class="pdf-footer print_font"
                            style=" padding: 15px 8px 35px 15px; width: 100%; border-top: 1px solid rgba(0, 0, 0, 0.85); position: fixed; top: -100vh;">
                            <div style="display: flex; justify-content: center; align-items: center; padding-top: 5px;">
                                <p>互领科技提供服务</p>
                            </div>
                            <div style="display: flex; justify-content: center; align-items: center; margin-top: 10px;">
                                第<div class="pdf-footer-page"></div>页 / 共<div class="pdf-footer-page-count"></div>页
                            </div>
                        </div>
                 </div>
             </div>
         </div>
    </div>
 </template>
 <script lang="ts"  >
 import { defineComponent, onMounted, reactive,ref,nextTick, toRefs } from 'vue';
 import { getDocValue, getPluginValue} from "../FileEditor/script/index";//数据存储本地
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
 import { outputPDF } from './outputPDF'
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
         document.title="质量文件编辑器-打印预览表端1"
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
             engineInstance.render(value);
             //监听渲染完成
            nextTick(()=>{
             setTimeout(() => {
                 pluginList.value.forEach((item:inputItem,index:number)=>{
                 const pluginDom=<HTMLInputElement>document.getElementById(item.domid)
                 if(pluginDom){
                     if(item.type=="input"){
                        if(pluginDom.parentElement&&pluginDom.parentElement.parentElement)
                        pluginDom.parentElement.parentElement.innerHTML=`<span style="width:${item.style.width}px;min-height: 26px;display: inline-block;border-bottom: 1px solid #d9d9d9;margin-bottom: -6px;"> ${item.value||'<span style="opacity:0;">-</span>'}</span>`
                     }else if(item.type=="textarea"){
                        if(pluginDom.parentElement)
                         pluginDom.parentElement.innerHTML=item.value
                     }else if(item.type=="checkbox"){
                        let htmlstr=""
                        if(item.value&&parseInt(item.value)==1){
                            htmlstr=`<span style="width:${item.style.width}px;height:${item.style.height}px;position: relative;display: inline-block;vertical-align: text-bottom;border: 1px solid #000000;border-radius: 3px;" >
                                <i style=" content: ''; width: ${item.style.height/2}px;height: ${item.style.height/3}px; border-left: 1px solid #000000; border-bottom: 1px solid #000000; position: absolute;  top: 3px;left: 3px;transform: rotate(-45deg);"></i>
                                </span>`
                        }else{
                            htmlstr=`<span style="width:${item.style.width}px;height:${item.style.height}px;position: relative;display: inline-block;vertical-align: text-bottom;border: 1px solid #000000;border-radius: 3px;" ></span>`
                        }
                        if(pluginDom.parentElement&&pluginDom.parentElement.parentElement)
                        pluginDom.parentElement.parentElement.innerHTML=htmlstr
                     }else if(item.type=="image"){
                        if(pluginDom.parentElement)
                         pluginDom.parentElement.innerHTML=`<img id="image_${item.uuid}" style="width:${item.style.width}px;margin-bottom: ${item.style.marginBottom}px;" src="https://tuwen.hulingyun.cn/common/uploadfile/getimage?url=resource/uploads/20230303/4c0fe297b181e4b509cedacf9918aa61.jpg"/>`
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
        // handleOutput()
        // if(easyPrint.value)
        //  easyPrint.value.print()
     }
     const handleOutput=async()=> {
      const element = document.querySelector('.pdf-panel');
      const header = document.querySelector('.pdf-header');
      const footer = document.querySelector('.pdf-footer');
      try {
        await outputPDF({
          element: element,
          footer: footer,
          header: header,
          contentWidth: 560
        })
      } catch (error) {
        console.error(typeof error === 'string' ? error : JSON.stringify(error))
      }
    }

     return{
         winHeight,
         container,engine,loading,
         printFile,
         easyPrint,
     }
   }
 });
 
 </script>
 <style lang="scss" scoped>
 @import "./style/index.scss";
 </style>