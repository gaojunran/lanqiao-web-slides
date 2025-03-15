/**
 * 中等难度。
 * 
 * https://www.lanqiao.cn/problems/19905/learning/?contest_id=248.
 */


// Solution1
document.querySelector('header').onchange = ({ target }) =>
    filterTrigger.forEach((trigger, idx) => {
      filters[idx].style.display = trigger.checked ? 'block' : 'none'
      trigger == target && updateZIndex(filters[idx])
    });
  
  // Solution2
  filterTrigger.forEach(trigger => {
    // TODO：待补充代码
    trigger.addEventListener('change', ({ target }) => {
      console.log(target);
      const filterName = target.dataset.filterName;
      // const filter = document.querySelector(`.Filter[data-filter-name="${filterName}"]`)
      const filter = Array.from(filters).find(item => item.dataset.filterName === filterName)
      if (target.checked) {
        filter.style.display = "block"
        updateZIndex(filter) 
      } else {
        filter.style.display = "none" 
      }
    })
  });