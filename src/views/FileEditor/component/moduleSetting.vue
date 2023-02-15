<template>
 <div v-if="pluginData" class="pluginbox">
    <div class="headerline">
      <div class="title">{{ getPluTitle(pluginData.type) }}</div>
      <div class="no">{{ pluginData.keyid }}</div>
    </div>
    <!--编辑区-->
    <div class="content-box">
        
        <!--1单行文本输入框-->
        <div class="inputbox" v-if="pluginData.type=='input'">
          <el-form :model="formdata" label-width="78px" label-position="right">
            <el-form-item label="标题">
               <el-input v-model="formdata.title" placeholder="用于区分控件（选填）"/>
            </el-form-item>
            <el-form-item label="输入类型">
                <el-radio-group v-model="formdata.inputtype" size="small">
                  <el-radio border label="write" style="margin-right: 13px;">手动填写</el-radio>
                  <el-radio border label="select" >选择数据</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="选择数据" v-if="formdata.inputtype=='select'">
               <el-input v-model="formdata.dataid" placeholder="选择的数据源"/>
            </el-form-item>
            <!--填写权限-->
            <el-form-item label="填写权限">
                <el-radio-group v-model="formdata.permission" size="small">
                  <el-radio border label="all" style="margin-right: 13px;">所有人</el-radio>
                  <el-radio border label="assign" >指定人</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="授权用户" v-if="formdata.permission=='assign'">
                <el-select-v2
                    v-model="formdata.authuserid"
                    filterable
                    :options="authuserList"
                    placeholder="选择可以填写的用户"
                    style="width: 240px"
                    multiple
                  />
            </el-form-item>
          </el-form>
        </div>
        <!--2多行文本输入框-->
        <div class="textarea" v-if="pluginData.type=='textarea'">
          <el-form :model="formdata" label-width="75px" label-position="right">
            <el-form-item label="标题">
               <el-input v-model="formdata.title" placeholder="用于区分控件（选填）"/>
            </el-form-item>
            <el-form-item label="输入类型">
                <el-radio-group v-model="formdata.inputtype" size="small">
                  <el-radio border label="write" style="margin-right: 13px;">手动填写</el-radio>
                  <el-radio border label="select" >选择数据</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="选择数据" v-if="formdata.inputtype=='select'">
               <el-input v-model="formdata.dataid" placeholder="选择的数据源"/>
            </el-form-item>
            <!--填写权限-->
            <el-form-item label="填写权限">
                <el-radio-group v-model="formdata.permission" size="small">
                  <el-radio border label="all" style="margin-right: 13px;">所有人</el-radio>
                  <el-radio border label="assign" >指定人</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="授权用户" v-if="formdata.permission=='assign'">
                <el-select-v2
                    v-model="formdata.authuserid"
                    filterable
                    :options="authuserList"
                    placeholder="选择可以填写的用户"
                    style="width: 240px"
                    multiple
                  />
            </el-form-item>
            <div class="style-setting">
              <div class="style-header">
                输入框样式
              </div>
              <div class="style-form">
                <el-form-item label="框宽/高">
                    <el-col :span="11">
                      <el-input v-model="formdata.style.width" placeholder="设置宽" :step="10" @change="changeStyle(formdata.style.width+'px','width')" type="number" min="80" max="800"/>
                    </el-col>
                    <el-col :span="2" class="text-center">
                      <span style="padding-left: 5px;">-</span>
                    </el-col>
                    <el-col :span="11">
                      <el-input v-model="formdata.style.height" :step="10" @change="changeStyle(formdata.style.height+'px','height')" placeholder="设置高" min="50" type="number"/>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="边框">
                    <el-radio-group v-model="formdata.bordertype" size="small" @change="changeBorder(formdata.bordertype)">
                      <el-radio border label="all" style="margin-right: 2px;">全框</el-radio>
                      <el-radio border label="bottom" style="margin-right: 2px;">底部</el-radio>
                      <el-radio border label="none" style="margin-right: 0px;">无框</el-radio>
                    </el-radio-group>
                </el-form-item>
              </div>
            </div>
          </el-form>
        </div>
        <!--3复选框-->
        <div class="checkbox" v-if="pluginData.type=='checkbox'">
          <el-form :model="formdata" label-width="78px" label-position="right">
            <el-form-item label="标题">
               <el-input v-model="formdata.title" placeholder="用于区分控件（选填）"/>
            </el-form-item>
            <el-form-item label="填写权限">
                <el-radio-group v-model="formdata.permission" size="small">
                  <el-radio border label="all" style="margin-right: 13px;">所有人</el-radio>
                  <el-radio border label="assign" >指定人</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="授权用户" v-if="formdata.permission=='assign'">
               <el-select-v2
                    v-model="formdata.authuserid"
                    filterable
                    :options="authuserList"
                    placeholder="选择可以填写的用户"
                    style="width: 240px"
                    multiple
                  />
            </el-form-item>
          </el-form>
        </div>
        <!--4图片签名-->
        <div class="imagebox" v-if="pluginData.type=='image'">
          <el-form :model="formdata" label-width="78px" label-position="right">
            <el-form-item label="标题">
               <el-input v-model="formdata.title" placeholder="用于区分控件（选填）"/>
            </el-form-item>
          </el-form>
        </div>
        <!--4绑定动态数据-->
        <div class="textsync" v-if="pluginData.type=='textsync'">
          <el-form :model="formdata" label-width="78px" label-position="right">
            <el-form-item label="标题">
               <el-input v-model="formdata.title" placeholder="用于区分控件（选填）"/>
            </el-form-item>
            <el-form-item label="数据来源">
                <el-radio-group v-model="formdata.datafrom" size="small">
                  <el-radio border label="select" style="margin-right: 13px;">绑定数据</el-radio>
                  <el-radio border label="formula" >公式计算</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="绑定数据" v-if="formdata.datafrom=='select'">
               <el-input v-model="formdata.dataid"  placeholder="选择需要显示的数据源"/>
            </el-form-item>
            <el-form-item label="计算公式" v-if="formdata.datafrom=='formula'">
               <el-input v-model="formdata.dataid"  placeholder="编辑计算公式"/>
            </el-form-item>
            <el-form-item label="默认值">
               <el-input v-model="formdata.value"  placeholder="未加载默认数据（选填）"/>
            </el-form-item>
          </el-form>
        </div>
    </div>
 </div>

</template>
<script lang="ts">
  import { defineComponent,PropType, ref,watch, computed, unref } from 'vue';
  import SvgIcon from '../iconfont/SvgIcon.vue'
  import { PluginList,inputItem,inputItemData } from '../script/data';
  export default defineComponent({
    name: 'moduleSetting',
    components: { 
    SvgIcon,
    },
    props:{
        pluginData:{
            type:Object as PropType<inputItem>,
            required:true,
        }
    },
    emits: ['success', 'pointershow','insert'],
    setup(props, { emit }) {
        const formdata=ref<inputItem>(inputItemData)
        //选择用户
        const authuserList=ref([
          {
            value:"g1",
            label:"XX部门",
            options:[
              {
                value:"1",
                 label:"张三",
              },
              {
                value:"2",
                 label:"李四",
              }
            ]
          },
          {
            value:"g2",
            label:"YY部门",
            options:[
              {
                value:"11",
                 label:"王五",
              },
              {
                value:"12",
                 label:"赵六",
              }
            ]
          },
        ])
        const activeName = ref<string[]>([])
        const plist = ref(PluginList[1])
        const getPluTitle=(types:any)=>{
          const data=plist.value.block.find((item)=>item.key==types)
            return data?.name
        }
        watch(
          () => props.pluginData, // reactive同理
          (newProps) => {
            formdata.value=newProps
                console.log("查看新值:",newProps);//查看新值
          }
        );
        //设置样式
        const changeStyle=(val:any,keys:string)=>{
          const pluginDom=<HTMLInputElement>document.getElementById(formdata.value.domid)
            pluginDom.style[keys]=val
        }
        //设置样式的边框
        const changeBorder=(type:any)=>{
          const pluginDom=<HTMLInputElement>document.getElementById(formdata.value.domid)
           if(type=="all"){//整框
            pluginDom.style.border='#d9d9d9 1px solid'
           }else if(type=="bottom"){//底部
            pluginDom.style.border='0'
            pluginDom.style.borderBottom='#d9d9d9 1px solid'
           }else if(type=="none"){//无边框
            pluginDom.style.border='0'
          }
        }
        return { 
            activeName,
            getPluTitle,
            //表单
            formdata,
            authuserList,
            changeStyle,changeBorder,
        };
    },
  });
</script>
<style lang="scss" scoped>
@import "./style/moduleSetting.scss";
</style>