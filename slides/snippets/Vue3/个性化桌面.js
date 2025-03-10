/**
 * https://www.lanqiao.cn/problems/19912/learning/?contest_id=248
 */


//注册pinia仓库
const { defineStore } = Pinia;
const { ref, computed } = Vue;
const { ElMessage } = ElementPlus;
const useFileStore = defineStore("file", () => {
  const fileList = ref(JSON.parse(localStorage.getItem("fileList")) || []);
  const bgcList = ref([
    {
      url: "./images/bgc1.jpg",
      key: 1,
    },
    {
      url: "./images/bgc2.jpg",
      key: 2,
    },
    {
      url: "./images/bgc3.jpg",
      key: 3,
    },
    {
      url: "./images/bgc4.jpg",
      key: 4,
    },
    {
      url: "./images/bgc5.jpg",
      key: 5,
    },
    {
      url: "./images/bgc6.jpg",
      key: 6,
    },
  ]);
  const currentUrl = ref(localStorage.getItem("bgcUrl") || "./images/bgc1.jpg");

  // 使用 computed 计算容器的样式
  const containerStyle = computed(() => ({
    backgroundImage: `url(${currentUrl.value})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }));

  const editorVisible = ref(false);
  const changeFile = ref({});
  const changeFileIndnx = ref(0);
  const changeFileText = ref("");
  const isSaveVisible = ref(false);

  // 编辑文件名
  const renameFile = (index) => {
    fileList.value[index].isEditing = true;
  };

  // 保存文件名
  const saveEdit = (item, index) => {
    const formattedFilename = (filename) =>
      filename
        .split(".")
        .map((part, i) => (i === 0 ? part.slice(0, 8) : part.slice(0, 3)))
        .join(".");
    fileList.value[index].name = formattedFilename(item.name);

    fileList.value[index].isEditing = false;
    localStorage.setItem("fileList", JSON.stringify(fileList.value));
  };

  //关闭文件的按钮事件
  const closeEditorBtn = () => {
    isSaveVisible.value = true;
  };

  /**
   *  打开文件
   * @param {*} file
   * @param {*} index
   */

  const openFile = (file, index) => {
    editorVisible.value = true;
    changeFile.value = file;
    changeFileIndnx.value = index;
    changeFileText.value = file.content;
  };

  /**
   * 保存文件按钮事件
   */
  const saveText = () => {
    changeFile.value.content = changeFileText.value;
    fileList.value[changeFileIndnx.value] = changeFile.value;
    localStorage.setItem("fileList", JSON.stringify(fileList.value));

    editorVisible.value = false;
    isSaveVisible.value = false;

    ElMessage({
      message: "Save Successfully!",
      type: "success",
    });
  };

  // 不保存文件的按钮事件
  const notSaveText = () => {
    editorVisible.value = false;
    isSaveVisible.value = false;
    ElMessage({
      message: "Not Save!",
      type: "warning",
    });
  };


  /**
   * 切换背景图
   * @param {*} url
   */
  const changeBgc = (url) => {
    // TODO1 :待补充代码
    currentUrl.value = url;
    localStorage.setItem("bgcUrl", url);
    // 提示：window.addEventListener('storage', ...) 可以监听本地存储的值变化
  };

  /**
   * 生成随机的3个字符的字符串
   * @param {*} length
   * @returns string
   */
  function generateRandomString(length = 3) {
    // TODO2 : 待补充代码
    // 生成a-z的数组
    let mapping = Array.from({ length: 26 }, 
      (_, i) => String.fromCharCode("a".charCodeAt(0) + i));
    // 生成0-25的整数数组
    return Array.from({ length }, () => Math.floor(Math.random() * 26))
      // 映射到a-z
      .map(num => mapping[num])
      .join("")
  }

  /**
   * 新增默认文件
   */

  const addFile = () => {
    //TODO2 : 待补充代码
    let d = new Date();
    const p = (num) => String(num).padStart(2, "0")
    fileList.value.push({
      name: generateRandomString() + ".txt",
      content: "",
      createdDate: `${d.getFullYear()}/${p(d.getMonth() + 1)}/${p(d.getDate())}`
                + ` ${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`
    })
    console.log(fileList.value);
    localStorage.setItem("fileList", JSON.stringify(fileList.value));  // 从上面抄
  };


  /**
   * 文件大小排序
   */
  const sizeSort = () => {
    // TODO3 : 待补充代码
    fileList.value.sort((a, b) => a.content.length - b.content.length)
    // 提示：一定要观察一下他让你定义的函数在哪里被使用，比如这里就需要我们更新本地存储
    localStorage.fileList = JSON.stringify(fileList.value);
  };

  /**
   * 文件日期排序
   */

  const dateSort = () => {
    // TODO3 : 待补充代码
    fileList.value.sort((a, b) => 
            new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime())
    localStorage.fileList = JSON.stringify(fileList.value);
  };


  return {
    fileList,
    addFile,
    saveEdit,
    openFile,
    editorVisible,
    changeFile,
    isSaveVisible,
    changeFileText,
    closeEditorBtn,
    saveText,
    notSaveText,
    renameFile,
    bgcList,
    changeBgc,
    containerStyle,
    currentUrl,
    sizeSort,
    dateSort,
  };
});
