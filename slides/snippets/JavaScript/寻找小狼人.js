/**
 * 2022年省赛。签到题。
 */

Array.prototype.myarray = function (cb) {
    return this.reduce((acc, cur) => cb(cur) ? [...acc, cur] : acc, [])
};

Array.prototype.myarray = function (cb) {
    return this.reduce((acc, cur) => cb(cur) ? (acc.push(cur), acc) : acc, [])
};


