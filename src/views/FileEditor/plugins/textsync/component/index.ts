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
class Textsync extends Card{
  static get cardName() {
    return "textsync";
  }

  static get cardType() {
    return CardType.INLINE;
  }
  #container?: NodeInterface;
  
  init() {
    const editor = this.editor;
  }
  toolbar(): Array<ToolbarItemOptions | CardToolbarItemOptions> {
    if (!isEngine(this.editor) || this.editor.readonly) return [];
    return [
      {
        type: "delete",
      },
      {
				type: 'separator',
			},
      {
				type: 'node',
				node: $(`<span title="组件编号">${this.getValue().id}</span>`),
			},
    ];
  }
// 在 div 上面单击
  render() {
    // 获取卡片的值
    const cardata=  this.getValue()
    if(isEngine(this.editor)){//编辑状态
      this.#container = $(`<span id="textsync_${cardata.id}"  style='padding:3px 10px;vertical-align:text-bottom;border:#d9d9d9 solid 1px;border-radius: 3px;user-select: none;cursor: pointer;'>
        <svg aria-hidden="true" style="width: 1em;height: 1em; position: relative;fill: currentColor;vertical-align: -2px;">
          <use xlink:href="#icon-bangding" :fill="color" />
        </svg> 绑定数据
      <span>`);
    }else{//阅读模式
      this.#container = $(`<span id="textsync_${cardata.id}" >RH-333</span>`);
    }
   
    return this.#container;
  }
  onChange(){
  }
  destroy() {
    super.destroy();
  }
}
export default Textsync;
