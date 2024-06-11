import * as fs from 'fs'

interface Guide {
  opponentMove: string
  myMove: string
}

enum Moves {
  "A" = "rock",
  "X" = "rock",
  "B" = "paper",
  "Y" = "paper",
  "C" = "scissors",
  "Z" = "scissors",
}

enum OppoMoves {
  "A" = "rock",
  "B" = "paper",
  "C" = "scissors",
}

enum MyMoves {
  "X",
  "Y",
  "Z",
}

const points = (input: string) => {
  switch (input) {
    case "X":
      return 1
    case "Y":
      return 2
    case "Z":
      return 3
    case "win":
      return 6
    case "draw":
      return 3
    case "lose":
    default:
      return 0
  }
}

const inputArray: Guide[] = fs.readFileSync('./day2/input.txt', 'utf8')
  .split("\n")
  .map(line  => {
    const [opponent, mine] = line.split(' ')
    return {opponentMove: opponent, myMove: mine} as Guide
  })

const determineWinner = (input: Guide) => {
  const basePoints = points(input.myMove)
  switch (input.myMove) {
    case 'X':
      if (input.opponentMove === "C") {
        return basePoints + points("win")
      } else if (input.opponentMove === "B") {
        return basePoints + points("lose")
      } else {
        return basePoints + points("draw")
      }
    case 'Y':
      if (input.opponentMove === "C") {
        return basePoints + points("lose")
      } else if (input.opponentMove === "A") {
        return basePoints + points("win")
      } else {
        return basePoints + points("draw")
      }
    case 'Z':
      if (input.opponentMove === "B") {
        return basePoints + points("win")
      } else if (input.opponentMove === "A") {
        return basePoints + points("lose")
      } else {
        return basePoints + points("draw")
      }
    default:
      return 0
      break;
  }
}

const result = inputArray.reduce((prev, curr) => {
  const myPoints = determineWinner(curr)
  console.log(myPoints)
  return myPoints + prev
}, 0)

console.log('total: ', result)