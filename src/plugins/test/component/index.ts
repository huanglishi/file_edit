import {
  $,
  Card,
  CardToolbarItemOptions,
  CardType,
  isEngine,
  NodeInterface,
  ToolbarItemOptions,
} from "@aomao/engine";
import { App, createApp ,ref,unref} from "vue";
const fncolor=ref("#000000"),bgcolor=ref("#FFEFD1"),dvalue=ref("这里输入内容")
import TestVue from "./test.vue";
import { ColorTool, Palette } from './toolbar';
var vm: App;
class Test extends Card {
  static get cardName() {
    return "test";
  }

  static get cardType() {
    return CardType.BLOCK;
  }
	static colors = Palette.getColors().map((group) =>
		group.map((color) => {
			return { color, border: Palette.getStroke(color) };
		}),
	);
  #container?: NodeInterface;
  colorTool?: ColorTool;
  bgcolorTool?: ColorTool;
  
  init() {
    const editor = this.editor;
    //文章颜色
    if (this.colorTool) return;
		this.colorTool = new ColorTool(editor, this.id, {
			colors: Test.colors,
			defaultColor:unref(fncolor),
			onChange: (color: string) => {
        fncolor.value=color
        this.#container?.attributes('style', `color: ${color};background-color: ${unref(bgcolor)};`)
			},
		});
    //背景色
    if (this.bgcolorTool) return;
		this.bgcolorTool = new ColorTool(editor, this.id, {
			colors: Test.colors,
			defaultColor:unref(bgcolor),
			onChange: (color: string) => {
        bgcolor.value=color
        this.#container?.attributes('style', `color: ${unref(fncolor)};background-color: ${color};`)
			},
		});

  }
  toolbar(): Array<ToolbarItemOptions | CardToolbarItemOptions> {
    if (!isEngine(this.editor) || this.editor.readonly) return [];
    return [
      {
        type: "dnd",
      },
      {
        type: "copy",
      },
      {
        type: "delete",
      },
      {
        key: 'separator',
        type: 'separator',
      },
      {
        key: 'color',
        type: 'node',
        title:  "文字颜色",
        node: this.colorTool!.getButton(),
      },
      {
        key: 'color',
        type: 'node',
        title:  "背景颜色",
        node: this.bgcolorTool!.getButton(),
      },
      // {
      //   type: "node",
      //   node: $("<span>测试按钮</span>"),
      //   didMount: (node) => {
      //     node.on("click", () => {

      //     });
      //   },
      // },
    ];
  }
  contenteditable = [".lightblock"]
  render() {
    this.#container = $("<div class='lightblock' id='lightblock'>加载中</div>");
    return this.#container;
  }

  didRender() {
    super.didRender();
    vm = createApp(TestVue, {dvalue:unref(dvalue)});
    vm.mount(this.#container?.get<HTMLElement>());
  }
  onChange(){
    console.log("获取内容22",super.getValue())
  }
  destroy() {
    super.destroy();
    vm?.unmount();
  }
}
export default Test;
