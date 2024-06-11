import * as fs from 'fs'
const day = 10
console.log('day ', day)

const file = process.argv[2] === 'sample' ? 'sample' : 'input'
const puzzleInput: string[] = fs.readFileSync(`./day${day}/${file}.txt`, 'utf8').split('\n')
/*
noop
addx 3
addx -5
*/

enum Cycles {
  'noop',
  'addx'
}

const doTheWork = (input: string[]) => {
  let clock = 1
  let registerX = 1
  let inputIndex = 0
  let busy = false
  let proccessTime = 0
  let addVal = 0
  let signalSum = 0

  while (input[inputIndex]) {
    if (!busy) {
      const instruction = input[inputIndex].split(' ')
      addVal = instruction[1] ? Number(instruction[1]) : 0
      proccessTime = instruction[0] === 'addx' ? 2 : 1
    }
    
    if ((20 + clock) % 40 === 0) {
      const sum = clock * registerX
      signalSum += sum
      console.log('cycle:', clock, 'x:', registerX, 'sum:', sum)
    }
    
    proccessTime -= 1
    if (proccessTime === 0) {
      registerX += addVal
      inputIndex += 1
    }
    
    // console.log('end of cycle: ', clock, 'X: ', registerX)
    busy = proccessTime > 0
    clock += 1
  }

  return {
    x: registerX,
    cycles: clock - 1,
    sum: signalSum
  }
}

// const testCycleTiming = doTheWork([
//   'noop',
//   'addx 3',
//   'addx -5',
// ])

// console.log(testCycleTiming.x === -1 && testCycleTiming.cycles === 5 ? 'PASS' : 'FAIL')

console.log(doTheWork(puzzleInput))