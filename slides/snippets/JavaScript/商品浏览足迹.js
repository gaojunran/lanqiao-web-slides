/**
 * 2024年省赛。这个题判题有问题。中高难度。
 */
window.onload = async ()=> {
    const MockUrl =`./js/data.json`;// 请求地址
    let data=[];// 存储请求后的数据
    // TODO：待补充代码，目标 1
    const res = await fetch(MockUrl)
    data = await res.json()
    // TODO：END
    // 请求完成后调用下面的代码
    const newData = getData(data);
    showData(newData);
  };
  
  /**
  * 将同一天浏览的相同商品去重并作为数组返回
  * @param {Array} defaultData json 文件中读取到的原始数据
  * @returns 去重后的数据，数据结构与 defaultData 相同
  */

  // 转成Map
  const removeDuplicates1 = defaultData => {
    return [...new Map(defaultData.map((it) => {
      let date = it.viewed_on.split("T")[0]
      return [it.id + date, it]
    }), []).values()]
  }

  // 转成Object
  const removeDuplicates2 = defaultData => {
    let date = it.viewed_on.split("T")[0]
    return Object.values(Object.fromEntries(
        defaultData.map(it => [it.id + date, it])
    ))
  }
  
  /**
  * 将去重后的数据根据字段 viewed_on（格式化为 YYYY-MM-DD） 降序排序
  * @param {*} defaultData 去重后的数据
  * @returns 根据字段 viewed_on（格式化为 YYYY-MM-DD） 降序排序
  */
  const sortByDate = defaultData => {
    defaultData.sort((a, b) => {
      return (a.viewed_on.split("T")[0] < b.viewed_on.split("T")[0]) ? 1 : -1
    //   return defaultData.sort((a, b) => b.viewed_on.localeCompare(a.viewed_on))
    })
    return defaultData
  }
  
  /**
  * 将去重排序后的所有商品数据，作为一个对象存储并返回，
  * 该对象的所有 `key` 为浏览商品的当天日期（即，字段 viewed_on 格式化为 YYYY-MM-DD），
  * `value` 为当天浏览的所有商品（以数组形式表现）。
  * @param {Array} defaultData 重后的所有商品数据
  * @returns 
  */
  const transformStructure = defaultData => {
    return defaultData.reduce((acc, cur) => {
      let date = cur.viewed_on.split("T")[0]
      if (date in acc) {
        acc[date].push(cur)
      } else {
        acc[date] = [cur]
      }
      return acc
    }, {})
    
  }

  const transformStructure2 = defaultData => {
    return Object.groupBy(defaultData, ({ viewed_on }) => {
      return viewed_on.split("T")[0]
    })
  }


  const getData = (defaultData) => {
    let newData = removeDuplicates(defaultData);
    let sortData = sortByDate(newData);
    let objData = transformStructure(sortData);
    return objData;
  };
  const showData = (data) => {
  let str = ``;
  for (let k in data) {
    str += `<h3>${k}</h3>`;
    data[k].forEach((goods) => {
      str += `<div class="container">
        <div class="image"></div>
        <div class="details">
          <h4>${goods.name}</h4>
          <p>${goods.description}</p>
          <p class="buy">
            <span class="price">¥${goods.price}</span>
            <img src="./images/cart.svg" alt="" srcset="">
          </p>
        </div>
      </div>`;
    });
  }
  document.querySelector("#goodsList").innerHTML = str;
  };
  