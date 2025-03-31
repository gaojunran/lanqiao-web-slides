const stack = [directoryPath]; // 用栈实现 DFS
while (stack.length > 0) {
  const currentPath = stack.pop(); // 取出最后添加的元素（后进先出）

  const fileStat = fs.statSync(currentPath);
  if (fileStat.isDirectory()) {
    // 先把子目录全部加入栈
    fs.readdirSync(currentPath).forEach((child) =>
      stack.push(path.resolve(currentPath, child))
    );
  } else {
    // 处理文件逻辑
  }
}
