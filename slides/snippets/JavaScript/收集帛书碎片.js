/**
 * 2023省赛 签到题
 * 将一个二维数组展平，并去重后返回数组结果。
 */
function collectPuzzle1(...puzzles) {
    // TODO:在这里写入具体的实现逻辑
    // 对所有的拼图进行收集，获取不同拼图类型的结果，并返回
    return [...new Set(puzzles.flat())]
    // return Array.from(new Set(puzzles.flat()));
}

function collectPuzzle2(...puzzles) {
    // TODO:在这里写入具体的实现逻辑
    // 对所有的拼图进行收集，获取不同拼图类型的结果，并返回
    return puzzles.flat().filter((item, index) => arr.indexOf(item) === index)
}

function collectPuzzle3(...puzzles) {
    // TODO:在这里写入具体的实现逻辑
    // 对所有的拼图进行收集，获取不同拼图类型的结果，并返回
    return puzzles.flat().reduce((acc, item) => {
        // return acc.includes(item) ? acc : [...acc, item];
        if (!acc.includes(item)) {
            acc.push(item);
        }
        // acc.includes(item) || acc.push(item);
        return acc;
      }, []);
}

