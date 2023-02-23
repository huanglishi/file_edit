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
        <el-dialog v-model="uploadBtn" title="上传图片/签名" width="30%" draggable>
             <div class="upbox">
                <el-upload
                    class="upload-kj"
                    drag
                    multiple
                    :show-file-list="false"
                    :before-upload="beforeAvatarUpload"
                >
                   <div class="viewbox" v-if="imageUrl">
                      <el-icon class="del" color="#f56c6c" :size="21" @click="removeImg($event)"><CircleCloseFilled /></el-icon>
                     <img  :src="imageUrl" class="imgbox" />
                   </div>
                   <div class="upbtn" v-else>
                        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                        <div class="el-upload__text">
                            将文件放在此处或 <em>点击上传</em>
                        </div>
                    </div>
                    <template #tip>
                        <div class="el-upload__tip">
                            小于500kb的jpg/png文件
                        </div>
                    </template>
                </el-upload>
             </div>
            <template #footer>
            <span class="dialog-footer">
                <el-button @click="uploadBtn = false">取消</el-button>
                <el-button type="primary" @click="uploadBtn = false">
                 确定
                </el-button>
            </span>
            </template>
        </el-dialog>
   </div>
</template>
<script lang="ts"  >
import { defineComponent, onMounted, reactive,ref,nextTick, toRefs } from 'vue';
import { getDocValue, getPluginValue,setPluginValue} from "../FileEditor/script/index";//数据存储本地
import { cards, plugins, pluginConfig } from "../FileEditor/script/config";
//数据
import { inputItem,inputItemData} from '../FileEditor/script/data';
//编辑器
import {
  $,
  View,
  EngineInterface,
} from "@aomao/engine";
import { UploadFilled ,CircleCloseFilled} from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import type { UploadProps } from 'element-plus'
export default defineComponent({
  name: 'FileWrite',
  // 注册组件
  components: {
    UploadFilled,CircleCloseFilled
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
     //上传
     const uploadBtn=ref(false)
     const imageUrl=ref("")
     const uploadRef=ref<HTMLElement | null>(null);

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
                        uploadBtn.value=true
                        // uploadRef.value?.click()
                        // alert("上传")
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
    //上传附件
    const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
        console.log("上传附件1")
        if (rawFile.type !== 'image/jpeg') {
            ElMessage.error('Avatar picture must be JPG format!')
            return false
        } else if (rawFile.size / 1024 / 1024 > 2) {
            ElMessage.error('Avatar picture size can not exceed 2MB!')
            return false
        }
        imageUrl.value = URL.createObjectURL(rawFile)
        console.log("上传附件")
        return false
    }
    //移除图片
    const removeImg=(ev:Event)=>{
        ev.stopPropagation();    
        imageUrl.value =""
    }
    return{
        winHeight,
        container,engine,loading,
        savedata,
        uploadRef,
        uploadBtn,imageUrl,
        beforeAvatarUpload,removeImg,
    }
  }
});

</script>
<style lang="scss" scoped>
@import "./style/index.scss";
</style>