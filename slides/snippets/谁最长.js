/**
 * 2022年省赛 中等难度。
 * 返回长度最大的数组集合。
 * 
 * 传入的参数可能：
 * 有一个最长数组、
 * 多个最长数组（都返回）、
 * 所有数组等长（返回空数组）、
 * 无参数（返回空数组）、
 * 传入的不是数组（返回空数组）、
 * 传入的部分不是数组（返回空数组）
 */

const getMaxArrays1 = (...arrays) => {
    // TODO：待补充代码
    if (!arrays.every(arr => Array.isArray(arr))) {  // or use instanceof
      return []
    }

    // if (arrays.some((a) => !Array.isArray(a))) return [];

    if (arrays.every(arr => arr.length === arrays[0].length)) {
      return []
    }  // 对于空数组压根不会执行这段

    return arrays.reduce((acc, item) => {
      if (acc.length == 0 || item.length > acc[0].length) {
        acc = [item]
      } else if (item.length == acc[0].length) {
        acc.push(item)
      }
      return acc
    }, []) // 空数组同样不会执行
};

const getMaxArrays2 = (...arrays) => {
    // TODO：待补充代码
    if (arrays.some((a) => !Array.isArray(a))) return [];
    const max = Math.max(...arrays.map((a) => a.length));
    if (arrays.every((a) => a.length === max)) return [];
    return arrays.filter((a) => a.length === max);
};

