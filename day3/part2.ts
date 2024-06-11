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
Every set of three lines in your list corresponds to a single group, but each group can have a different badge item type. So, in the above example, the first group's rucksacks are the first three lines:

vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg

And the second group's rucksacks are the next three lines:
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw

In the first group, the only item type that appears in all three rucksacks is lowercase r; this must be their badges. In the second group, their badge item type must be Z.

Priorities for these items must still be found to organize the sticker attachment efforts: here, they are 18 (r) for the first group and 52 (Z) for the second group. The sum of these is 70.

Find the item type that corresponds to the badges of each three-Elf group. What is the sum of the priorities of those item types?
*/

const doTheWork = (lines: string[]) => {
  // split the lines into their groups of 3
  const groupsOf3 = lines.map((line, index, self) => {
    if (index % 3 === 0) {
      return self.slice(index, index + 3)
    }
  })
  .filter(Boolean)

  const sharedItems = groupsOf3.map(line => line ? compareCompartments(line) : [])
  const priorites = sharedItems.flatMap(item => convertToPriority(item))
  console.log(sum(priorites))
}

const compareCompartments = (line: string[]) => {
  const firstChars = line[0].split("").filter(ch => ch !== "");
  const secondChars = line[1].split("").filter(ch => ch !== "");
  const thirdChars = line[2].split("").filter(ch => ch !== "");

  const commonChars = firstChars.filter(ch => secondChars.indexOf(ch) >= 0 && thirdChars.indexOf(ch) >= 0);
  const uniqueChars = [...new Set(commonChars)]
  return uniqueChars
}

const convertToPriority = (sharedItems: string[]) => {
  // Lowercase item types a through z have priorities 1 through 26.
  // Uppercase item types A through Z have priorities 27 through 52.
  return sharedItems.map(item => item.codePointAt(0)! - (isLowercase(item) ? 97 : 39) + 1)
}

const isLowercase = (str: string): boolean => str.toLowerCase() === str;
const sum = (nums: number[]) => nums.reduce((prev, curr) => prev + curr)

doTheWork(inputArray)