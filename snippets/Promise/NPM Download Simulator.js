/**
 * @param {iterable} iterable 可迭代对象
 * @return {promise}
 */
function myRace(iterable) {
  // TODO：待补充代码  
  if (iterable === null) {
   return Promise.reject(new TypeError('object null is not iterable (cannot read property Symbol(Symbol.iterator))'))
  } 
  if (typeof iterable[Symbol.iterator] !== 'function') {
   return Promise.reject(new TypeError(`${typeof iterable} ${iterable} is not iterable (cannot read property Symbol(Symbol.iterator))`))
  }
  return new Promise((resolve, reject) => {
   [...iterable].forEach(p => {
       Promise.resolve(p).then(resolve, reject)
     })
  })
}
