/**
 * 2023年省赛。低难度。
 */

/**
 * 创建一个文字水印的div
 * @param  {string} text - 水印文字
 * @param  {string} color - 水印颜色
 * @param  {number} deg - 水印旋转角度
 * @param  {number} opacity - 水印透明度
 * @param  {number} count - 水印数量
 */
function createWatermark(text, color, deg, opacity, count) {
    // 创建水印容器
    const container = document.createElement("div");
    container.className = "watermark";
  
    // TODO: 根据输入参数创建文字水印
    Array.from({ length: count }).forEach(() => {
      let span = document.createElement('span')
      span.innerHTML = text
      span.style.color = color
      span.style.opacity = opacity
      span.style.transform = `rotate(${deg}deg)`  
      // 这个不会用可以去css文件里试一下，有补全
      container.append(span)
    })
    return container;
  }