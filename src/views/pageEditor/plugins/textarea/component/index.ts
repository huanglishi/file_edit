import {
  $,
  Card,
  CardToolbarItemOptions,
  CardType,
  isEngine,
  NodeInterface,
  ToolbarItemOptions,
} from "@aomao/engine";
class Textarea extends Card{
  static get cardName() {
    return "textarea";
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
    this.#container = $(`<textarea id="textarea_${cardata.id}" data-bordertype="all" type="textarea" style="resize: both;width:90px;height:60px;border: #d9d9d9 1px solid;min-height:60px;"></textarea>`);
    return this.#container;
  }

  onChange(){
  }
  destroy() {
    super.destroy();
  }
}
export default Textarea;
