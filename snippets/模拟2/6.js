function generateStaticFilesMap(dir) {
  // TODO：待补充代码  
  const stack = [{
   filePath: dir
  }]
  let result = []
  while (stack.length > 0) {
   const item = stack.pop()
   fs.readdirSync(item.filePath).forEach((sub) => {
     const subPath = path.join(item.filePath, sub)
     // console.log(subPath);
     const isDir = fs.statSync(subPath).isDirectory()
     if (isDir) {
       stack.push({ 
         filePath: subPath
       })
     } else {
       result.push({ 
         filePath: subPath,
         contentType: getContentType(subPath)
       })
     }
   })
  }
  result = Object.fromEntries(result.map((res) => ["/" + path.relative(dir, res.filePath), res]))
  console.log(result);
  return result
}
