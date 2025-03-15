/**
 * 2024年省赛。中等难度。
 */
/**
 * @param {*} imageCount 生成的图片数量
 * @param {String} selectedText 用户输入的文本
 */
function generateAndDisplayImages(imageCount, selectedText) {
    // TODO：待补充代码 
    let filtered = artDataArray.map((it) => {
        let weight = it.tags.split("、")
                            .filter(tag => selectedText.includes(tag)).length
        return {...it, "weight": weight}
    })
    filtered.sort((a, b) => b.weight - a.weight)  // 降序
    return filtered.slice(0, imageCount)
}