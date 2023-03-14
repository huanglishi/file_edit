<!--填写质量文件-->
<template>
        <!--预览区-->
        <div class="editor-container" >
            <!--打印区-->
            <div class="editor-content" :style="{width:pageW+'mm'}" id="PrintBOX">
                <!--保存按钮-->
                <el-button type="primary" class="savebtn" @click="printFile" circle >
                    印
                </el-button>
                    <!--编辑器-->
                <div ref="container" id="containerODC"></div>
                <img src="/logo.png"  style=" height:0px;opacity:0"/>
            </div>
        </div>
 </template>
 <script lang="ts"  >
 import { defineComponent, onMounted, reactive,ref,nextTick, toRefs } from 'vue';
 import { getDocValue, getPluginValue} from "../FileEditor/script/index";//数据存储本地
 import { cards, plugins, pluginConfig } from "../FileEditor/script/config";
 //数据
 import { inputItem} from '../FileEditor/script/data';
  //打印
 //编辑器
 import {
   View,
   EngineInterface,
 } from "@aomao/engine";
 import $ from 'jquery'
import { SetInitDom } from './script/printool';
//配置
var pageW = 210; //210
var pageH = 297; //318.03
var pageMarginTop = 28.4;//面内容距离-页面顶部距离
var pageMarginBottom = 25.4;//面内容距离-页面底部距离
var pageMarginLeft = 10;//面内容距离-页面左边距离
var pageMarginRigt = 10;//面内容距离-页面右边距离
// 页边距普通:25.4 31.8;  适中:25.4 19.1; 窄:12.7 12.7; 宽:25.4 50.8

var contentW = pageW-pageMarginLeft-pageMarginRigt;
var contentH = pageH - pageMarginTop - pageMarginBottom;

var headerTop = 3;//页眉 上边距
var headerMarginLeft = 10;//页眉 左边距
//页眉位置
var headerTextAlign = "left";
//页脚位置
var footerBottom = 6;
var footerMarginLeft = 0;
var footerTextAlign = "center";
// var fineTune = 0.185;//纵向
var fineTune= -0.13;//横向

 export default defineComponent({
   name: 'cprint',
   // 注册组件
   components: {
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
        firstinitdom()
         document.title="质量文件编辑器-打印-验证"
       // 容器加载后实例化编辑器引擎
       if (container.value) {
             //实例化引擎
            const engineInstance = new View(container.value, {
                 plugins, // 启用的插件
                 cards, // 启用的卡片
                 config: pluginConfig, // 所有的卡片配置
             });
             const value = getDocValue() || "";
             engineInstance.render(value);
             //监听渲染完成
            nextTick(()=>{
             setTimeout(() => {
                //初始化dom
                SetInitDom(pluginList.value)
                handleDoPrint()
             }, 500);
            })
         }

     });
     //初始样式
     const firstinitdom=()=>{
        var tmpDiv = $("<div id='tmpDiv'></div>");
	    $("#PrintBOX").children().wrapAll(tmpDiv);
        $("#PrintBOX").prepend(initPrintArea());
        $("#PrintContentArea").append($("#tmpDiv"));
     }
     //打印初始
    const handleDoPrint=()=>{
        // add_H_F(()=>{
          
        // })
    }
     //打印预览
     const easyPrint = ref()
     const printFile=()=>{
        // if(easyPrint.value){
        //     easyPrint.value.print()
        // }
        add_H_F(()=>{
            
            //  if(easyPrint.value){
            //         easyPrint.value.print()
            //     }
            // const bodyhtml= document.body.innerHTML
            // $("body").css("width", pageW+"mm");
            // $("body").css("margin",  "0 auto");
            // document.body.innerHTML=document.getElementById("PrintBOX").innerHTML;
            window.print();
            // document.body.innerHTML=bodyhtml
            $("#PAGE_H_F").remove()
            // location.reload();
        });
     }
     //添加页眉页脚
     const add_H_F=(callback:any)=>{
        var PAGE_H_F_Html = "<div class='PAGE_H_F' id='PAGE_H_F'></div>";
        $("#PrintBOX").prepend(PAGE_H_F_Html);
        var headerText = "";
        var footerText = "";
        var pageCnt = getPageCnt();
        for(var i=1; i<=pageCnt; i++){
            headerText = `
            <div style="height: 25.4mm; display: flex;width: 100%;" >
                    <div  style="flex:1;">
                        <div style="border: 1px solid #000000;width: 200px;">
                            <div style="padding-left:10px; border-bottom: 1px solid #000000;">检查单位：环越检查站</div>
                            <div style="padding-left:10px;display: flex;">
                                第${i}页 / 共${pageCnt}页
                            </div>  
                        </div>
                    </div>
                    <div class="right">
                       <img  src="/logo.png"  style=" height: 60px"/>
                    </div>
                </div>
            `;
            footerText = "-第"+i+"页-";
            var PAGE_H_F_Idx = "<div class='content' id='content' style='width: "+pageW+"mm; height: "+(pageH-fineTune)+"mm;'>"+
            " <span class='PAGE_H' id='PAGE_H' style='text-align:"+headerTextAlign+"; width: "+(pageW)+"mm; top:0mm; padding-top:"+headerTop+"mm; padding-left: "+headerMarginLeft+"mm;padding-right: "+headerMarginLeft+"mm;'>"+headerText+"</span>"+
            " <span class='PAGE_F' id='PAGE_F' style='text-align:"+footerTextAlign+"; width: "+(pageW-footerMarginLeft)+"mm; bottom:0mm; padding-bottom:"+footerBottom+"mm; padding-left: "+footerMarginLeft+"mm;'>"+footerText+"</span>"+
            "</div>"
            $("#PAGE_H_F").append(PAGE_H_F_Idx);
        }
        callback && callback(true);
    }
    //获取打印页数
    const getPageCnt=()=>{
        var cnt = 0;
        //页面内容高度
        var printAreaHeight = $("#PrintArea").outerHeight(true)||0;
        console.log("printAreaHeight",printAreaHeight)
        //页面头部页眉内容高度
        var titleClassHeight = 96;//px
        printAreaHeight = px2mm(printAreaHeight - titleClassHeight);
        var cnt = Math.ceil(printAreaHeight / (pageH-pageMarginTop-pageMarginBottom));
        return cnt;
    }
    //添加table
    const initPrintArea=()=>{
        var html = 
            "<div id='PrintArea' style='width: "+pageW+"mm; "+" padding:0mm " + pageMarginRigt + "mm 0mm " + pageMarginLeft + "mm;margin: 0 auto;'>" +
                "<header style='width: "+contentW+"mm; height: "+pageMarginTop+"mm; line-height:"+pageMarginTop+"mm;'>"+
                    "<h5></h5>"+
                "</header>"+
                "<footer style='width: "+contentW+"mm; height: "+pageMarginBottom+"mm; line-height:"+pageMarginBottom+"mm;'>"+
                    "<h5></h5>"+
                "</footer>"+
                "<table style='width: 100%;' class='print-container'>"+
                    "<thead class='print-header'>"+
                        "<tr>"+
                            "<td class='print-header-cell' style='height: "+pageMarginTop+"mm;'>"+
                                "<div class='header-info'>"+
                                "</div>"+
                            "</td>"+
                        "</tr>"+
                    "</thead>"+
                    "<tfoot class='print-footer'>"+
                        "<tr>"+
                            "<td class='print-footer-cell' style='height: " + pageMarginBottom + "mm;'>"+
                                "<div class='footer-info'>"+
                                "</div>"+
                            "</td>"+
                        "</tr>"+
                    "</tfoot>"+
                    "<tbody class='print-content'>"+
                        "<tr>"+
                            "<td id='PrintContentArea' class='print-content-cell' style='font-size: 14px;'>"+
                            "</td>"+
                        "</tr>"+
                    "</tbody>"+
                "</table>"+
            "</div>";
            return $(html);
    }
    const tableReRender=()=>{
        $("table:not(.print-container)").each(function(i){
            $(this).children().wrapAll("<tbody></<tbody>");
            $(this).prepend(
                "<thead style='display: table-header-group;'>" +
                "	<tr class='head-tr' style='height: 0px !important;'>" +
                "		<td colspan='100' style='border: 1px solid rgb(4 4 4);border-bottom: none !important;page-break-inside: avoid !important;height: 0px !important;padding: 0 !important;border-left: none !important;    border-right: none !important;'></td>" +
                "	</tr>" +
                "</thead>" +
                "<tfoot style='display: table-footer-group;'>" +
                "	<tr class='foot-tr' style='height: 0px !important;'>" +
                "		<td colspan='100'  style='border-bottom: none !important;page-break-inside: avoid !important;height: 0px !important;padding: 0 !important;border-left: none !important;border-right: none !important;'></td>" +
                "	</tr>" +
                "</tfoot>"
            );
        });
    }
    //工具函数
    //计算px转mm
    const px2mm=(px:any)=> {
        var dpi = getDPI();
        var mm = parseFloat(px) * 25.4 / dpi[0];
        return mm;
    }
    //获得屏幕的DPI
    const getDPI=()=> {
        var arrDPI = new Array();
        if (window.screen.deviceXDPI != undefined) { //ie 9
            arrDPI[0] = window.screen.deviceXDPI;
            arrDPI[1] = window.screen.deviceYDPI;
        } else { //chrome firefox
            var tmpNode = document.createElement("DIV");
            tmpNode.style.cssText = "width:1in; height:1in; position:absolute; left:0px; top:0px; z-index:99; visibility:hidden;";
            document.body.appendChild(tmpNode);
            arrDPI[0] = parseInt(tmpNode.offsetWidth);
            arrDPI[1] = parseInt(tmpNode.offsetHeight);
            tmpNode.parentNode.removeChild(tmpNode);
        }
        return arrDPI;
    }

     return{
         winHeight,
         container,engine,loading,
         printFile,
         easyPrint,

         //打印
         pageW,
     }
   }
 });
 
 </script>
 <style lang="scss" scoped>
 @import "./style/index.scss";
 </style>