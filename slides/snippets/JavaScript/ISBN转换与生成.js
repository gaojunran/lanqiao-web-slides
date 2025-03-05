/**
 * 2023年省赛。中等难度。
 */

// 将用户输入的带分隔符的 isbn 字符串转换只有纯数字和大写 X 字母的字符串
// 入参 str 为转换为包含任意字符的字符串
function getNumbers(str) {
    // TODO: 待补充代码
    return str.replace(/[^\dX]/g, "")
}
  
// 验证当前 ISBN10 字符串是否有效
// 入参 str 为待判断的只有纯数字和大写 X 字母的字符串
function validISBN10(str) {

    if (!/^\d{9}[\dX]$/.test(str)) { // 检验10位和每位格式
        return false;
    }

    // if (!/^(\d{9})([\d|X])$/.exec(str)) { // 不建议用match
    //     return false;
    // }

    // if (str.search(/^\d{9}[\dX]$/) === -1) {
    //     return false;
    // }

    // If you need to know if a string matches a regular expression RegExp, use RegExp.prototype.test().
    // 如果您需要知道一个字符串是否与正则表达式匹配，请使用 RegExp 。
    // If you only want the first match found, you might want to use RegExp.prototype.exec() instead.
    // 如果您只想找到的第一个匹配项，您可能想使用 RegExp.prototype.exec() 代替。
    // If you want to obtain capture groups and the global flag is set, you need to use RegExp.prototype.exec() or String.prototype.matchAll() instead.
    // 如果您想获取捕获组并且全局标志被设置，您需要使用 RegExp.prototype.exec() 或 String.prototype.matchAll() 代替。

    // 字符串转数组：str.split(""), Array.from(str), [...str]
    let sum = str.slice(0, 9).split("").reduce((acc, cur, idx) => {
        return acc + (idx + 1) * (+cur)
    }, 0)
    let check = sum % 11 === 10 ? "X" : String(sum % 11);
    return check == str[9]
}

  
  // 验证当前 ISBN10 字符串是否有效
  // 入参 str 为待判断的只有纯数字和大写 X 字母的字符串

function validISBN102(str) {
    const match = /^(\d{9})([\d|X])$/.exec(str);
    if (!match) return false;
    // 用加号拼成JavaScript表达式再eval；match[1]是第一个匹配结果
    let evaled = [...match[1]].map((cur, idx) => `${idx + 1}*${cur}`)
                              .join("+");
    const checkNum = eval(evaled) % 11;
    return match[2] === (checkNum === 10 ? "X" : checkNum.toString())
}

  
  // 将用户输入的 ISBN-10 字符串转化为 ISBN-13 字符串
  // 入参 isbn 为有效的 ISBN-10 字符串
  function ISBN10To13(isbn) {
    let temp = "978" + isbn.slice(0, 9);
    // 注意：奇数位是偶数索引，偶数位是奇数索引，注意数据类型的转换。
    let sum = [...temp].filter((_, idx) => idx % 2 != 0).reduce((acc, cur) => acc + 3 * +cur, 0)
            + [...temp].filter((_, idx) => idx % 2 == 0).reduce((acc, cur) => acc + +cur, 0)
    let check = `${10 - sum % 10}`
    return temp + check
  }
  
  // 测试用例
  console.log(getNumbers("7-5600-3879-4")); // 7560038794
  console.log(getNumbers("7 5600 3879 4")); // 7560038794
  
  console.log(validISBN10("7560038794")); // true
  console.log(validISBN10("7560038793")); // false
  console.log(validISBN10("756003879")); // false
  console.log(validISBN10("756003879004")); // false
  
  console.log(ISBN10To13("7560038794")); // 9787560038797
  console.log(ISBN10To13("3598215088")); // 9783598215087
  