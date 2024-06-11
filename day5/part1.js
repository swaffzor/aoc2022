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
const inputArray = fs.readFileSync(`./day5/${file}.txt`, 'utf8')
    .split("\n");
console.log('day 5');
/*
[D]
[N] [C]
[Z] [M] [P]
1   2   3
*/
const allCrates = [];
const stacks = [[], [], [], [], [], [], [], [], [], []];
const stackSize = process.argv[2] === 'sample' ? 3 : 9;
const instructions = [];
let createStacksMode = true;
for (let index = 0; index < inputArray.length; index++) {
    const line = inputArray[index];
    if (createStacksMode) {
        for (let i = 0; i < line.length; i += 4) {
            const crate = line.substring(i, i + 3);
            // console.log(crate)
            if (crate.toUpperCase() !== crate) {
                console.log('think something is wrong with parsed input');
            }
            allCrates.push(crate);
        }
        createStacksMode = line !== '';
    }
    else {
        // console.log("input mode: ", line)
        const regex = /move (\d+) from (\d+) to (\d+)/;
        const result = regex.exec(line);
        const myInstruction = { quantity: Number(result[1]), from: Number(result[2]), to: Number(result[3]) };
        instructions.push(myInstruction);
    }
}
// console.log("allStacks:\n", allCrates)
// normalize data to data structure by adding 1 empty stack at index 0
allCrates.forEach((crate, index, self) => {
    if (crate.includes('[')) {
        stacks[(index % stackSize) + 1].push(crate.substring(1, 2));
    }
});
// console.log('stacks:\n', JSON.stringify(stacks, null, 2))
/*
move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2
*/
stacks.forEach(s => s.reverse());
// console.log('pre-moves:\n', stacks)
// console.log('-----------------------------------------')
const move = (instruction) => {
    var _a;
    for (let index = 0; index < instruction.quantity; index++) {
        const wip = (_a = stacks[instruction.from].pop()) !== null && _a !== void 0 ? _a : '';
        stacks[instruction.to].push(wip);
        // console.log(stacks)
    }
};
instructions.forEach(i => move(i));
// console.log('-----------------------------------------')
// console.log('final:\n', stacks)
console.log(stacks.reduce((prev, curr) => {
    var _a;
    return prev.concat((_a = curr.pop()) !== null && _a !== void 0 ? _a : '');
}, ''));
//# sourceMappingURL=part1.js.map