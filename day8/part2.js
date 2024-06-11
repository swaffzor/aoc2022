"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const day = 8;
console.log('day ', day);
const file = process.argv[2] === 'sample' ? 'sample' : 'input';
const puzzleInput = fs.readFileSync(`./day${day}/${file}.txt`, 'utf8').split('\n').map((row, rowIndex) => row.split('').map((n, columnIndex) => Number(n)));
const countVisibleTreesToLeft = (row, theIndex, z) => {
    let count = 0;
    let index = theIndex - 1;
    let stop = false;
    while (index >= 0 && row[index] <= z && !stop) {
        stop = row[index] >= z;
        count += 1;
        index -= 1;
    }
    // console.log(count)
    return count;
};
const countVisibleTreesToRight = (row, theIndex, z) => {
    let count = 0;
    let index = theIndex + 1;
    let stop = false;
    while (index <= row.length - 1 && !stop) {
        stop = row[index] >= z;
        count += 1;
        index += 1;
    }
    // console.log(count)
    return count;
};
const countVisibleTreesToTop = (grid, x, y, z) => {
    let count = 0;
    let index = y - 1;
    let stop = false;
    while (index >= 0 && !stop) {
        const spot = grid[index][x];
        stop = spot >= z;
        count += 1;
        index -= 1;
    }
    // console.log(count)
    return count;
};
const countVisibleTreesToBottom = (grid, x, y, z) => {
    let count = 0;
    let index = y + 1;
    let stop = false;
    while (index <= grid.length - 1 && !stop) {
        const spot = grid[index][x];
        stop = spot >= z;
        count += 1;
        index += 1;
    }
    // console.log(count)
    return count;
};
const doTheWork = (trees, log) => {
    const score = [...trees].map(row => row.map(n => 0));
    trees.forEach((row, rowIndex) => {
        row.forEach((tree, colIndex) => {
            log && console.log(`${colIndex},${rowIndex}: ${tree}`);
            const temp = countVisibleTreesToLeft(row, colIndex, tree) * countVisibleTreesToRight(row, colIndex, tree)
                * countVisibleTreesToTop(trees, colIndex, rowIndex, tree) * countVisibleTreesToBottom(trees, colIndex, rowIndex, tree);
            score[rowIndex][colIndex] = temp;
        });
    });
    return score.reduce((prev, curr) => Math.max(prev, ...curr), -Infinity);
};
const testData = [
    [3, 0, 3, 7, 3],
    [2, 5, 5, 1, 2],
    [6, 5, 3, 3, 2],
    [3, 3, 5, 4, 9],
    [3, 5, 3, 9, 0],
];
const leftTests = [
    countVisibleTreesToLeft(testData[1], 2, testData[1][2]) === 1 ? 'pass' : 'fail',
    countVisibleTreesToLeft(testData[3], 2, testData[3][2]) === 2 ? 'pass' : 'fail',
];
console.log('left: ', leftTests.every(s => s === 'pass') ? 'PASS' : 'FAIL');
const rightTests = [
    countVisibleTreesToRight(testData[1], 2, testData[1][2]) === 2 ? 'pass' : 'fail',
    countVisibleTreesToRight(testData[3], 2, testData[3][2]) === 2 ? 'pass' : 'fail',
];
console.log('right: ', rightTests.every(s => s === 'pass') ? 'PASS' : 'FAIL');
const topTests = [
    countVisibleTreesToTop(testData, 2, 1, testData[1][2]) === 1 ? 'pass' : 'fail',
    countVisibleTreesToTop(testData, 2, 3, testData[3][2]) === 2 ? 'pass' : 'fail',
];
console.log('top: ', topTests.every(s => s === 'pass') ? 'PASS' : 'FAIL');
const bottomTests = [
    countVisibleTreesToBottom(testData, 2, 1, testData[1][2]) === 2 ? 'pass' : 'fail',
    countVisibleTreesToBottom(testData, 2, 3, testData[3][2]) === 1 ? 'pass' : 'fail',
];
console.log('bottom: ', bottomTests.every(s => s === 'pass') ? 'PASS' : 'FAIL');
console.log(doTheWork(puzzleInput));
/*
30373
25512
65332
33549
35390
*/
//# sourceMappingURL=part2.js.map