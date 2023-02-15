<template>
    <div class="edit-box">
        <div class="ed-container">
            <!--左边工具栏-->
            <div class="ed-aside left-panel">
                <div class="ed-scrollbar" style="height: 100%;">
                    <div class="ed-scrollbar-wrap">
                        <div class="ed-scrollbar-view">
                            <div class="panel-container">
                                <!--分类切换-->
                                <el-tabs v-model="left_tool_type" class="ed-tabs" :stretch="true">
                                    <el-tab-pane name="module">
                                        <template #label>
                                            <span class="custom-tabs-label">
                                            <el-icon><Calendar /></el-icon>
                                            <span>组件库</span>
                                            </span>
                                        </template>
                                        <div class="module-list-box">
                                            <module-list @insert="insertComponent"></module-list>
                                        </div>
                                    </el-tab-pane>
                                    <el-tab-pane name="template">
                                        <template #label>
                                            <span class="custom-tabs-label">
                                                <el-icon><Memo /></el-icon>
                                            <span>模板库</span>
                                            </span>
                                        </template>
                                       
                                        模板库
                                    </el-tab-pane>
                                </el-tabs>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="ed-container is-vertical center-layout-container">
                <!--头部工具区-->
                <div class="ed-header toolbar-header">
                    <div class="toolbar-container">
                      <am-toolbar v-if="engine" :engine="engine" :items="items" />
                    </div>
                </div>
                <!--编辑区-->
                <div class="ed-main form-widget-main">
                    <!-- <el-scrollbar :height="winHeight+'px'"> -->
                        <div class="form-widget-container">
                         <div class="container-raw" ref="editZoomRef">
                            <div class="editor-container" :style="{height:winHeight+'px'}">
                                <div class="editor-content">
                                    <!--编辑器-->
                                    <div ref="container"   
                                    ></div>
                                </div>
                            </div>
                         </div>
                        </div>
                    <!-- </el-scrollbar> -->
                </div>
            </div>
            <!--右边组件编辑工具-->
            <div class="ed-aside right-panel">
                <div class="ed-container panel-container">
                    <!--属性编辑-->
                    <el-tabs v-model="edit_type" class="ed-tabs" :stretch="false" style="height: 100%;width: 100%;overflow: hidden;">
                        <!--考虑动态组件-->
                        <el-tab-pane label="组件设置" name="module">
                            <ModuleSetting :pluginData="pluginData"></ModuleSetting>
                        </el-tab-pane>
                        <!-- <el-tab-pane label="高级设置" name="template">
                            模板库
                        </el-tab-pane> -->
                    </el-tabs>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts"  >
import { defineComponent, onMounted, reactive,ref,nextTick, toRefs } from 'vue';
import { ModuleList,ModuleSetting } from './component'
import { Calendar,Memo } from '@element-plus/icons-vue'
//编辑器
import Engine, {
  $,
  EngineInterface,
} from "@aomao/engine";
import AmToolbar from "@aomao/toolbar-vue";
import { getDocValue, setDocValue } from "/@/utils";//数据存储本地
import { cards, plugins, pluginConfig, onLoad } from "./script/config";
//数据
import { inputItem,inputItemData} from './script/data';
export default defineComponent({
  name: 'fileEditor',
  // 注册组件
  components: {
    ModuleList,ModuleSetting,
    Calendar,Memo,
    AmToolbar
  },
  setup() {
    const pesetting=ref("vertical")
    const left_tool_type=ref("module")
    const edit_type=ref("module")
    const editZoomVal=ref(100)
    const winHeight=ref(document.documentElement.clientHeight-50)
    //动态数据变量
    const state = reactive<any>({
        editZoomRef: null, // 底部导航栏组件
        doctpl_data:"",//文档模板样式数据-html
        timer:null,//定时器
    })
    // 编辑器容器
    const container = ref<HTMLElement | null>(null);
    // 编辑器引擎
    const engine = ref<EngineInterface | null>(null);
     // 默认设置为当前在加载中
     const loading = ref(true);
    onMounted(() => {
      // 容器加载后实例化编辑器引擎
      if (container.value) {
        //实例化引擎
        const engineInstance = new Engine(container.value, {
          // 启用的插件
          plugins,
          // 启用的卡片
          cards,
          // 所有的卡片配置
          config: pluginConfig,
          placeholder:"在这里编辑你的文件了",
        });
        onLoad(engineInstance);
        //卡片最大化时设置编辑页面样式
        engineInstance.on("card:maximize", () => {
          $(".editor-toolbar").css("z-index", "9999").css("top", "55px");
        });
        engineInstance.on("card:minimize", () => {
          $(".editor-toolbar").css("z-index", "").css("top", "");
        });
        // 默认编辑器值，为了演示，这里初始化值写死，正式环境可以请求api加载
        const value = getDocValue() || "";
        // 非协同编辑，设置编辑器值，异步渲染后回调
        engineInstance.setValue(value, () => {
          loading.value = false;
        });

        // 监听编辑器值改变事件
        engineInstance.on("change", () => {//时时监听输入值
          const { value, paths } = engineInstance.command.executeMethod(
            "mark-range",
            "action",
            "mark",
            "filter",
            engineInstance.getValue()
          );
          setDocValue(value);
          //时时获取组件
          nextTick(()=>{
            clearInterval(state.time); 
            state.timer= setTimeout(() => {
              getPluginList()
              clearInterval(state.time); 
            }, 1000);
          })
        //   console.log("value", value);
          // console.log("html:", engineInstance.getHtml());
        });
        engine.value = engineInstance;
      }
    });
    //点击左边表格按钮-插入表格-标题
    const insertComponent=(key:string)=>{
       if(key=="table"){//插入表格
          engine.value?.command.execute('table', 5, 5);
       }else if(key=="title"){//插入标题
        let hrmlstr=`<h2 style="text-indent: 2em; text-align: center;">人员考核结果统计表 <span style="color: rgb(245, 34, 45);">(替换)</span></h2>`
        const range =engine.value?.change.range.get()
        engine.value?.block.insert(hrmlstr,range,(node)=>node,true)
       }else if(key=="input"){//单行文本输入框
         engine.value?.command.execute('textinput');
       }else if(key=="textarea"){//多行行文本输入框
         engine.value?.command.execute('textarea');
       }else if(key=="checkbox"){//复选框 
        engine.value?.command.execute('textcheckbox');
       }else if(key=="image"){//图片
        engine.value?.command.execute('textimage');
       }else if(key=="textsync"){//动态绑定数据
        engine.value?.command.execute('textsync');
       }
    }
    //时时获取组件数据
    const pluginData=ref<inputItem>(inputItemData)
    const getPluginList=()=>{
      var datalist=ref<inputItem[]>([])
      if (!engine.value) return;
      engine.value.card.components.forEach((card) => {
          //单行文本
          const inputdoc=<HTMLInputElement>document.getElementById(`input_${card.getValue().id}`)
          if(inputdoc){
            const inputValue  = (inputdoc).value;
            const pushdata=Object.assign({},inputItemData,{keyid:card.getValue().id||"",type:"input",domid:(inputdoc).id,value:inputValue})
            datalist.value.push(pushdata)
          }
          //多行文本
          const textareas=<HTMLInputElement>document.getElementById(`textarea_${card.getValue().id}`)
          if(textareas){
            const inputValue  = (textareas).value;
            const pushdata=Object.assign({},inputItemData,{keyid:card.getValue().id||"",type:"textarea",domid:(textareas).id,value:inputValue})
            pushdata.style.width=parseInt(textareas.style.width)
            pushdata.style.height=parseInt(textareas.style.height)
            datalist.value.push(pushdata)
          }
          //复选框
          const textcheckbox=<HTMLInputElement>document.getElementById(`checkbox_${card.getValue().id}`)
          if(textcheckbox){
            const inputValue  = (textcheckbox).value;
            const pushdata=Object.assign({},inputItemData,{keyid:card.getValue().id||"",type:"checkbox",domid:(textcheckbox).id,value:inputValue})
            datalist.value.push(pushdata)
          }
          //绑定数据
          const textsync=<HTMLInputElement>document.getElementById(`textsync_${card.getValue().id}`)
          if(textsync){
            const inputValue  = (textsync).dataset.value||"";
            const pushdata=Object.assign({},inputItemData,{keyid:card.getValue().id||"",type:"textsync",domid:(textsync).id,value:inputValue})
            datalist.value.push(pushdata)
          }
          //图片、签名
          const textimage=<HTMLInputElement>document.getElementById(`image_${card.getValue().id}`)
          if(textimage){
            const inputValue  = (textimage).dataset.value||"";
            const pushdata=Object.assign({},inputItemData,{keyid:card.getValue().id||"",type:"image",domid:(textimage).id,value:inputValue})
            datalist.value.push(pushdata)
          }
      });
      console.log('获取组件列表：', datalist.value)
      //为所有组件绑事件
      datalist.value.forEach((item)=>{
        console.log('获取组件：', item)
        $(`#${item.domid}`).on("click",(event)=>{
          //绑定点击组件数据
          pluginData.value=item
          const pluginDom=<HTMLInputElement>document.getElementById(item.domid)
          if(item.type=="input"){
             pluginDom.focus()
          }else if(item.type=="textarea"){
            pluginDom.focus()
          }else if(item.type=="checkbox"){
            if(pluginDom.checked){
              pluginDom.value="1"
            }else{
              pluginDom.value="0"
            }
          }else if(item.type=="textsync"){//动态数据
          }
          //获取标题
          if(!item.title){
              const phtml=pluginDom?.parentNode?.parentNode?.parentNode
              const textname=phtml?.previousSibling?.nodeValue
              if(textname){
                let strreplay=textname.trim()
                strreplay=strreplay.replace(/:/g, "")
                strreplay=strreplay.replace(/：/g, "")
                item.title=strreplay||""
              }
            }
            console.log("点击组件了",item.type)
            // setValue(item,"RH-8484",pluginDom)//赋值
        })
      })
    }
    //--------------操作-组件设置----------
    //赋值动态数据-组件
    const setValue=(item:any,value:any,pluginDom:HTMLInputElement)=>{
      if(item.type=="textsync"){
          if(value){
            $(`#${item.domid}`).attributes("style","")
            pluginDom.innerHTML=value
          }else{//空值-复原
            $(`#${item.domid}`).attributes("style","padding:3px 5px;vertical-align:text-bottom;border:#d9d9d9 solid 1px;border-radius: 3px;user-select: none;cursor: pointer;")
            pluginDom.innerHTML=`<svg aria-hidden="true" style="width: 1em;height: 1em; position: relative;fill: currentColor;vertical-align: -2px;"><use xlink:href="#icon-bangding" :fill="color" /></svg> 绑定数据`
          }
        }else if(item.type=="input"){
          pluginDom.value=value
        }else if(item.type=="checkbox"){

        }
    }
    return {
      ...toRefs(state),
      pesetting,
      left_tool_type,
      edit_type,
      editZoomVal,
      winHeight,
      //工具配置
      items: [
        ["undo", "redo", "paintformat", "removeformat"],
        ["heading", "fontfamily", "fontsize"],
        ["bold", "italic", "strikethrough", "underline", "moremark"],
        ["fontcolor", "backcolor"],
        ["alignment"],
        ["unorderedlist", "orderedlist", "indent", "line-height"],
        ["link", "quote", "hr"],
      ],
      //编辑器
      container,engine,loading,
      insertComponent,pluginData,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "./style/index.scss";
:deep(.ediecheckbox){
    &::before{
      background: white;
    }
}
</style>