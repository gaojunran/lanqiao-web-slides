const $ = (ele) => document.querySelector(ele)

const blocks = [...document.querySelectorAll(".container .lawn")]
let curr = 0;

// TODO：游戏开始
function start() {
    $("#move").style.display = "block"
    $("#start").style.display = "none"
}
// TODO：重置游戏
function reset() {
    blocks[curr].classList.remove("active")
    curr = 0;
    blocks[curr].classList.add("active")
    $("#reset").style.display = "none"
    $("#start").style.display = "block"
    $(".result").textContent = ""
    $(".process input").value = ""
}
// TODO：移动
function move() {
    const step = +($(".process input").value)
    if (!(step == 1 || step == 2)) {
        $(".result").textContent = "输入的步数不正确，请重新输入。"
    } else {
        $(".result").textContent = ""
        blocks[curr].classList.remove("active")
        curr += step
        blocks[curr].classList.add("active")
        if (curr == 12) {
            $("#move").style.display = "none"
            $("#reset").style.display = "block"
            $(".result").textContent = "哎呀！兔子踩到炸弹了，游戏结束！"
        } else if (curr == 23) {
            $("#move").style.display = "none"
            $("#reset").style.display = "block"
            $(".result").textContent = "小兔子吃到胡萝卜啦，游戏获胜！"
        }
    }
}
