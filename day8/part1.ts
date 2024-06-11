import * as fs from 'fs'
const day = 8
console.log('day ',
day)

// export type Row = Point[]
// export type Grid = Point[]
export interface Point { 
  x: number,
  y: number,
  z: number,
}
const file = process.argv[2] === 'sample' ? 'sample' : 'input'
const puzzleInput: Point[] = fs.readFileSync(`./day${day}/${file}.txt`, 'utf8').split('\n').flatMap((row, rowIndex) => row.split('').map((n, columnIndex) => {
  return {
    x: columnIndex,
    y: rowIndex,
    z: Number(n)
  }
}))
// console.log(JSON.stringify(puzzleInput, null, 2))

const countVisibleTrees = (trees: Point[], log?: boolean) => {
  let count = 0
  trees.forEach((tree, index) => {
    log && console.log(`tree: ${JSON.stringify(tree)}`)
    if (tree.x === 0 || tree.y === 0) {
      count += 1
    } else {
      const leftCandidates = trees.filter(t => t.y === tree.y && t.x < tree.x)
      const rightCandidates = trees.filter(t => t.y === tree.y && t.x > tree.x)
      const topCandidates = trees.filter(t => t.y < tree.y && t.x === tree.x)
      const bottomCandidates = trees.filter(t => t.y > tree.y && t.x === tree.x)
      const visFromLeft = isTreeVisibile(leftCandidates, tree.z)
      const visFromRight = isTreeVisibile(rightCandidates, tree.z)
      const visFromTop = isTreeVisibile(topCandidates, tree.z)
      const visFromBottom = isTreeVisibile(bottomCandidates, tree.z)

      if (visFromLeft || visFromRight || visFromBottom || visFromTop) { 
        count += 1
      }
      log && console.log(`count: ${count}`)
    }
  })
}

const isTreeVisibile = (candidates: Point[], treeHeight: number) => {
  return candidates.reduce((isVis, curr) => {
    return isVis && curr.z < treeHeight
  }, true)
}

countVisibleTrees(puzzleInput)

/* 
30373
25512
65332
33549
35390
*/