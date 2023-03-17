// 导出页面为PDF格式

import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'
export default {
  install(Vue:any, options:any) {
    Vue.prototype.htmlToPdf= function() {
      window.pageYoffset = 0
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
      // 当下载pdf时，若不在页面顶部会造成PDF样式不对,所以先回到页面顶部再下载
      let top = document.getElementById('pdfDom')
      if (top != null) {
        top.scrollIntoView()
        top = null
      }
      let title = ''
      if (this.exportPDFtitle) {
        title = this.exportPDFtitle
      } else {
        title = '测试'
      }
      html2Canvas(document.querySelector('#pdfDom'), {
        logging: false,
        allowTaint: true,
        useCORS: true
      }).then((canvas) => {
        const pdf = new JsPDF('p', 'mm', 'a4')// A4 纵向
        const ctx = canvas.getContext('2d')
        const a4w = 190 // A4大小，210mm x 297mm，四边各保留自定义的边距，显示区域190x260
        const a4h = 277
        const imgHeight = Math.floor(a4h * canvas.width / a4w) // 按A4显示比例换算一页图像的像素高度
        let renderedHeight = 0
        while (renderedHeight < canvas.height) {
          const page = document.createElement('canvas')
          page.width = canvas.width
          page.height = Math.min(imgHeight, canvas.height - renderedHeight)// 不足一页
          // 用getImageData剪裁指定区域，并画到前面创建的canvas对象中
          var a = page.getContext('2d')
          a?.putImageData(ctx.getImageData(0, renderedHeight, canvas.width, Math.min(imgHeight, canvas.height - renderedHeight)), 0, 0)
          pdf.addImage(page.toDataURL('png', 1.0), 'JPEG', 10, 10, a4w, Math.min(a4h, a4w * page.height / page.width)) // 添加图像到页面，保留10mm边距
          renderedHeight += imgHeight
          if (renderedHeight < canvas.height) { pdf.addPage() }// 如果后面还有内容，添加一个空页
          // delete page;
        }
        pdf.save(title + '.pdf')
      })

    }

  }

}