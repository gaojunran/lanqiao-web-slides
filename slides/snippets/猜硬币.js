/**
 * 2022年国赛。中等难度。
 * 
 */

/**
 * @param {*} input_values input 框中输入的值
 * @returns Array  将输入的值中 1-9 组成一个数组
 */

// 将输入的值中 1-9 组成一个数组
function findNum(input_values) {
    // TODO：待补充代码
    return [...input_values].map(s => +s).filter(i => 1 <= i && i <= 9)
}

function findNum2(input_values) {
    // TODO：待补充代码
    return input_values.replace(/\D/g, '').split('').map(Number)
}
  
  // 将 1-9 中三个不重复的随机数放入数组中，并返回这个数组
  let randomCoin = () => {
    return new Array(9).fill(0)  // 重要！否则会创建稀疏数组
              .map((_, i) => i + 1)  // or: Array.from({ length: 9 }, (_, i) => i + 1)  // 类数组对象
              .map(it => [it, Math.random()])
              .sort((a, b) => a[1] - b[1])
              .slice(0, 3)
              .map(it => it[0])
  };


  // 可以借鉴的序列生成器
  const range = (start, stop, step) =>
    Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

  let randomCoin2 = () => {
    let set = new Set();
    while (set.size < 3) {
      set.add(Math.floor(Math.random() * 9) + 1)  // 0.x * 9 => 0 ~ 8.999 向下舍入 => 0 ~ 8 => +1
    //   set.add(Math.ceil(Math.random() * 9))   // 0.x * 9 => 0 ~ 8.999 向上舍入 => 1 ~ 9
    }
    return [...set]
  }
  
  // 请勿删除和修改下面代码
  try {
    module.exports = { randomCoin, findNum };
  } catch (e) {}
  