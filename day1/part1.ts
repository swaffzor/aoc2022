import * as fs from 'fs'

const inputArray: number[] = fs.readFileSync('./day1/sampleInput.txt', 'utf8').split("\n").map(line  => Number(line))

const elfs: number[] = [0]

export const calculateCalories = () => {
  inputArray.forEach((food, index, self) => {
    if (self[index]) {
      elfs[elfs.length -1] += food
    } else {
      elfs.push(0)
    }
  })
  console.log(elfs)
  console.log()
  console.log(elfs.reduce((prev, cur) => {
    return prev > cur ? prev : cur
  }))
}

calculateCalories()