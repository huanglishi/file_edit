<!--填写质量文件-->
<template>
    <!-- <div class=" form-widget-main"> -->
        <div class="form-widget-container" :style="{height:'100%'}">
            <el-button type="primary" class="savebtn" @click="printFile" circle >
                    印
                </el-button>
            <div class="editor-container-box"  :style="{height:pageRaelheight+'px'}">
                <div class="editor-content" id="editor-content" :style="{height:pageRaelheight+'px'}" >
                    <div class="editor-page-list" >
                        <template v-for="item in pageCount">
                            <div class="editor-logic-page logc-page-box" >
                                <!--页眉-->
                                <div class="header-page page_wrapper" >
                                    <pageHeader :page="item" :total="pageCount"></pageHeader>
                                </div>
                                <!--页脚-->
                                <div class="footer-page page_wrapper">
                                    <div class="pagetext">-第{{item}}页-</div>
                                </div>
                            </div>
                            <div class="melo-page-gap" v-if="item!=pageCount" style="page-break-after:always; width: 100%; height: 23px; pointer-events: auto;"></div>
                        </template>
                    </div>
                    <!--编辑器-->
                    <div ref="containerRef" style="padding-top:100px;padding-bottom: 40px;" ></div>
                    <div class="editor-pagebg-list" >
                       <template v-for="item in pageCount">
                            <div class="editor-bg-page" >
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    <!-- </div> -->
 </template>
 <script lang="ts"  >
 import { defineComponent, onMounted, reactive,ref,nextTick, toRefs } from 'vue';
 import { getDocValue, getPluginValue,getDemoData} from "../pageEditor/script/index";//数据存储本地
 import { cards, plugins, pluginConfig } from "../FileEditor/script/config";
 //数据
 import { inputItem} from '../FileEditor/script/data';
 //打印
 import { pageHeader } from '../pageEditor/component'
 //编辑器
 import Engine, {
   $,
   EngineInterface,
 } from "@aomao/engine";
 //方法
import { WaterMark } from '../pageEditor/script/commom';
 export default defineComponent({
   name: 'pagePrint',
   // 注册组件
   components: {
    pageHeader,
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
      const containerRef = ref<HTMLElement | null>(null);
     // 编辑器引擎
     const engine = ref<EngineInterface | null>(null);
     // 默认设置为当前在加载中
     const loading = ref(true);
     onMounted(() => {
         document.title="质量文件编辑器-分页打印测试"
       // 容器加载后实例化编辑器引擎
       if (containerRef.value) {
                const engineInstance = new Engine(containerRef.value, {
                // 启用的插件
                plugins,
                // 启用的卡片
                cards,
                readonly:true,
                lazyRender:false,
                // 所有的卡片配置
                config: pluginConfig,
                });
                const value = getDocValue() || getDemoData();
                engineInstance.setValue(value, () => {
                  loading.value = false;
                });
             //监听渲染完成
            nextTick(()=>{
             setTimeout(() => {
                countPage()//计算的分页
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
        doPrint();
        // if(easyPrint.value)
        //  easyPrint.value.print()
     }
     const doPrint=()=>{
            // var head_str = "<html><head><title></title></head><body>"; //先生成头部
            // var foot_str = "</body></html>"; //生成尾部
            // var older = document.body.innerHTML;
            // var new_str = document.getElementsByClassName('form-widget-container')[0].innerHTML; //获取指定打印区域
            // document.body.innerHTML = head_str + new_str + foot_str; //构建新网页
            window.print(); //打印刚才新建的网页
            // nextTick(()=>{
            //     document.body.innerHTML = older; //将网页还原
            // })
            return false;
        }
     //分页
    //计算有多少页面
    const pageRaelheight=ref(1100)
    const pageCount=ref(1)//页面数
    const countPage=()=>{
        let editorheight=containerRef.value?.clientHeight||0
        editorheight=editorheight-40
        let pagenum=Math.ceil(editorheight/1100)
        if(pagenum>1){
           const midileheight=(pagenum-1)*25//中间分割线高之和
           const allheight=editorheight+midileheight
           //重新介绍高度
            pagenum=Math.ceil(allheight/(1100))
            pageRaelheight.value=pagenum*1100+midileheight
        }else{
          pageRaelheight.value=pagenum*1100
        }
        pageCount.value=pagenum
        nextTick(()=>{
          // 添加水印
          var watermark_txt = "<div>仅供环越站专用 请注意保护隐私</div>" ;//水印内容
          WaterMark({ "watermarl_element": ".editor-bg-page", "watermark_txt": watermark_txt });
        })
    }
     return{
         winHeight,
         containerRef,engine,loading,
         printFile,
         easyPrint,
         //分页
         pageRaelheight,pageCount,
     }
   }
 });
 
 </script>
 <style lang="scss" scoped>
 @import "./style/index.scss";
 </style>