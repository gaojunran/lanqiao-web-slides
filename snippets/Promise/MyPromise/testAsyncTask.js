import MyPromise from "./MyPromise";

console.log("start");

const p = new MyPromise((resolve, reject) => {
  reject("error");
})

p.then(res => {
  console.log(res);
}, err => {
  console.log(err);
})

console.log("end");
