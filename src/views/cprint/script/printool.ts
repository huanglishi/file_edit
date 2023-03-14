//打印工具函数
import { inputItem} from '../../FileEditor/script/data';
import {$} from "@aomao/engine";
//设置初始dom
export const SetInitDom = (pluginList:any) => {
    pluginList.forEach((item:inputItem,index:number)=>{
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
            $(`#${item.domid}`).on("click",(event:any)=>{
                alert("放大图片")
            });
          } 
        }
    });
};
