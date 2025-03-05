/**
 * 2022年省赛。签到题。
 */

/**
 * @type {(selector: String) => HTMLElement}
 */
const $ = document.querySelector.bind(document)

// TODO：完善此函数 显示红色颜色的灯
function red() {
    $("#defaultlight").style.display = "none"
    $("#greenlight").style.display = "none"
    $("#redlight").style.display = "inline-block"
}

// TODO：完善此函数  显示绿色颜色的灯
function green() {
    $("#defaultlight").style.display = "none"
    $("#redlight").style.display = "none"
    $("#greenlight").style.display = "inline-block"
}

// TODO：完善此函数
function trafficlights() {
    setTimeout(red, 3000)
    setTimeout(green, 6000)
}

function trafficlights2() {
    setTimeout(() => {
        red()
        setTimeout(green, 3000)
    }, 3000)
}


trafficlights();