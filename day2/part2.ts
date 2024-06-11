import * as fs from 'fs'

interface Guide {
  opponentMove: string
  outcome: string
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
    case "A":
      return 1
    case "B":
      return 2
    case "C":
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

const inputArray: Guide[] = fs.readFileSync('./day2/sampleInput.txt', 'utf8')
  .split("\n")
  .map(line  => {
    const [opponent, supposedOutcome] = line.split(' ')
    return {opponentMove: opponent, outcome: supposedOutcome} as Guide
  })

const determineWinner = (input: Guide) => {
  let basePoints = 0
  switch (input.outcome) {
    case 'X':
      // need to lose
      basePoints = points("lose")
      if (input.opponentMove === "A") {
        return basePoints + points("C")
      }
      if (input.opponentMove === "B") {
        return basePoints + points("A")
      } 
      if (input.opponentMove === "C") {
        return basePoints + points('B')
      } 
    case 'Y':
      // need to draw
      basePoints = points("draw")
      if (input.opponentMove === "A") {
        return basePoints + points("A")
      }
      if (input.opponentMove === "B") {
        return basePoints + points("B")
      } 
      if (input.opponentMove === "C") {
        return basePoints + points('C')
      }
    case 'Z':
      // need to win
      basePoints = points("win")
      if (input.opponentMove === "A") {
        return basePoints + points("B")
      }
      if (input.opponentMove === "B") {
        return basePoints + points("C")
      } 
      if (input.opponentMove === "C") {
        return basePoints + points('A')
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