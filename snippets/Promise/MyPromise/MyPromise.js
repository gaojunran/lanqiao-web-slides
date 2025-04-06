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

  catch(onRejected) {
    return this.then(undefined, onRejected)
  }

  finally(onFinally) {
    return this.then(onFinally, onFinally)
  }

  static resolve(value) {
    if (value instanceof MyPromise) {
      return value;
    } else {
      return new MyPromise((resolve, _) => resolve(value))
    }
  }

  static reject(value) {
    return new MyPromise((_, reject) => reject(value))
  }

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
}

export default MyPromise
