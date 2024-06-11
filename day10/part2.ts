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

const doTheWork = (input: string[]) => {
  let cycle = 0
  let xPosition = 1
  let inputIndex = 0
  let busy = false
  let proccessTime = 0
  let addVal = 0
  let printPixel = true

  while (input[inputIndex]) {
    if (!busy) {
      const instruction = input[inputIndex].split(' ')
      addVal = instruction[1] ? Number(instruction[1]) : 0
      proccessTime = instruction[0] === 'addx' ? 2 : 1
    }

    const idk = cycle - Math.floor(cycle / 40) * 40
    printPixel = xPosition === idk || xPosition - 1 === idk || xPosition + 1 === idk
    if (cycle > 20 && cycle % 40 === 0) {
      console.log(cycle)
    }
    
    process.stdout.write(printPixel ? '#' : ' ')
    proccessTime -= 1
    if (proccessTime === 0) {
      xPosition += addVal
      inputIndex += 1
    }
    
    busy = proccessTime > 0
    cycle += 1
  }

  return {
    x: xPosition,
    cycles: cycle - 1,
  }
}

// console.log('##..##..##..##..##..##..##..##..##..##..')
doTheWork(puzzleInput)