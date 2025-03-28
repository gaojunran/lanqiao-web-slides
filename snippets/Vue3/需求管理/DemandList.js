let DemandList = {
   // TODO：待补充代码 目标 1 
  props: ["items"],
  emits: ['update-child', 'update-parent', 'toggle-item'],
  setup(props, { emit }) {
    const toggleItem = (item) => {
      emit('toggle-item', item);
    };

    const updateChild = (parent) => {
      emit('update-child', parent);
    };

    const updateParent = (item) => {
      emit('update-parent', item);
    };

    return {
      toggleItem,
      updateChild,
      updateParent,
    };
  },
  template: `
    <ul>
    <!-- TODO：待修改代码，目标 1 此处的空数组需要修改正确数据 -->
      <li
        v-for="item in items"
        :key="item.id"
        :class="{ demand: item.type === 'demand', bug: item.type === 'bug', task: item.type === 'task' }"
      >
        <div :class="item.type">
          <div class="title">
            <div class="parent-title">
              <span
                v-show="item.children && item.children.length"
                @click="toggleItem(item)"
                class="arrow"
              >{{ item.expanded ? '▼' : '▶' }}</span>
              <input
                type="checkbox"
                v-model="item.completed"
                @change="updateParent(item)"
              />
              <span :class="{ completed: item.completed }">{{ item.title }}</span>
            </div>
            <span
              v-if="item.priority"
              :class="{
                'label-high': item.priority === 'High',
                'label-middle': item.priority === 'Middle',
                'label-low': item.priority === 'Low'
              }"
            >
              {{ item.priority }}
            </span>
            <span class="assignee">{{ item.assignee }}</span>
          </div>
        </div>
        <ul
          class="children"
          v-show="item.expanded"
          v-if="item.children && item.children.length"
        >
          <li v-for="child in item.children" :key="child.id" class="child">
            <div class="child-title">
              <input
                type="checkbox"
                v-model="child.completed"
                @change="updateChild(item)"
              />
              <span :class="{ completed: child.completed }">{{ child.title }}</span>
            </div>
            <span class="assignee">{{ child.assignee }}</span>
          </li>
        </ul>
      </li>
    </ul>
  `,
};
