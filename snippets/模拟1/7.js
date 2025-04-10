const handleSubmit = () => {
  // TODO 目标1  待补充代码
 emit("submit-add")
};

const handleCancel = () => {
  // TODO 目标1 待补充代码
 emit("close-add")
};


/**
         * 处理保存事件
         */
const handleSave = () => {
  if (checkBlank()) return;
  if (addType.value === 0) {
      // 新增员工
      let worker_one = { checked: false, name: form.name, phone: form.phone }
       worker.value.push(worker_one)
  } else {
       // TODO：待补代码目标 2
       worker.value[editIndex.value] = { ...worker.value[editIndex], ...form }
  }
  showAddPop.value = false;
}


/**
         * 批量删除
         */
        const deleteItems = () => {
          // TODO：待补充代码 目标 3 
         worker.value = worker.value.filter(it => !it.checked)
      }

      /**
       * 删除单个员工 
       * @param item 员工信息
       */
      const deleteItem = item => {
          // TODO：待补充代码 目标 3 
          worker.value = worker.value.filter(it => it != item)
      }
