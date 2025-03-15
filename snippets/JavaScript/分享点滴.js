/**
 * 2024年省赛。中等难度。
 * 拼接URL的查询参数。
 * 
 * 拼接结果示例: https://example.com/page?key1=value1&key2=value2
 * url中可能本身就有查询参数，也可能没有。
 */

/**
 * @param {string} url  目标 URL
 * @param {object} params 参数对象
 * @return {string}  拼接后的 url
 */
function appendParamsToURL1(url, params) {
    // TODO: 待补充代码
     return Object.entries(params).reduce((acc, [k, v]) => {
       if (acc.includes("?")) {
         acc += "&" + k + "=" + v
       } else {
         acc += "?" + k + "=" + v
       }
       return acc;
    //    let sep = url.includes("?") ? "&" : "?"
    //    return url + sep + k + "=" + v
     }, url)
}


function appendParamsToURL2(url, params) {
    // TODO: 待补充代码
    return url 
                + (url.includes("?") ? "&" : "?") 
                + Object.entries(params)
                    .map(([k, v]) => `${k}=${v}`)
                    .join("&")
}