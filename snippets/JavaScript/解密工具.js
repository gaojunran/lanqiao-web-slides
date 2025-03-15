/**
 * https://www.lanqiao.cn/problems/19906/learning/?contest_id=248
 * @param {*} max 
 * @param {*} count 
 * @returns 
 */

function getPossiblePasswords(max, count) {
    // TODO: 待补充代码
    function boom(arr) {
        return Array.from({ length: max }, (_, i) => i + 1)
            .filter(n => arr.length === 0 ? true : n > arr[arr.length - 1])
            .map(n => [...arr, n]);
    }

    let arr = Array.from({ length: max }, (_, i) => i + 1);
    let times = 0;
    let result = boom([]);
    while (times < count - 1) {
        result = result.flatMap(boom);
        times++;
    }
    return result;
}
