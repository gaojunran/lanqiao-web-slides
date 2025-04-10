/**
 * 组合多个中间件函数，形成一个新的中间件函数。
 * @param {...Function} middlewares - 要组合的中间件函数。
 * @return {Function} - 组合后的中间件函数。
 */
function compose(...middlewares) {  // 形参有函数
  return (init, callback) => {  // 形参有函数
    let curr = init;  

    function next(value) {
      curr = value;    
    }

    middlewares.forEach(fn => {
      fn(curr, next);  // 调用传参数
    });

    callback(curr);  // 调用传参数
  }
}

function add(str, next) {  // 形参有函数
  str += '2'
  next(str);  // 调用传参数
}
function add2(str, next) {
  str += '3'
  next(str);
}
const processdemo = compose(add, add2); 
processdemo("1", (finalValue) => {  // 实参有函数
    console.log(finalValue) // 123   // 直接拿参数
});
