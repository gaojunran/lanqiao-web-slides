/**
 * 2022年国赛。中高难度。
 */

const $ = document.querySelector.bind(document)
const $a = document.querySelectorAll.bind(document)

const flipped = new Set() // 放Set，避免两次点击同一个。
// TODO：请补充代码
function startGame() {
    // 按下开始后隐藏开始键
    $("#start").style.display = "none"
    document.querySelectorAll(".img-box").forEach(box => {
        box.addEventListener("click", function (){
            this.firstElementChild.style.display = "block"  // 显示图片
            flipped.add(this.id);
            if (flipped.size == 2) {
                let first = $(`#${[...flipped][0]}`);
                let second = $(`#${[...flipped][1]}`);
                if (first.firstElementChild.src === second.firstElementChild.src) {
                    // 相同，格子消失
                    first.style.visibility = "hidden";
                    second.style.visibility = "hidden";
                    first.firstElementChild.style.display = "none"
                    second.firstElementChild.style.display = "none"
                    $("#score").textContent = String(+scoreNode.textContent + 2)
                } else {
                    // 不同，格子里的图片消失
                    first.firstElementChild.style.display = "none"
                    second.firstElementChild.style.display = "none"
                    $("#score").textContent = String(+scoreNode.textContent - 2)
                }
                flipped.clear()   // 清空
            }
        })
    })
}