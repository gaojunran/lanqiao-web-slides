function generateTreeBFS(rootDir) {
  const queue = [{ dirPath: rootDir, node: { name: path.basename(rootDir), children: [] } }];
  const rootNode = queue[0].node;

  while (queue.length > 0) {
    const { dirPath, node } = queue.shift();
    const items = fs.readdirSync(dirPath);

    for (const item of items) {
      const fullPath = path.join(dirPath, item);
      const isDirectory = fs.statSync(fullPath).isDirectory();
      const newNode = { name: item, children: isDirectory ? [] : undefined };

      if (isDirectory) {
        queue.push({ dirPath: fullPath, node: newNode });
      }

      node.children.push(newNode);
    }
  }

  return rootNode;
}

// 示例
console.log(JSON.stringify(generateTreeBFS('./testDir'), null, 2));
