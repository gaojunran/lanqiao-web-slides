const fs = require('fs');
const path = require('path');

function generateTree(dirPath) {
  const items = fs.readdirSync(dirPath); // 获取目录下的所有文件和文件夹
  
  return items.map(item => {
    const fullPath = path.join(dirPath, item); // 重要
    const isDirectory = fs.statSync(fullPath).isDirectory();
    
    if (isDirectory) {
      return { name: item, children: generateTree(fullPath) };
    } else {
      return { name: item };
    }
  });
}
