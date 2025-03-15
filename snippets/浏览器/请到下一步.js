/**
 * 2024年省赛。
 */

/*TODO：请补充代码*/
var current_form, next_form, previous_form; // 表单域
const forms = document.querySelectorAll('fieldset')
const list = document.querySelectorAll('ul li')
let index = 0
// 点击下一页的按钮
$(".next").click(function () {
  current_form = $(this).parent();
  forms[index].style.display = 'none'
  forms[index].nextElementSibling.style.display = "block"  // 相对定位
  // forms[index + 1].style.display = 'block'  // 绝对定位
  list[index + 1].classList.add('active')  // 思考：会越界吗？
  index++;  // 比较好的实践是最后更新状态
});
// 点击返回按钮
$(".previous").click(function () {
  current_form = $(this).parent();
  forms[index].style.display = 'none'
  forms[index - 1].style.display = 'block'  // 思考：会越界吗？
  list[index].classList.remove('active')
  index--;
});
// 点击提交按钮
$(".submit").click(function () {
  alert("提交成功");
});