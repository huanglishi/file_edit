import {
  $,
  Card,
  CardToolbarItemOptions,
  CardType,
  isEngine,
  NodeInterface,
  ToolbarItemOptions,
} from "@aomao/engine";
import  '../../../iconfont/iconfont.js'
class Pagebox extends Card{
  static get cardName() {
    return "pagebox";
  }

  static get cardType() {
    return CardType.BLOCK;
  }
  #container?: NodeInterface;
  
  init() {
    const editor = this.editor;
  }
  contenteditable = [".card-editor-container"]
// 在 div 上面单击
  render() {
    // 获取卡片的值
    const cardata=  this.getValue()
    this.#container = $(`<div class=\"card-editor-container\" id="page_${cardata.id}" style="
    width: 779px;
    height: 1056px;
    padding:30px;
    overflow: hidden;
    background: rgb(255, 255, 255);">
     
    </div>`);
    return this.#container;
  }
  onFocus(){

  }
  onChange(node:any){
    console.log("卡片内容",this.getValue())
    
  }
  destroy() {
    this.editor.trigger("deletepagecard",this.getValue().id)
    super.destroy();
  }
}
export default Pagebox;
