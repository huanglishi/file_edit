import {
  $,
  Card,
  CardToolbarItemOptions,
  CardType,
  isEngine,
  NodeInterface,
  ToolbarItemOptions,
} from "@aomao/engine";
class Textcheckbox extends Card{
  static get cardName() {
    return "textcheckbox";
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
      this.#container = $(`<input type="checkbox" value="0" id="checkbox_${cardata.id}"  class="ediecheckbox" style='width:20px;height:20px;vertical-align:text-bottom;' />`);
    }else{//阅读模式
      this.#container = $(`<span id="checkbox_${cardata.id}" style=" width:20px;height:20px;border: 1px solid #000;vertical-align:text-bottom;display: inline-table;"><span style="content: '';display: block;width: 4px;height: 7px;position:relative;top:4px;left:7px;border: solid #000;border-width: 0 2px 2px 0;transform: rotate(45deg);"></span></span>`);
    }
    return this.#container;
  }

  onChange(){
    console.log("获取内容22",super.getValue())
  }
  destroy() {
    super.destroy();
  }
}
export default Textcheckbox;
