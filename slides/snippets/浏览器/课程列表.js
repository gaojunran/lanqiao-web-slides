/**
 * 2022年省赛。中等难度。
 */

let pageNum = 1; // 当前页码，默认页码1
let maxPage; // 最大页数
let data;
const container = document.getElementById("list")


// TODO：待补充代码
window.onload = async () => {
  const res = await fetch("./js/carlist.json")
  data = await res.json()
  maxPage = Math.ceil(data.length / 5)
  container.innerHTML = ""
  data.slice((1 - 1) * 5, (1 - 1) * 5 + 5).forEach(show)
}

function show(item) {
  container.innerHTML += `
  <!-- list-group 起始位置  list-group为示例代码，动态渲染时可删除-->
      <div class="list-group">
        <a href="#" class="list-group-item list-group-item-action">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">${item.name}</h5>
            <small>${(item.price / 100).toFixed(2)}元</small>
          </div>
          <p class="mb-1">
            ${item.description}
          </p>
        </a>
      </div>
      <!-- list-group 结束位置 -->
  `
}

// 点击上一页
let prev = document.getElementById("prev");
prev.onclick = function () {
  // 1 => 0 - 4
  // 2 => 5 - 9
  if (this.classList.contains("disabled")) {
    return  // do nothing
  }
  pageNum--;
  container.innerHTML = ""
  data.slice((pageNum - 1) * 5, (pageNum) * 5).forEach(show)
  pageNum == 1 ? prev.classList.add("disabled") : prev.classList.remove("disabled")
  pageNum == maxPage ? next.classList.add("disabled") : next.classList.remove("disabled")
  // TODO：待补充代码
};

// 点击下一页
let next = document.getElementById("next");
next.onclick = function () {
  if (this.classList.contains("disabled")) {
    return  // do nothing
  }
  pageNum++;
  container.innerHTML = ""
  data.slice((pageNum - 1) * 5, (pageNum) * 5).forEach(show)
  pageNum == 1 ? prev.classList.add("disabled") : prev.classList.remove("disabled")
  pageNum == maxPage ? next.classList.add("disabled") : next.classList.remove("disabled")
};
