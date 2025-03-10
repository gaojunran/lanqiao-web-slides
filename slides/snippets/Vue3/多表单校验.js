const validateName = (rule, value, callback) => {
    if (/[^\u4e00-\u9fa5]/g.test(value)) { // 检查非汉字要比检查为汉字要简单
    // if (!/^[\u4e00-\u9fa5]+$/.test(value)) { // 检查汉字
      callback(new Error("只能输入汉字"))
    } else if (value.trim() == "") {
      callback(new Error("请输入姓名"))
    } else {
      callback()
    }
  }

  // TODO：待补充代码
  const rules = reactive({
    name: {
      required: true,
      validator: validateName
    },
    sex: { required: true, message: '请选择性别' },
    age: { required: true, message: '请输入年龄' },
    isCompetition: { required: true, message: '请选择是否参加过编程比赛' },
    isEntrepreneurship: { required: true, message: '请选择是否有过创业经历' },
  })