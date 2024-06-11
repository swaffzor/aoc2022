import * as fs from 'fs'

const inputArray: number[] = fs.readFileSync('./day1/input.txt', 'utf8').split("\n").map(line  => Number(line))

const elfs: number[] = [0]

const calculateCalories = () => {
  inputArray.forEach((food, index, self) => {
    if (self[index]) {
      elfs[elfs.length -1] += food
    } else {
      elfs.push(0)
    }
  })
  elfs.sort((a, b) => a > b ? -1 : 1)
  console.log(elfs.slice(0, 3))
  console.log()
  console.log(elfs.slice(0, 3).reduce((prev, curr) => prev + curr))
}

calculateCalories()