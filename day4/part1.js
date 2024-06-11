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
2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8
*/
const inputArray = fs.readFileSync(`./day4/${file}.txt`, 'utf8')
    .split("\n");
const doTheWork = (assignments) => {
    // 1. split the assignments to get both
    const pairs = assignments.map(assignment => assignment.split(','));
    // console.log(pairs)
    // 2. see if one contains the other
    console.log(checkOverlap(pairs));
    // 3. keep a count of those that do
};
const checkOverlap = (assignments) => {
    return assignments.reduce((prev, assignmentRow) => {
        // split the assignmentRow pair into sections
        const [ass1, ass2] = assignmentRow.map(a => a.split('-').map(n => Number(n)));
        // section = [lowerBound, upperBound]
        const section1 = createArray(ass1);
        const section2 = createArray(ass2);
        // console.log(section1)
        // console.log(section2)
        // console.log("1 in 2: ", section1.every(num => section2.includes(num)))
        // console.log("2 in 1: ", section2.every(num => section1.includes(num)))
        const areEqual = section1.every(num => section2.includes(num)) && (section2.every(num => section1.includes(num)) ? 1 : 0);
        return prev
            + (section1.every(num => section2.includes(num)) ? 1 : 0)
            + (section2.every(num => section1.includes(num)) ? 1 : 0)
            + (areEqual ? -1 : 0);
    }, 0);
};
const createArray = (section) => {
    const theArray = [];
    for (let sectionNumber = section[0]; sectionNumber <= section[1]; sectionNumber++) {
        theArray.push(sectionNumber);
    }
    return [...theArray];
};
// chat-gpt's solution
function countOverlappingRanges(input) {
    // Split the input into pairs of ranges
    const rangePairs = input.map((rangePair) => rangePair.split(","));
    // Parse each range into a start and end value
    const ranges = rangePairs.map(([range1, range2]) => [
        range1.split("-").map(Number),
        range2.split("-").map(Number),
    ]);
    // Count the number of pairs where one range fully contains the other
    return ranges.reduce((count, [[start1, end1], [start2, end2]]) => {
        if ((start1 <= start2 && end1 >= end2) ||
            (start2 <= start1 && end2 >= end1)) {
            return count + 1;
        }
        return count;
    }, 0);
}
console.log(countOverlappingRanges(inputArray));
doTheWork(inputArray);
//# sourceMappingURL=part1.js.map