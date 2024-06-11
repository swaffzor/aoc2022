import * as fs from 'fs'

const file = process.argv[2] === 'sample' ? 'sample' : 'input'
/* 
2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8
*/
const inputArray: string[] = fs.readFileSync(`./day4/${file}.txt`, 'utf8')
  .split("\n")

const doTheWork = (assignments: string[]) => {
  // 1. split the assignments to get both
  const pairs: string[][] = assignments.map(assignment => assignment.split(','))
  // console.log(pairs)
  // 2. see if one contains the other
  console.log(checkOverlap(pairs))

  // 3. keep a count of those that do
}

const checkOverlap = (assignments: string[][]) => {
  return assignments.reduce((prev, assignmentRow) => {
    // split the assignmentRow pair into sections
    const [ass1, ass2] = assignmentRow.map(a => a.split('-').map(n => Number(n)))
     // section = [lowerBound, upperBound]
    const section1 = createArray(ass1)
    const section2 = createArray(ass2)
    // console.log(section1)
    // console.log(section2)
    // console.log("1 in 2: ", section1.every(num => section2.includes(num)))
    // console.log("2 in 1: ", section2.every(num => section1.includes(num)))
    return prev + (section1.some(num => section2.includes(num)) ? 1 : 0)
  }, 0)
}

const createArray = (section: number[]) => {
  const theArray: number[] = []
  for (let sectionNumber=section[0]; sectionNumber<=section[1]; sectionNumber++) {
    theArray.push(sectionNumber)
  }
  return [...theArray]
}

function countOverlappingRanges(input: string[]): number {
  // Split the input into pairs of ranges
  const rangePairs = input.map((rangePair) => rangePair.split(","));

  // Parse each range into a start and end value
  const ranges = rangePairs.map(([range1, range2]) => [
    range1.split("-").map(Number),
    range2.split("-").map(Number),
  ]);

  // Count the number of pairs where one range fully contains the other
  return ranges.reduce((count, [[start1, end1], [start2, end2]]) => {
    if (
      (start1 <= start2 && end1 >= end2) ||
      (start2 <= start1 && end2 >= end1)
    ) {
      return count + 1;
    }
    return count;
  }, 0);
}
console.log(countOverlappingRanges(inputArray))
doTheWork(inputArray)