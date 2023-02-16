import {
  $,
  Card,
  CardToolbarItemOptions,
  CardType,
  isEngine,
  NodeInterface,
  ToolbarItemOptions,
} from "@aomao/engine";
class Textinput extends Card{
  static get cardName() {
    return "textinput";
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
    this.#container = $(`<input value="" id="input_${cardata.id}" style="width: 120px; height: 30px;border-radius:0;border-top-width: 0px; border-left-width: 0px;border-right-width: 0px; border-bottom-width: 1px;border-color: #d9d9d9;" />`);
    return this.#container;
  }

  onChange(){
    console.log("获取内容22",super.getValue())
  }
  destroy() {
    super.destroy();
  }
}
export default Textinput;
