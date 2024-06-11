"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const file = process.argv[2] === 'sample' ? 'sample' : 'input';
/*
// sample.txt
vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw
*/
const inputArray = fs.readFileSync(`./day3/${file}.txt`, 'utf8')
    .split("\n");
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
const findShared = (input) => {
    const sharedItems = input.flatMap(line => compareCompartments(line));
    console.log("sharedItems:\n", JSON.stringify(sharedItems, null, 2));
    const priorities = convertToPriority(sharedItems);
    const summed = sum(priorities);
    console.log('summed: ', summed);
};
const compareCompartments = (line) => {
    const half = Math.floor(line.length / 2);
    const firstHalf = line.substring(0, half);
    const secondHalf = line.substring(half);
    let firstHalfChars = firstHalf.split("").filter(ch => ch !== "");
    let secondHalfChars = secondHalf.split("").filter(ch => ch !== "");
    let commonChars = firstHalfChars.filter(ch => secondHalfChars.indexOf(ch) >= 0);
    let uniqueChars = [...new Set(commonChars)];
    return uniqueChars;
};
const convertToPriority = (sharedItems) => {
    // Lowercase item types a through z have priorities 1 through 26.
    // Uppercase item types A through Z have priorities 27 through 52.
    return sharedItems.map(item => item.codePointAt(0) - (isLowercase(item) ? 97 : 39) + 1);
};
const isLowercase = (str) => str.toLowerCase() === str;
const sum = (nums) => nums.reduce((prev, curr) => prev + curr);
findShared(inputArray);
//# sourceMappingURL=part1.js.map