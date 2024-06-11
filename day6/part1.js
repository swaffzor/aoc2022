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
const day = 6;
console.log('day ', day);
const file = process.argv[2] === 'sample' ? 'sample' : 'input';
const input = fs.readFileSync(`./day${day}/${file}.txt`, 'utf8');
/*
the start of a packet is indicated by a sequence of four characters that are all different.
mjqjpqmgbljsphdztnvjfqwrcgsmlb
After the first three characters (mjq) have been received, there haven't been enough characters received yet to find the marker. The first time a marker could occur is after the fourth character is received, making the most recent four characters mjqj. Because j is repeated, this isn't a marker.

The first time a marker appears is after the seventh character arrives. Once it does, the last four characters received are jpqm, which are all different. In this case, your subroutine should report the value 7, because the first start-of-packet marker is complete after 7 characters have been processed.

Here are a few more examples:

bvwbjplbgvbhsrlpgdmjqwftvncz: first marker after character 5
nppdvjthqldpwncqszvftbrmjlhg: first marker after character 6
nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg: first marker after character 10
zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw: first marker after character 11
How many characters need to be processed before the first start-of-packet marker is detected?
*/
const detectStart = (inputBuffer, countToStart, log) => {
    let charCount = countToStart;
    let index = 0;
    let isUnique = false;
    while (inputBuffer[index + countToStart] && !isUnique) {
        const chunk = inputBuffer.slice(index, index + countToStart);
        log && log(chunk);
        let set = new Set(chunk);
        isUnique = set.size === chunk.length;
        if (isUnique) {
            log && log('START');
        }
        else {
            charCount += 1;
        }
        index += 1;
    }
    log && log(`count: ${charCount}`);
    return charCount;
};
const part1 = detectStart(input, 4);
const part2 = detectStart(input, 14);
const testDataPart1 = [
    { buffer: 'bvwbjplbgvbhsrlpgdmjqwftvncz', expect: 5, },
    { buffer: 'nppdvjthqldpwncqszvftbrmjlhg', expect: 6, },
    { buffer: 'nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', expect: 10, },
    { buffer: 'zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', expect: 11, },
];
const testDataPart2 = [
    { buffer: 'mjqjpqmgbljsphdztnvjfqwrcgsmlb', expect: 19 },
    { buffer: 'bvwbjplbgvbhsrlpgdmjqwftvncz', expect: 23 },
    { buffer: 'nppdvjthqldpwncqszvftbrmjlhg', expect: 23 },
    { buffer: 'nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', expect: 29 },
    { buffer: 'zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', expect: 26 },
];
const testRestuls = process.argv[3] === '1' ?
    testDataPart1.map(test => {
        let result = 'FAIL';
        if (detectStart(test.buffer, 4, console.log) === test.expect) {
            result = 'PASS';
        }
        console.log(result);
        return result;
    })
    : testDataPart2.map(test => {
        let result = 'FAIL';
        if (detectStart(test.buffer, 14, console.log) === test.expect) {
            result = 'PASS';
        }
        console.log(result);
        return result;
    });
console.log(testRestuls.every(t => t === 'PASS') && (process.argv[3] === '1' ? part1 : part2));
//# sourceMappingURL=part1.js.map