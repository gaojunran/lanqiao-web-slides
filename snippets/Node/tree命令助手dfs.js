const fs = require('fs');
const path = require('path');

function generateTreeDFSWithStack(rootDir) {
  const stack = [{ dirPath: rootDir, node: { name: path.basename(rootDir), children: [] } }];
  const rootNode = stack[0].node;

  while (stack.length > 0) {
    const { dirPath, node } = stack.pop();
    const items = fs.readdirSync(dirPath);

    for (const item of items) {
      const fullPath = path.join(dirPath, item);
      const isDirectory = fs.statSync(fullPath).isDirectory();
      const newNode = { name: item, children: isDirectory ? [] : undefined };

      if (isDirectory) {
        stack.push({ dirPath: fullPath, node: newNode });
      }

      node.children.push(newNode);
    }
  }

  return rootNode;
}

// 示例
console.log(JSON.stringify(generateTreeDFSWithStack('./testDir'), null, 2));
