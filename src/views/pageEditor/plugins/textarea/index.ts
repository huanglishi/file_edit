import {
  $,
  Plugin,
  NodeInterface,
  CARD_KEY,
  isEngine,
  SchemaInterface,
  PluginOptions,
  decodeCardValue,
  encodeCardValue,
} from "@aomao/engine";
import TextareaComponent from "./component";

export interface Options extends PluginOptions {
  hotkey?: string | Array<string>;
}
export default class extends Plugin<Options> {
  static get pluginName() {
    return "textarea";
  }
  // 插件初始化
  init() {
    // 监听解析成html的事件
    this.editor.on("paser:html", (node) => this.parseHtml(node));
    // 监听粘贴时候设置schema规则的入口
    this.editor.on("paste:schema", (schema) => this.pasteSchema(schema));
    // 监听粘贴时候的节点循环
    this.editor.on("paste:each", (child) => this.pasteHtml(child));
  }
  // 执行方法
  execute() {
    if (!isEngine(this.editor)) return;
    const { card } = this.editor;
    card.insert(TextareaComponent.cardName);
  }
  // 快捷键
  hotkey() {
    return this.options.hotkey || "mod+shift+0";
  }
  // 粘贴的时候添加需要的 schema
  pasteSchema(schema: SchemaInterface) {
    schema.add({
      type: "block",
      name: "div",
      attributes: {
        "data-type": {
          required: true,
          value: TextareaComponent.cardName,
        },
        "data-value": "*",
      },
    });
  }
  // 解析粘贴过来的html
  pasteHtml(node: NodeInterface) {
    if (!isEngine(this.editor)) return;
    if (node.isElement()) {
      const type = node.attributes("data-type");
      if (type === TextareaComponent.cardName) {
        const value = node.attributes("data-value");
        const cardValue = decodeCardValue(value);
        this.editor.card.replaceNode(node, TextareaComponent.cardName, cardValue);
        node.remove();
        return false;
      }
    }
    return true;
  }
  // 解析成html
  parseHtml(root: NodeInterface) {
    root.find(`[${CARD_KEY}=${TextareaComponent.cardName}`).each((cardNode) => {
      const node = $(cardNode);
      const card = this.editor.card.find(node) as TextareaComponent;
      const value = card?.getValue();
      if (value) {
        node.empty();
        const div = $(
          `<div data-type="${
            TextareaComponent.cardName
          }" data-value="${encodeCardValue(value)}"></div>`
        );
        node.replaceWith(div);
      } else node.remove();
    });
  }
}
export { TextareaComponent };
