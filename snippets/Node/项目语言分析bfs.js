const queue = [directoryPath]; // 用队列实现 BFS
while (queue.length > 0) {
  const currentPath = queue.shift(); // 取出最早加入的目录（先进先出）

  const fileStat = fs.statSync(currentPath);
  if (fileStat.isDirectory()) {
    // 先把所有子目录加入队列
    fs.readdirSync(currentPath).forEach((child) =>
      queue.push(path.resolve(currentPath, child))
    );
  } else {
    // 处理文件逻辑
  }
}
