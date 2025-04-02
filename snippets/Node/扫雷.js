// 扫雷算法
function mineSweeperAlgorithms(arr, { row, col }) {
  const queue = [{ row, col }];
  while (queue.length > 0) {
      const { row, col } = queue.shift()
      if (flagData[row][col]) {
          continue;
      }
      flagData[row][col] = true;
      const { positionWithoutMineArr, count } = getAroundAndCount(arr, { row, col });
      if (count === 0) {
          queue.push(...positionWithoutMineArr)
      }
  }
}
