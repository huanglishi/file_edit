export const getCurrentKey = () => {
  return localStorage.getItem("demo-key") || "default";
};

export const setCurrentKey = (key = "default") => {
  localStorage.setItem("demo-key", key);
};
//1.1保存文档模板
export const setDocValue = (value: string, key: string = getCurrentKey()) => {
  localStorage.setItem(`${key}-demo-value`, value);
};
//1.2获取文档模板
export const getDocValue = (key: string = getCurrentKey()) => {
  return localStorage.getItem(`${key}-demo-value`);
};
//2.1保存文档组件设置
export const setPluginValue = (value: string, key: string = getCurrentKey()) => {
  localStorage.setItem(`${key}-plugin-value`, value);
};
//2.2获取文档组件设置
export const getPluginValue = (key: string = getCurrentKey()) => {
  return localStorage.getItem(`${key}-plugin-value`);
};
//设置当前几页
export const setPageValue = (value: string) => {
  return localStorage.setItem(`nowpage`, value);
};
//获取保存的几页
export const getPageValue = () => {
  return localStorage.getItem(`nowpage`)?parseInt(localStorage.getItem(`nowpage`)||"0"):0;
};
