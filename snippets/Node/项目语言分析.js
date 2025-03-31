const fs = require("fs");
const path = require("path");

function scanFiles(directoryPath, fileExtensionArr) {
  if (!fs.existsSync(directoryPath)) return `目录路径 ${directoryPath} 不存在`;
  if (!Array.isArray(fileExtensionArr)) return "fileExtensionArr 必须是数组类型";

  const stats = {};
  fileExtensionArr.forEach((ext) => (stats[ext] = 0));
  stats["other"] = 0;

  function scanDir(dir) {
    const fileStat = fs.statSync(dir);
    if (fileStat.isDirectory()) {
      fs.readdirSync(dir).forEach((child) => scanDir(path.resolve(dir, child)));
    } else {
      const ext = path.extname(dir).slice(1);
      if (fileExtensionArr.includes(ext)) {
        stats[ext] += fileStat.size;
      } else {
        stats["other"] += fileStat.size;
      }
    }
  }

  scanDir(directoryPath);

  const totalSize = Object.values(stats).reduce((sum, size) => sum + size, 0);

  return Object.entries(stats).map(([filename, size]) => ({
    filename,
    percentage: totalSize ? ((size * 100) / totalSize).toFixed(2) : "0.00",
  }));
}
