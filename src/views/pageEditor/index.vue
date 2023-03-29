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
                        <div class="form-widget-container" :style="{height:winHeight+'px'}">
                            <div class="editor-container-box"  :style="{height:pageRaelheight+'px'}">
                                <div class="editor-content" :style="{height:pageRaelheight+'px'}" >
                                    <div class="editor-page-list" >
                                      <template v-for="item in pageCount">
                                          <div class="editor-logic-page">
                                            <!--页眉-->
                                            <div class="header-page page_wrapper">
                                              <pageHeader :page="item" :total="pageCount"></pageHeader>
                                            </div>
                                            <!--页脚-->
                                            <div class="footer-page page_wrapper">
                                               <div class="pagetext">-第{{item}}页-</div>
                                            </div>
                                          </div>
                                          <div class="melo-page-gap" v-if="item!=pageCount" style=" width: 100%; height: 23px; pointer-events: auto;"></div>
                                        </template>
                                    </div>
                                     <!--编辑器2-->
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
                </div>
            </div>
            <!--右边组件编辑工具-->
            <div class="ed-aside right-panel">
                <div class="ed-container panel-container">
                    <!--属性编辑-->
                    <el-tabs v-model="edit_type" class="ed-tabs" :stretch="false" style="height: 100%;width: 100%;overflow: hidden;">
                        <!--考虑动态组件-->
                        <el-tab-pane label="组件设置" name="module">
                            <ModuleSetting :pluginData="pluginData" :show="showRightPlus"></ModuleSetting>
                        </el-tab-pane>
                        <!-- <el-tab-pane label="高级设置" name="template">
                            模板库
                        </el-tab-pane> -->
                    </el-tabs>
                </div>
            </div>
        </div>
        <!--打印内容-->
        <iframe id="iframe" style="display: none;"></iframe>
    </div>
</template>
<script lang="ts"  >
import { defineComponent, onMounted, reactive,ref,unref,nextTick, toRefs } from 'vue';
import { ModuleList,ModuleSetting,pageHeader } from './component'
import { Calendar,Memo } from '@element-plus/icons-vue'
//编辑器
import Engine, {
  $,
  EngineInterface,
  Range,
} from "@aomao/engine";
import AmToolbar from "@aomao/toolbar-vue";
import { getDocValue, setDocValue,setPluginValue,setPageValue,getPageValue,getDemoData} from "./script/index";//数据存储本地
import { cards, plugins, pluginConfig, onLoad } from "./script/config";
//数据
import { inputItem,inputItemData } from './script/data';
//方法
import { WaterMark } from './script/commom';

export default defineComponent({
  name: 'fileEditor',
  // 注册组件
  components: {
    ModuleList,ModuleSetting,pageHeader,
    Calendar,Memo,
    AmToolbar
  },
  setup() {
    const pesetting=ref("vertical")
    const left_tool_type=ref("module")
    const edit_type=ref("module")
    const editZoomVal=ref(100)
    const winHeight=ref(document.documentElement.clientHeight-50)
    const pageCount=ref(1)//页面数
    //动态数据变量
    const state = reactive<any>({
        editZoomRef: null, // 底部导航栏组件
        timer:null,//定时器
    })
    //是否处理组件编辑状态
    const showRightPlus=ref(false)
    // 编辑器容器
    const containerRef = ref<HTMLElement | null>(null);
    // 编辑器引擎
    const engine = ref<EngineInterface | null>(null);
     // 默认设置为当前在加载中
    const loading = ref(true);
    const fileTplData = ref();//模板数据
    /*********************************************初始化编辑器*********** */
    onMounted(() => {
      document.title="可分页编辑器"
      // 容器加载后实例化编辑器引擎
      if (containerRef.value) {
        //实例化引擎
        const engineInstance = new Engine(containerRef.value, {
          // 启用的插件
          plugins,
          // 启用的卡片
          cards,
          lazyRender:false,
          // 所有的卡片配置
          config: pluginConfig,
          placeholder:"开始编辑",
          autoAppend:true,
        });
        onLoad(engineInstance);
        //卡片最大化时设置编辑页面样式
        const lodata= getDocValue() 
        const value =lodata&&lodata!=''?lodata: getDemoData();
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
          fileTplData.value=value
          //时时获取组件
          nextTick(()=>{
             //计算页面高度
            clearInterval(state.time); 
            state.timer= setTimeout(() => {
              countPage(engineInstance)
              getPluginList()
              clearInterval(state.time); 
            }, 800);
          })
          // console.log("编辑内容高度：", containerRef.value?.clientHeight)
          // console.log("html:", engineInstance.getHtml());
        });
        engine.value = engineInstance;
        //  console.log("监听组件",engineInstance.command.queryEnabled("table"))
       }
    });
    //计算有多少页面
    const pageRaelheight=ref(1100)
    const countPage=(engine: EngineInterface)=>{
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
        const pageNum=getPageValue()
        if(pageNum!=pagenum){
          if(pageNum<pagenum){
            //创建节点中间加入空行
            const divdom1 = $('<p><br></p>');
            const divdom2 = $('<p><br></p>');
            const divdom3 = $('<p><br></p>');
            const divdom4 = $('<p><br></p>');
            const divdom5 = $('<p><br></p>');
            const divdom6 = $('<p><br></p>');
            const divdom7 = $('<p><br></p>');
            const divdom8 = $('<p><br></p>');
            const bfnewnode=engine.container.append(divdom1).append(divdom2).append(divdom3).
            append(divdom4).append(divdom5).append(divdom6).append(divdom7).append(divdom8)
            const divdom9 = $('<p><br></p>');
            const newnode= bfnewnode.append(divdom9)
          }
          setPageValue(pagenum.toString())
        }
        pageCount.value=pagenum
        nextTick(()=>{
          // 添加水印
          var watermark_txt = "<div>仅供Pge专用 请注意保护隐私</div>" ;//水印内容
          WaterMark({ "watermarl_element": ".editor-bg-page", "watermark_txt": watermark_txt });
        })
    }
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
        engine.value?.command.execute('pagebox');
        // engine.value?.command.execute('textsync');
       }
    }
    //编辑器内容改变-时时监听内容编号获取组件数据-并绑定值
    const pluginData=ref<inputItem>(inputItemData)
    var datalist=ref<inputItem[]>([])
    const getPluginList=()=>{
      if (!engine.value) return;
      datalist.value=[]
      let domlist=ref<HTMLInputElement[]>([])
      engine.value.card.components.forEach((card) => {
          //1单行文本
          const inputdoc=<HTMLInputElement>document.getElementById(`input_${card.getValue().id}`)
          if(inputdoc){
            domlist.value.push(inputdoc)
            const inputValue  = (inputdoc).value;
            const pushdata=Object.assign({},inputItemData,{uuid:card.getValue().id||"",type:"input",domid:(inputdoc).id,value:inputValue,
            style:{width:parseInt(inputdoc.style.width),height:parseInt(inputdoc.style.height)}
          })
            datalist.value.push(pushdata)
          }
          //2多行文本
          const textareas=<HTMLInputElement>document.getElementById(`textarea_${card.getValue().id}`)
          if(textareas){
            //dom
            domlist.value.push(textareas)
            const inputValue  = (textareas).value;
            const pushdata=Object.assign({},inputItemData,{uuid:card.getValue().id||"",type:"textarea",domid:(textareas).id,value:inputValue,
              style:{width:parseInt(textareas.style.width),height:parseInt(textareas.style.height)},
              bordertype:textareas.dataset.bordertype,
            })
            datalist.value.push(pushdata)
            //textarea高度自适应
            textareas.addEventListener('input', (e:Event) => {
                  textareas.style.height = (e.target as HTMLElement).scrollHeight + 'px';
             });
          }
          //3复选框
          const textcheckbox=<HTMLInputElement>document.getElementById(`checkbox_${card.getValue().id}`)
          if(textcheckbox){
            domlist.value.push(textcheckbox)
            const inputValue  = (textcheckbox).value;
            const pushdata=Object.assign({},inputItemData,{uuid:card.getValue().id||"",type:"checkbox",domid:(textcheckbox).id,value:inputValue,
            style:{width:parseInt(textcheckbox.style.width),height:parseInt(textcheckbox.style.height)}
          })
            datalist.value.push(pushdata)
          }
          //4绑定数据
          const textsync=<HTMLInputElement>document.getElementById(`textsync_${card.getValue().id}`)
          if(textsync){
            domlist.value.push(textsync)
            const inputValue  = (textsync).dataset.value||"";
            const pushdata=Object.assign({},inputItemData,{uuid:card.getValue().id||"",type:"textsync",domid:(textsync).id,value:inputValue})
            datalist.value.push(pushdata)
          }
          //5图片、签名
          const textimage=<HTMLInputElement>document.getElementById(`image_${card.getValue().id}`)
          if(textimage){
            domlist.value.push(textimage)
            const inputValue  = (textimage).dataset.value||"";
            const pushdata=Object.assign({},inputItemData,{uuid:card.getValue().id||"",type:"image",domid:(textimage).id,value:inputValue,
              style:{width:parseInt(textimage.style.width),marginBottom:parseInt(textimage.style.marginBottom)}
            })
            datalist.value.push(pushdata)
          }
      });
      //保存组件数据
      //为所有组件绑事件
      datalist.value.forEach((item)=>{
        // console.log('获取组件：', item)
        //1点击事件监听
        $(`#${item.domid}`).on("click",(event)=>{
          //显示编辑组件
          showRightPlus.value=true
          //绑定点击组件数据
          pluginData.value=item
          const pluginDom=<HTMLInputElement>document.getElementById(item.domid)
          if(item.type=="input"){
             pluginDom.focus()
          }else if(item.type=="textarea"){
            event.preventDefault();
            event.stopPropagation();
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
        });
      })
      //监听编辑器区域点击事件-获取点击组件外事件
      $(`#editorContainer`).on("mousedown",(event)=>{
        if(domlist.value.indexOf(event.target)==-1){
          showRightPlus.value=false
          console.log("8监听编辑器区域点击事件8")
        }
      });
     
    }
    //--------------操作-组件设置----------
    //保存数据
    const saveFileData=()=>{
      //  console.log("保存模板数据",fileTplData.value)
       const savelis=getPluginData()
       console.log("保存组件数据2",savelis?.value)
       setPluginValue(JSON.stringify(unref(savelis)))
    }
    const getPluginData=()=>{
      const mdatalist=ref<inputItem[]>([])
      if (!engine.value) return mdatalist;
      engine.value.card.components.forEach((card) => {
          //1单行文本
          const inputdoc=<HTMLInputElement>document.getElementById(`input_${card.getValue().id}`)
          if(inputdoc){
            const inputValue  = (inputdoc).value;
            const pushdata=Object.assign({},inputItemData,{uuid:card.getValue().id||"",type:"input",domid:(inputdoc).id,value:inputValue,
            style:{width:parseInt(inputdoc.style.width),height:parseInt(inputdoc.style.height)}
          })
          mdatalist.value.push(pushdata)
          }
          //2多行文本
          const textareas=<HTMLInputElement>document.getElementById(`textarea_${card.getValue().id}`)
          if(textareas){
            //dom
            const inputValue  = (textareas).value;
            const pushdata=Object.assign({},inputItemData,{uuid:card.getValue().id||"",type:"textarea",domid:(textareas).id,value:inputValue,
              style:{width:parseInt(textareas.style.width),height:parseInt(textareas.style.height)},
              bordertype:textareas.dataset.bordertype,
            })
            mdatalist.value.push(pushdata)
          }
          //3复选框
          const textcheckbox=<HTMLInputElement>document.getElementById(`checkbox_${card.getValue().id}`)
          if(textcheckbox){
            const inputValue  = (textcheckbox).value;
            const pushdata=Object.assign({},inputItemData,{uuid:card.getValue().id||"",type:"checkbox",domid:(textcheckbox).id,value:inputValue,
            style:{width:parseInt(textcheckbox.style.width),height:parseInt(textcheckbox.style.height)}
          })
          mdatalist.value.push(pushdata)
          }
          //4绑定数据
          const textsync=<HTMLInputElement>document.getElementById(`textsync_${card.getValue().id}`)
          if(textsync){
            const inputValue  = (textsync).dataset.value||"";
            const pushdata=Object.assign({},inputItemData,{uuid:card.getValue().id||"",type:"textsync",domid:(textsync).id,value:inputValue})
            mdatalist.value.push(pushdata)
          }
          //5图片、签名
          const textimage=<HTMLInputElement>document.getElementById(`image_${card.getValue().id}`)
          if(textimage){
            const inputValue  = (textimage).dataset.value||"";
            const pushdata=Object.assign({},inputItemData,{uuid:card.getValue().id||"",type:"image",domid:(textimage).id,value:inputValue,
              style:{width:parseInt(textimage.style.width),marginBottom:parseInt(textimage.style.marginBottom)}
            })
            mdatalist.value.push(pushdata)
          }
      });
      return mdatalist;
    }
    //点击编辑器上层区域让编辑器获取焦点
    const focusEditor=()=>{
      console.log("点击编辑器上层区域让编辑器获取焦点")
      engine.value?.focus()
    }
    return {
      ...toRefs(state),
      pesetting,
      left_tool_type,
      edit_type,
      editZoomVal,
      winHeight,
      saveFileData,
      //工具配置
      items: [
        ["undo", "redo", "paintformat", "removeformat","table"],
        ["heading", "fontfamily", "fontsize"],
        ["bold", "italic", "strikethrough", "underline", "moremark"],
        ["fontcolor", "backcolor"],
        ["alignment","unorderedlist", "orderedlist", "indent", "line-height"],
        ["link", "quote", "hr"],
      ],
      //编辑器
      containerRef,engine,loading,pageCount,pageRaelheight,
      insertComponent,pluginData,
      showRightPlus,focusEditor,
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