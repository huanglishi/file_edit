<!--填写质量文件-->
<template>
   <div class="fw-box">
        <div class="fw-content">
            <!--预览区-->
            <div class="editor-container" :style="{height:winHeight+'px'}">
                  <!--保存按钮-->
                  <el-button type="primary" class="savebtn" @click="savedata" circle >
                     存
                </el-button>
                <div class="editor-content">
                    <!--编辑器-->
                    <div ref="container"></div>
                </div>
            </div>
        </div>
   </div>
</template>
<script lang="ts"  >
import { defineComponent, onMounted, reactive,ref,nextTick, toRefs } from 'vue';
import { getDocValue, getPluginValue,setPluginValue} from "/@/utils";//数据存储本地
import { cards, plugins, pluginConfig } from "../FileEditor/script/config";
//数据
import { inputItem,inputItemData} from '../FileEditor/script/data';
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
        document.title="质量文件编辑器-填表端"
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
                       pluginDom.value=item.value
                       if(item.style.height&&item.style.height>0){
                         changeStyle(item.style.height+"px","height",pluginDom)
                       }
                       if(item.style.width&&item.style.width>0){
                         changeStyle(item.style.width+"px","width",pluginDom)
                       }
                       if(item.uuid=="noS8F"){
                          pluginDom.readOnly=true
                       }
                    }else if(item.type=="textarea"){
                        if(item.style.height&&item.style.height>0){
                            changeStyle(item.style.height+"px","height",pluginDom)
                        }
                        pluginDom.style.resize="both"
                        if(item.style.width&&item.style.width>0){
                            changeStyle(item.style.width+"px","width",pluginDom)
                        }
                        pluginDom.value =item.value
                    }else if(item.type=="checkbox"){//复选框
                        if(item.style.height&&item.style.height>0){
                            changeStyle(item.style.height+"px","height",pluginDom)
                        }
                        pluginDom.style.resize="both"
                        if(item.style.width&&item.style.width>0){
                            changeStyle(item.style.width+"px","width",pluginDom)
                        }
                        if(item.value&&parseInt(item.value)==1){
                            pluginDom.checked=true
                        }else{
                            pluginDom.checked=false
                        }
                        // console.log('获取组件：', item)
                    }else if(item.type=="image"){

                    }else if(item.type=="textsync"){//动态数据
                        pluginDom.innerText=item.value
                    }
                    //事件监听
                  if(item.type=="input"||item.type=="textarea"){
                       $(`#${item.domid}`).on("input",(event)=>{
                            pluginList.value[index].value=pluginDom.value
                        });
                  }else if(item.type=="checkbox"){
                    $(`#${item.domid}`).on("change",(event)=>{
                        if(pluginDom.checked){
                           pluginDom.value="1"
                        }else{
                            pluginDom.value="0"
                        }
                        pluginList.value[index].value=pluginDom.value
                    });
                  }else if(item.type=="image"){//图片上传
                    $(`#${item.domid}`).on("click",(event)=>{
                        alert("上传")
                    });
                  }
                }
            });
            }, 500);
           })
        }
    });
      //设置样式
    const changeStyle=(val:any,keys:any,pluginDom:HTMLInputElement)=>{
        pluginDom.style[keys]=val
    }
    //保存数据
    const savedata=()=>{
          console.log("保存数据",pluginList.value)
          setPluginValue(JSON.stringify(pluginList.value))
    }
    return{
        winHeight,
        container,engine,loading,
        savedata,
    }
  }
});

</script>
<style lang="scss" scoped>
@import "./style/index.scss";
</style>