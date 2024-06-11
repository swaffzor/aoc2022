import * as fs from 'fs'
const day = 8
console.log('day ',
day)

export type Row = number[]
export type Grid = Row[]
const file = process.argv[2] === 'sample' ? 'sample' : 'input'
const puzzleInput: Grid = fs.readFileSync(`./day${day}/${file}.txt`, 'utf8').split('\n').map((row, rowIndex) => row.split('').map((n, columnIndex) => Number(n)))

const countVisibleTreesToLeft = (row: Row, theIndex: number, z: number) => {
  let count = 0
  let index = theIndex - 1
  let stop = false
  while (index >= 0 && row[index] <= z && !stop) {
    stop = row[index] >= z
    count += 1
    index -= 1
  }
  // console.log(count)
  return count
}

const countVisibleTreesToRight = (row: Row, theIndex: number, z: number) => {
  let count = 0
  let index = theIndex + 1
  let stop = false
  while (index <= row.length-1 && !stop) {
    stop = row[index] >= z
    count += 1
    index += 1
  }
  // console.log(count)
  return count
}

const countVisibleTreesToTop = (grid: Grid, x: number, y: number, z: number) => {
  let count = 0
  let index = y - 1
  let stop = false
  while (index >= 0 && !stop) {
    const spot = grid[index][x]
    stop =  spot >= z
    count += 1
    index -= 1
  }
  // console.log(count)
  return count
}

const countVisibleTreesToBottom = (grid: Grid, x: number, y: number, z: number) => {
  let count = 0
  let index = y + 1
  let stop = false
  while (index <= grid.length-1 && !stop) {
    const spot = grid[index][x]
    stop =  spot >= z
    count += 1
    index += 1
  }
  // console.log(count)
  return count
}

const doTheWork = (trees: Grid, log?: boolean) => {
  const score = [...trees].map(row => row.map(n => 0))
  trees.forEach((row, rowIndex) => {
    row.forEach((tree, colIndex) => {
      log && console.log(`${colIndex},${rowIndex}: ${tree}`)

      const temp = countVisibleTreesToLeft(row, colIndex, tree) * countVisibleTreesToRight(row, colIndex, tree)
        * countVisibleTreesToTop(trees, colIndex, rowIndex, tree) * countVisibleTreesToBottom(trees, colIndex, rowIndex, tree)
      score[rowIndex][colIndex] = temp
    })
  })
  return score.reduce((prev, curr) => Math.max(prev, ...curr), -Infinity)
}

const testData = [
  [3,0,3,7,3],
  [2,5,5,1,2],
  [6,5,3,3,2],
  [3,3,5,4,9],
  [3,5,3,9,0],
]
const leftTests = [
  countVisibleTreesToLeft(testData[1], 2, testData[1][2]) === 1 ? 'pass' : 'fail',
  countVisibleTreesToLeft(testData[3], 2, testData[3][2]) === 2 ? 'pass' : 'fail',
]
console.log('left: ', leftTests.every(s => s === 'pass') ? 'PASS' : 'FAIL')

const rightTests = [
  countVisibleTreesToRight(testData[1], 2, testData[1][2]) === 2 ? 'pass' : 'fail',
  countVisibleTreesToRight(testData[3], 2, testData[3][2]) === 2 ? 'pass' : 'fail',
]
console.log('right: ', rightTests.every(s => s === 'pass') ? 'PASS' : 'FAIL')

const topTests = [
  countVisibleTreesToTop(testData, 2, 1, testData[1][2]) === 1 ? 'pass' : 'fail',
  countVisibleTreesToTop(testData, 2, 3, testData[3][2]) === 2 ? 'pass' : 'fail',
]
console.log('top: ', topTests.every(s => s === 'pass') ? 'PASS' : 'FAIL')

const bottomTests = [
  countVisibleTreesToBottom(testData, 2, 1, testData[1][2]) === 2 ? 'pass' : 'fail',
  countVisibleTreesToBottom(testData, 2, 3, testData[3][2]) === 1 ? 'pass' : 'fail',
]
console.log('bottom: ', bottomTests.every(s => s === 'pass') ? 'PASS' : 'FAIL')

console.log(doTheWork(puzzleInput))

/* 
30373
25512
65332
33549
35390
*/

