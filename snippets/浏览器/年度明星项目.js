/**
 * 2023年省赛。中等难度。
 */

// 翻译数据
let translation = {};
// 当前语言
let currLang = "zh-cn";
// 对象数据
let data = []
// 第几页，idx
let page = 0

// 请求数据和初始展示
window.onload = async () => {
  const res1 = await fetch("./js/all-data.json")
  data = await res1.json()
  const res2 = await fetch("./js/translation.json")
  translation = await res2.json()
  data.slice(0, 15).forEach(item => $(".list > ul").append(createProjectItem(
    {...item, description: currLang == "zh-cn" ? item.descriptionCN : item.descriptionEN}
  )))
}

// 加载更多的回调
document.querySelector(".load-more").addEventListener("click", function() {
  // 注意：page是更新前的索引
  // page == 0
  // idx == 15
  data.slice((page + 1) * 15, (page + 2)* 15).forEach(item => $(".list > ul").append(createProjectItem(
    {...item, description: currLang == "zh-cn" ? item.descriptionCN : item.descriptionEN}
  )))

  // 比如一共4页时，第3页(page == 2)就该隐藏
  if (page == Math.ceil(data.length) / 15 - 2) {
    this.style.display = "none"
  }

  // 状态最后更新
  page++
})



// TODO-END

// 用户点击切换语言的回调
$(".lang").click(() => {
  // 切换页面文字的中英文
  if (currLang === "en") {
    $(".lang").text("English");
    currLang = "zh-cn";
  } else {
    $(".lang").text("中文");
    currLang = "en";
  }
  $("body")
    .find("*")
    .each(function () {
      const text = $(this).text().trim();
      if (translation[text]) {
        $(this).text(translation[text]);
      }
    });
  // TODO: 请在此补充代码实现项目描述的语言切换
  // 从浏览器中复制出选择器，去掉伪类选择器
  document.querySelectorAll("body > div > div.list > ul > li > div.desc > p").forEach(item => {
    // console.log(item);
    item.textContent = 
              currLang == "zh-cn"
              ? data.find(i => i.descriptionEN == item.textContent).descriptionCN
              : data.find(i => i.descriptionCN == item.textContent).descriptionEN
  })
  // 或者：清空，重新插入
});

// 生成列表DOM元素的函数，将该元素的返回值append至列表中即可生成一行项目数据
/**
 * @param  {string} name - 项目名称
 * @param  {string} description - 项目描述
 * @param  {string[]} tags - 项目标签
 * @param  {number} stars - 项目star数量
 * @param  {string} icon - 项目icon路径
 */
function createProjectItem({ name, description, tags, stars, icon }) {
  return `
    <li class="item">
      <img src="images/${icon}" alt="">
      <div class="desc">
        <h3>${name}</h3>
        <p>${description}</p>
        <ul class="labels">
          ${tags.map((tag) => `<li>${tag}</li>`).join("")}
        </ul>
      </div>
      <div class="stars">
        +${stars} 🌟
      </div>
    </li>
  `;
}
