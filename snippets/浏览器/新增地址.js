/**
 * 2022年国赛。中高难度。
 */

// 初始化省份下拉列表内容
function provinceInit() {
    var province = document.getElementById("param_province");
    province.length = provinces.length;
    for (var i = 0; i < provinces.length; i++) {
      province.options[i].text = provinces[i];
      province.options[i].value = provinces[i];
    }
  }
  
  // 选择省份后对应城市下拉列表内容渲染
  function provincechange() {
    // TODO：请补充代码实现功能
    let province = document.querySelector("#param_province").value
    let idx = provinces.findIndex(i => i === province)  // 有一个方法叫indexOf
    // 思考：需不需要考虑“请选择城市”？
    // 删除
  
    // 注意：children是一个只读属性
    // document.querySelector("#param_city").children = ["请选择城市"]
    document.querySelector("#param_city").innerHTML = ""
  
    // 添加
    let choices = citys[idx]
    choices.forEach(city => {
      let option = document.createElement("option")
      option.textContent = city
      document.querySelector("#param_city").append(option)
    })
  }
  
  /**
   * 为标签绑定单击事件。
   * 事件效果为：
   * 1、鼠标点击该标签后该标签样式显示 class=active；
   * 2、其他已选标签的 active 样式被移除；
   * 3、将选中的标签对应下标（即选择器为 “mark a” 选中的标签对应的下标）更新到 id=param_mark 的隐藏的 input 中。
   */
  function addClick() {
    // TODO：请补充代码实现功能
    const spans = document.querySelectorAll(".mark a");
    spans.forEach((el) => {
      el.addEventListener("click", () => {
        document.querySelector('.active').classList.remove('active')
        el.classList.add("active");
      });
    });
  }


  // 提交信息后，读取并显示在页面中，第二题和第四题的任务
  function saveInfo() {
    // TODO：请补充代码实现功能
    // 姓名，电话，地址
    const param_phone = document.getElementById("param_phone").value;
    const param_name = document.getElementById("param_name").value;
    const param_address = document.getElementById("param_address").value;
    // 警告框
    const warning = document.querySelector(".warning-dialog");
    // 地址列表
    const addresslist = document.querySelector(".address-list");
    // 联系人信息
    const user = document.querySelector(".user-info");
    // 地址
    const address = document.querySelector(".address");
    // 选择的省，城市
    const param_province = document.getElementById("param_province");
    const city = document.getElementById("param_city");
    // 标签
    const span = document.querySelector(".active");
    const obj = { 家: "home", 公司: "company", 学校: "school" };
    const template = `
          <li>
            <div class="show-area">
              <label class="${obj[span.textContent]}">${span.textContent}</label>
              <span>${param_province.value+city.value}</span>
            </div>
            <div class="show-address">
              <span>${param_address}</span>
              <a><img src="./images/edit.png" /></a>
            </div>
            <div class="show-info">
              <span>${param_name}</span>
              <span>${param_phone}</span>
            </div>
          </li>
    `;
    if (param_address && param_name && param_phone) {
      addresslist.style.display = "block";
      user.style.display = "none";
      address.style.display = "none";
      addresslist.innerHTML = template + addresslist.innerHTML;
    } else { // 显示弹框
      warning.style.display = "block";
    }
  }
  
  // 切换新增地址和地址管理的显隐
  function back() {
    if (document.getElementById("main_title").innerHTML == "地址管理") {
      document.getElementById("main_title").innerHTML = "新增地址";
      document.querySelector(".address-list").style.display = "none";
      document.querySelector(".address").style.display = "block";
      document.querySelector(".user-info").style.display = "block";
    }
  }
  // 页面加载后的初始化操作
  function init() {
    // 初始化省份下拉列表内容
    provinceInit();
    // 为标签绑定单击事件
    addClick();
  }
  
  window.onload = function () {
    // 初始化
    init();
  };
  