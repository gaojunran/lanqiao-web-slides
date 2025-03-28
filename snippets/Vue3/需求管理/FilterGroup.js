// TODO：待补充代码
const {watchEffect} = Vue;
const FilterGroup = {
  emit: ["change"],
  setup(props, { emit }) {
    const [demand, bug, task] = [ref(true), ref(true), ref(true)]
    watchEffect(() => {
      emit( "change", 
            Object.entries({demand: demand.value, bug: bug.value, task: task.value})
                .filter(([k, v]) => v)
                .map(([k, v]) => k))
    })
    return { demand, bug, task }
  },
  template: `
    <div class="filter-group">
      过滤：
      <label>
        <input type="checkbox" v-model="demand" > 需求
      </label>
      <label>
        <input type="checkbox" v-model="bug" > 缺陷
      </label>
      <label>
        <input type="checkbox" v-model="task" > 任务
      </label>
    </div>
  `,
};
