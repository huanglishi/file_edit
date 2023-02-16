//组件数据
export const PluginList =[
    {id:"layout",title:"布局组件",block:[
        {key:"title",icon:"icon-biaoti",color:"", name:"标题"},
        {key:"table",icon:"icon-biaodanzujian-biaoge",color:"",name:"表格"},
    ]},
    {id:"form",title:"表单组件",block:[
        {key:"input",icon:"icon-wenbenkuang",color:"",name:"单行文本框"},
        {key:"textarea",icon:"icon-a-73textarea",color:"",name:"多行文本框"},
        {key:"checkbox",icon:"icon-fuxuankuang-true",color:"",name:"复选框"},
        {key:"image",icon:"icon-fujiaqianming",color:"",name:"图片/签名"},
        {key:"textsync",icon:"icon-2dongtaiwenzi",color:"#409eff",name:"动态绑定数据"},
    ]},
]
export interface styleImtm{
    height:number ;//高
    width:number ;//宽
}
//类型
export interface inputItem{
    keyid:string ;//组件唯一id
    type:string ;//组件类型
    domid:string ;//组件节点id
    value: string;//组件值
    readuid: number;//绑定填写人0=不限制
    //新增
    title: string,//控件标题
    dataid: number,//控件绑定选择数据id
    inputtype:string,//文本输入框的填写类型w=手动填写,select=选择数据
    permission:string,//填写权限all=所有人，assign=指定人
    authuserid:number,//授权用户id
    datafrom:string,//动态数据-数据来源于
    //样式
    style: styleImtm,//组件样式
    bordertype:string,//组件样式边框类型all=框，bottom=底部边框，none=无边框
}
//示例数据
export const inputItemData ={
    keyid:"",
    type:"",
    domid:"",
    value:"",
    readuid:0,
    //新增
    title:"",
    dataid:0,
    inputtype:"write",
    permission:"all",
    authuserid:0,
    datafrom:"select",
    style:{
        height:0,
        width:0,
    },
    bordertype:"all",
}