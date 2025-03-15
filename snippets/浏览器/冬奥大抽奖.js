/**
 * 2022年省赛。JQuery改的浏览器原生题目。中等难度。
 */

let rollTime; // 定义定时器变量用来清除定时器
let time = 0; // 转动次数
let speed = 300; // 转动时间间隔
let times; // 总转动次数

/**
 * @type {(selector: String) => HTMLElement}
 */
const $$ = document.querySelector.bind(document)


// 开始按钮点击事件后开始抽奖
$("#start").on("click", function () {
  $("#award").text(""); //清空中奖信息
  times = parseInt(Math.random() * (20 - 30 + 1) + 20, 10); // 定义总转动次数，随机20-30次
  rolling();
});

// TODO：请完善此函数
function rolling() {
  time++; // 转动次数加1
  clearTimeout(rollTime);
  rollTime = setTimeout(() => {
    window.requestAnimationFrame(rolling); // 进行递归动画
  }, speed);

  // HERE
  let curr = time % 8 == 0 ? 8 : time % 8
  $$(`.li${curr}`).classList.add("active")
  Array.from({ length: 8 }, (_, i) => i + 1)
            .filter(i => i != curr)
            .forEach(i => $$(`.li${i}`).classList.remove("active"))
  // OR
//   let licur = $$(`.li${curr}`)
//   ([...licur.parentElement.children]).forEach(e => e.classList.remove("active"))
//   HTML Collection是一个类数组对象，没有定义forEach，要转成数组
//   licur.classList.add("active")
  

  // time > times 转动停止
  if (time > times) {
    clearInterval(rollTime);
    time = 0;
    $$("#award").textContent = "恭喜您抽中了" + $$(`.li${curr}`).textContent + "!!!"
    return;
  }
}
