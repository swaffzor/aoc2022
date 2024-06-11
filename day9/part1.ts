import * as fs from 'fs'
const day = 9
console.log('day ', day)

interface Point {
  x: number,
  y: number
}
const file = process.argv[2] === 'sample' ? 'sample' : 'input'
const puzzleInput: string[] = fs.readFileSync(`./day${day}/${file}.txt`, 'utf8').split('\n')
const headLocation: Point = {x: 0, y:0}
const tailLocation: Point = {x: 0, y:0}
const tailPositions = new Set<string>()
tailPositions.add('x:0,y:0')
/* 
R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2
*/

const doTheWork = (input: string[]) => {
  input.forEach(instruction => {
    const [direction, steps] = instruction.split(' ')
    const numSteps = Number(steps)
    // console.log(direction, steps)

    for (let i = 0; i < numSteps; i++) {
      // move head
      switch (direction) {
        case 'U':
          headLocation.y += 1
          break;
        case 'D':
          headLocation.y -= 1
          break;
        case 'L':
          headLocation.x -= 1
          break;
        case 'R':
          headLocation.x += 1
          break;
        default:
          break;
      }
      // calculate distanace head to tail
      const xDiff = headLocation.x - tailLocation.x
      const yDiff = headLocation.y - tailLocation.y
      // if distance more than 1
      if (Math.abs(xDiff) > 1 || Math.abs(yDiff) > 1){
        // move tail
        tailLocation.x += xDiff === 0 ? 0 : xDiff > 0 ? 1 : -1
        tailLocation.y += yDiff === 0 ? 0 : yDiff > 0 ? 1 : -1
        tailPositions.add(`x:${tailLocation.x},y:${tailLocation.y}`)
        // console.log('tail positions: ', tailPositions)
      }
  
      // console.log('headLocation: ', headLocation)
      // console.log('tailLocation: ', tailLocation)
      // console.log()
    }
  })
}


// console.log(board)
doTheWork(puzzleInput)
console.log('tail positions: ', tailPositions.size)