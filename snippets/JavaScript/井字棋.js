
/**
 * 2024年国赛。中等难度。
 */
function checkMap() {
    const wins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    // 逻辑：所有胜利组合中存在一种组合，这种组合里的每格都是x或o
    const isWinner = (player) => wins.some(combination =>
        combination.every(index => map.flat()[index] === player)
    );


    // 逻辑：依次判断每一行、每一列、两条对角线是否全为x或o，否则为false
    const isWinner2 = (player) => {
        if (map.some(row => row.every(cell => cell === player))) return true;
        if (map.some((_, i) => map.every(row => row[i] === player))) return true;
        if (map.every((_, i) => map[i][i] === player)) return true;
        if (map.every((_, i) => map[i][map.length - 1 - i] === player)) return true;
        return false;
    }

    if (isWinner('x')) return 'x';
    if (isWinner('o')) return 'o';
    if (map.flat().every(cell => cell !== null)) return true; // 平局
    return null;
}
