
//生成水印
export const WaterMark = (settings:any) => {
    //默认设置
    var defaultSettings = {
        watermarl_element: settings.watermarl_element||"body",
        watermark_txt: settings.watermark_txt||"水印",
        watermark_x: 50,//水印起始位置x轴坐标
        watermark_y: 280,//水印起始位置Y轴坐标
        watermark_rows: 3000,//水印行数
        watermark_cols: 5000,//水印列数
        watermark_x_space: 100,//水印x轴间隔
        watermark_y_space: 500,//水印y轴间隔
        watermark_color: '#d7d7d7',//水印字体颜色
        watermark_alpha: 0.6,//水印透明度
        watermark_fontsize: '18px',//水印字体大小
        watermark_font: '源思黑体',//水印字体
        watermark_width: 300,//水印宽度
        watermark_height: 50,//水印长度
        watermark_angle: 30//水印倾斜度数
    };
    var oTemp = document.createDocumentFragment();
    // 获取加水的dom
    var maskElement = document.getElementById(defaultSettings.watermarl_element) || document.body;
    //获取页面最大宽度
    var page_width = Math.max(maskElement.scrollWidth, maskElement.clientWidth);
    //获取页面最大高度
    var page_height = Math.max(maskElement.scrollHeight, maskElement.clientHeight, maskElement.scrollTop);
    //水印数量自适应元素区域尺寸 列
    defaultSettings.watermark_cols = Math.ceil(page_width / (defaultSettings.watermark_x_space + defaultSettings.watermark_width));
    // 行
    defaultSettings.watermark_rows = Math.ceil(page_height / (defaultSettings.watermark_y_space + defaultSettings.watermark_height));
    var x;
    var y;
    for (var i = 0; i < defaultSettings.watermark_rows; i++) {
        y = defaultSettings.watermark_y + (defaultSettings.watermark_y_space + defaultSettings.watermark_height) * i;
        for (var j = 0; j < defaultSettings.watermark_cols; j++) {
            x = defaultSettings.watermark_x + (defaultSettings.watermark_width + defaultSettings.watermark_x_space) * j;
            var mask_div = document.createElement('div');
            // 每一个水印创建一个id
            mask_div.id = 'mask_div' + i + j;
            // 每一个水印创建一个类名
            mask_div.className = 'mask_div';
            mask_div.innerHTML = (defaultSettings.watermark_txt);
            //设置水印div倾斜显示
            mask_div.style.webkitTransform = "rotate(-" + defaultSettings.watermark_angle + "deg)";
            mask_div.style.transform = "rotate(-" + defaultSettings.watermark_angle + "deg)";
            mask_div.style.visibility = "";
            mask_div.style.position = "absolute";
            mask_div.style.left = x + 'px';
            mask_div.style.top = y + 'px';
            mask_div.style.overflow = "hidden";
            mask_div.style.zIndex = "0"; // 9999
            // pointer-events:none  让水印不遮挡页面的点击事件
            // mask_div.style.pointerEvents = 'none';
            // 设置边框
            // mask_div.style.border="solid #eee 1px";
            // 兼容IE9以下的透明度设置
            mask_div.style.filter = "alpha(opacity=70)";
            mask_div.style.fontSize = defaultSettings.watermark_fontsize;
            mask_div.style.fontFamily = defaultSettings.watermark_font;
            mask_div.style.color = defaultSettings.watermark_color;
            mask_div.style.textAlign = "left";
            mask_div.style.width = defaultSettings.watermark_width + 'px';
            mask_div.style.height = defaultSettings.watermark_height + 'px';
            mask_div.style.display = "block";
            oTemp.appendChild(mask_div);
        };
    };
    maskElement.appendChild(oTemp);
};
  