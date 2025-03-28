// TODO：待补充代码
const Stats = {
  props: ["items"],
  setup(props) {
    const [demand, bug, task] 
        = ["demand", "bug", "task"].map(type => 
            computed(() => [
              props.items.filter(it => it.type == type).length,
              props.items.filter(it => it.type == type && it.completed).length
            ])
        )
    return {
      demand, bug, task
    }
  },
  template: `
    <div class="stats">
      <div>
        需求：{{demand[1]}}/{{demand[0]}}
      </div>
      <div>
        缺陷：{{bug[1]}}/{{bug[0]}}
      </div>
      <div>
        任务：{{task[1]}}/{{task[0]}}
      </div>
    </div>
  `,
};
