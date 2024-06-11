import * as fs from 'fs'

const file = process.argv[2] === 'sample' ? 'sample' : 'input'
/*
// sample.txt 
vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw
*/
const inputArray: string[] = fs.readFileSync(`./day3/${file}.txt`, 'utf8')
  .split("\n")

/*
To help prioritize item rearrangement, every item type can be converted to a priority:

Lowercase item types a through z have priorities 1 through 26.
Uppercase item types A through Z have priorities 27 through 52.
In the above example, the priority of the item type that appears in both compartments of each rucksack is 16 (p), 38 (L), 42 (P), 22 (v), 20 (t), and 19 (s); the sum of these is 157.

Find the item type that appears in both compartments of each rucksack. What is the sum of the priorities of those item types?
*/

// 1. find shared items
// 2. convert to a priority
// 3. get the sum

const findShared = (input: string[]) => {
  const sharedItems = input.flatMap(line=> compareCompartments(line))
  console.log("sharedItems:\n", JSON.stringify(sharedItems, null, 2))

  const priorities = convertToPriority(sharedItems)
  const summed  = sum(priorities)
  console.log('summed: ', summed)
}

const compareCompartments = (line: string) => {
  const half = Math.floor(line.length / 2);
  const firstHalf = line.substring(0, half);
  const secondHalf = line.substring(half);
  
  let firstHalfChars = firstHalf.split("").filter(ch => ch !== "");
  let secondHalfChars = secondHalf.split("").filter(ch => ch !== "");
  let commonChars = firstHalfChars.filter(ch => secondHalfChars.indexOf(ch) >= 0);
  let uniqueChars = [...new Set(commonChars)]
  return uniqueChars
}

const convertToPriority = (sharedItems: string[]) => {
  // Lowercase item types a through z have priorities 1 through 26.
  // Uppercase item types A through Z have priorities 27 through 52.
  return sharedItems.map(item => item.codePointAt(0)! - (isLowercase(item) ? 97 : 39) + 1)
}

const isLowercase = (str: string): boolean => str.toLowerCase() === str;

const sum = (nums: number[]) => nums.reduce((prev, curr) => prev + curr)

findShared(inputArray)