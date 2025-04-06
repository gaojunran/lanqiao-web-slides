# 手写实现Promise

1. new Promise
2. then
3. catch
4. finally
5. resolve
6. reject
7. all
8. race
9. allSettled
10. any

## 实现核心功能

### 定义类

1. 定义状态
2. 定义结果
3. 定义resolve/reject方法，更新状态和结果（不可逆）
4. 在构造函数中立刻执行回调函数

```js
import { consola } from 'consola'

const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
  state = PENDING
  result = undefined

  constructor(executor) {
    const resolve = (res) => {
      // pending -> fulfilled
      // reason
      if (this.state === PENDING) {
        this.state = FULFILLED
        this.result = res
      }
    }
    const reject = (res) => {
      // pending -> rejected
      // reason
      if (this.state === PENDING) {
        this.state = REJECTED
        this.result = res
      }
    }

    executor(resolve, reject)
  }
}

const p = new MyPromise((resolve, reject) => {
  resolve(1) // pending -> fulfilled
  reject(2)  // pending -> rejected
})
consola.info(p)  //  ℹ MyPromise { state: 'fulfilled', result: 1 }

```

### then 方法

基本功能：
- 返回一个Promise
- 如果参数不是函数：
  - 如果`onFulfilled`不是函数 -> 替换为一个恒等函数`(x) => x`
  - 如果`onRejected`不是函数 -> 替换为一个抛出静函数`(x) => { throw x }`
- then方法应该支持异步任务、多次调用（并行）、链式调用（串行）

用户调用then时：
- pending：将回调函数缓存起来，等待状态改变后执行
- fulfilled或rejected：立即执行回调函数

```js
import { consola } from 'consola'

const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

function runAsyncTask(cb) {
  setTimeout(cb, 0)
}

class MyPromise {
  state = PENDING
  result = undefined
  #handlers = []  // { onFulfilled, onRejected }

  constructor(executor) {
    const resolve = (res) => {
      // pending -> fulfilled
      // reason
      if (this.state === PENDING) {
        this.state = FULFILLED
        this.result = res
        this.#handlers.forEach(({ onFulfilled }) => {
          onFulfilled(this.result)
        })
      }
    }
    const reject = (res) => {
      // pending -> rejected
      // reason
      if (this.state === PENDING) {
        this.state = REJECTED
        this.result = res
        this.#handlers.forEach(({ onRejected }) => {
          onRejected(this.result)
        })
      }
    }

    try {
      executor(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (x) => x
    onRejected = typeof onRejected === 'function' ? onRejected : (x) => { throw x }

    const p2 = new MyPromise((resolve, reject) => {
      const handleCallback = (callback) => {
        runAsyncTask(() => {
          try {
            const result = callback(this.result)
            if (result === p2) {
              throw new TypeError('Chaining cycle detected for promise')
            }
            if (result instanceof MyPromise) {
              result.then(resolve, reject)
            } else {
              resolve(result)
            }
          } catch (e) {
            reject(e)
          }
        })
      }
    
      if (this.state === FULFILLED) {
        handleCallback(onFulfilled)
      } else if (this.state === REJECTED) {
        handleCallback(onRejected)
      } else if (this.state === PENDING) {
        this.#handlers.push({
          onFulfilled: () => handleCallback(onFulfilled),
          onRejected: () => handleCallback(onRejected)
        })
      }
      return p2;
    });
  }
  
}
  
export default MyPromise
```

### 实例方法：catch、finally

`catch`：注册一个在期约被拒绝的时候调用的函数，是`Promise.then(undefined, onRejected)`的简写形式.

`finally`：注册一个在期约状态改变后调用的函数，是`Promise.then(onFinally, onFinally)`的简写形式.

```js
catch(onRejected) {
  return this.then(undefined, onRejected)
}

finally(onFinally) {
  return this.then(onFinally, onFinally)
}
```

## 实现静态方法

### resolve

- 传入Promise：直接返回
- 传入值：转成fulfilled状态的Promise

```js
static resolve(value) {
    if (value instanceof MyPromise) {
      return value;
    } else {
      return new MyPromise((resolve, _) => resolve(value))
    }
}
```

### reject

- 不论传入的参数如何，返回一个rejected状态的Promise

```js
static reject(value) {
    return new MyPromise((_, reject) => reject(value))
}
```


### race

返回的Promise会随着第一个Promise的敲定（包括兑现和拒绝）而敲定。

```js
static race(promises) {
    return new MyPromise((resolve, reject) => {
      if (!Array.isArray(promises)) {
        return reject(new TypeError('Argument is not iterable'))
      }
      promises.forEach(p => {
        MyPromise.resolve(p).then(resolve, reject)
      })
    })
}
```

### all

当所有输入的Promise都被兑现时，返回一个包含所有兑现值的数组。如果输入的任何Promise被拒绝，则返回的Promise将被拒绝并带有第一个被拒绝的原因。

```js
static all(promises) {
    return new MyPromise((resolve, reject) => {
      if (!Array.isArray(promises)) {
        return reject(new TypeError('Argument is not iterable'))
      }
      if (promises.length === 0) {
        return resolve([])
      }
      promises.reduce((acc, cur, i) => {
        MyPromise.resolve(cur).then(res => {
          acc[i] = res
          if (Object.keys(acc).length === promises.length) {
            resolve(acc)
          }
          return acc
        }, err => {
          reject(err)
        })
      }, [])
    })
}
```

### allSettled

当所有输入的Promise都已经敲定时，返回的Promise将被兑现，并带有描述每个Promise结果的对象数组。

```js
static allSettled(promises) {
    return new MyPromise((resolve, reject) => {
      if (!Array.isArray(promises)) {
        return reject(new TypeError('Argument is not iterable'))
      }
      if (promises.length === 0) {
        return resolve([])
      }
      promises.reduce((acc, cur, i) => {
        MyPromise.resolve(cur).then(res => {
          acc[i] = { status: FULFILLED, value: res }
          if (Object.keys(acc).length === promises.length) {
            resolve(acc)
          }
          return acc
        }, err => {
          acc[i] = { status: REJECTED, reason: err }
          if (Object.keys(acc).length === promises.length) {
            resolve(acc)
          }
          return acc
        })
      }, [])
    })
  }
```

### any

当输入的任何一个Promise被兑现时，返回的Promise将被兑现，并带有第一个兑现值。如果所有Promise都被拒绝，则返回的Promise将被拒绝，并带有所有拒绝原因的数组。

```js
static any(promises) {
    return new MyPromise((resolve, reject) => {
      if (!Array.isArray(promises)) {
        return reject(new TypeError('Argument is not iterable'))
      }
      if (promises.length === 0) {
        return reject(new AggregateError('All promises were rejected'))
      }
      promises.reduce((acc, cur, i) => {
        MyPromise.resolve(cur).then(resolve, err => {
          acc[i] = err
          if (Object.keys(acc).length === promises.length) {
            reject(new AggregateError(acc))
          }
          return acc
        })
      }, [])
    })
  }
```
