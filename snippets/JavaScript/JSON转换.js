/*
 * @param {*}  左侧输入框输入的值转化成的 js 数据
 * @return {*} 根据传入的数据生成对应的 js 格式数据
 */

let generateBetween = (start, end) => {
  return Math.floor(Math.random() * (end - start + 1)) + start;
}

/**
 * 
 * @param {Object} obj 
 */
let mainReplace = (obj) => {
  const bool = /\{\{bool\(\)\}\}/
  const integer = /\{\{integer\((\d*)\,\s*(\d*)\)\}\}/
  result = {}
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "string" && integer.test(value)) {
      result[key] = +value.replace(integer, (_match, start, end) => {
        // start = 1, end = 3
        return generateBetween(+start, +end);
      })
    } else if (typeof value === "string" && bool.test(value)) {
      result[key] = Math.random() > 0.5
    } else {
      result[key] = value;
    }
  }
  return result;
}

let generateData = (data) => {
  // TODO：待补充代码
  const repeat1 = /\{\{repeat\((\d*)\)\}\}/
  const repeat2 = /\{\{repeat\((\d*)\,\s*(\d*)\)\}\}/
 
  console.log(data);
  if (repeat1.test(data[0])) {
    const result = []
    const main = mainReplace(data[1])
    const times = +(data[0].match(repeat1)[1])
    for (let i = 0; i < times; i++) {
      result.push(main)
    }
    return result;
  } else if (repeat2.test(data[0])) {
    const result = []
    const main = mainReplace(data[1])
    const [start, end] = [+(data[0].match(repeat2)[1]), +(data[0].match(repeat2)[2])]
    const times = generateBetween(start, end);
    for (let i = 0; i < times; i++) {
      result.push(main)
    }
    return result;
  } else {
    return mainReplace(data[0])
  }
};

module.exports = { generateData };
