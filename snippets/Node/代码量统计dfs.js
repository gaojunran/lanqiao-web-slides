function structDFS(path, names, value) {
  let stack = [{ path, names: [...names] }];  // 使用栈替代队列

  while (stack.length > 0) {
      let { path, names } = stack.pop();  // 使用 pop() 来模拟 DFS

      let match = path.find(node => node.name === names[0]);

      if (match) {
          if (names.length === 1) {
              match.value = value; // 叶子节点更新 value
          } else {
              stack.push({ path: match.children, names: names.slice(1) }); // 继续遍历
          }
      } else {
          let newNode = {
              name: names[0],
              children: []
          };
          path.push(newNode);

          if (names.length === 1) {
              newNode.value = value; // 叶子节点更新 value
          } else {
              stack.push({ path: newNode.children, names: names.slice(1) }); // 继续遍历
          }
      }
  }
}

let tree2 = [];  // 初始化空的树

structDFS(tree2, ["A", "B", "C"], 10);
structDFS(tree2, ["A", "B", "D"], 20);
structDFS(tree2, ["A", "E"], 30);
structDFS(tree2, ["X", "Y", "Z"], 40);

console.log(JSON.stringify(tree2, null, 2));
