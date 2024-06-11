import * as fs from 'fs'

const file = process.argv[2] === 'sample' ? 'sample' : 'input'
const inputArray: string[] = fs.readFileSync(`./day5/${file}.txt`, 'utf8')
.split("\n")

console.log('day 5')
/* 
[D]    
[N] [C]    
[Z] [M] [P]
1   2   3 
*/
const allCrates: string[] = []

const stacks: string[][] = [[],[],[],[],[],[],[],[],[],[]]
const stackSize = process.argv[2] === 'sample' ? 3 : 9
const instructions: Instruction[] = []

interface Instruction {
  quantity: number
  from: number
  to: number
}

let createStacksMode = true
for (let index = 0; index < inputArray.length; index++) {
  const line = inputArray[index];
  if (createStacksMode) {
    for (let i = 0; i < line.length; i+=4) {
      const crate = line.substring(i, i + 3)
      // console.log(crate)
      if (crate.toUpperCase() !== crate) {
        console.log('think something is wrong with parsed input')
      }
      allCrates.push(crate)
    }
    createStacksMode = line !== ''
  } else {
    // console.log("input mode: ", line)
    const regex = /move (\d+) from (\d+) to (\d+)/;
    const result = regex.exec(line)
    const myInstruction: Instruction = {quantity: Number(result![1]), from: Number(result![2]), to: Number(result![3])}
    instructions.push(myInstruction)
  }
}
// console.log("allStacks:\n", allCrates)

// normalize data to data structure by adding 1 empty stack at index 0
allCrates.forEach((crate, index, self) => {
  if (crate.includes('[')) {
    stacks[(index%stackSize)+1].push(crate.substring(1, 2))
  }
})

// console.log('stacks:\n', JSON.stringify(stacks, null, 2))
/* 
move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2
*/

stacks.forEach(s => s.reverse())
// console.log('pre-moves:\n', stacks)
// console.log('-----------------------------------------')
const move = (instruction: Instruction) => {
  for (let index = 0; index < instruction.quantity; index++) {
    const wip = stacks[instruction.from].pop() ?? ''
    stacks[instruction.to].push(wip)
    // console.log(stacks)
  }
}
instructions.forEach(i => move(i))
// console.log('-----------------------------------------')
// console.log('final:\n', stacks)

console.log(stacks.reduce((prev, curr) => {
  return prev.concat(curr.pop()??'')
}, ''))