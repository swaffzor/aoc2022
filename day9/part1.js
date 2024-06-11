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
const day = 9;
console.log('day ', day);
const file = process.argv[2] === 'sample' ? 'sample' : 'input';
const puzzleInput = fs.readFileSync(`./day${day}/${file}.txt`, 'utf8').split('\n');
const headLocation = { x: 0, y: 0 };
const tailLocation = { x: 0, y: 0 };
const tailPositions = new Set();
tailPositions.add('x:0,y:0');
/*
R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2
*/
const doTheWork = (input) => {
    input.forEach(instruction => {
        const [direction, steps] = instruction.split(' ');
        const numSteps = Number(steps);
        // console.log(direction, steps)
        for (let i = 0; i < numSteps; i++) {
            // move head
            switch (direction) {
                case 'U':
                    headLocation.y += 1;
                    break;
                case 'D':
                    headLocation.y -= 1;
                    break;
                case 'L':
                    headLocation.x -= 1;
                    break;
                case 'R':
                    headLocation.x += 1;
                    break;
                default:
                    break;
            }
            // calculate distanace head to tail
            const xDiff = headLocation.x - tailLocation.x;
            const yDiff = headLocation.y - tailLocation.y;
            // if distance more than 1
            if (Math.abs(xDiff) > 1 || Math.abs(yDiff) > 1) {
                // move tail
                tailLocation.x += xDiff === 0 ? 0 : xDiff > 0 ? 1 : -1;
                tailLocation.y += yDiff === 0 ? 0 : yDiff > 0 ? 1 : -1;
                tailPositions.add(`x:${tailLocation.x},y:${tailLocation.y}`);
                // console.log('tail positions: ', tailPositions)
            }
            // console.log('headLocation: ', headLocation)
            // console.log('tailLocation: ', tailLocation)
            // console.log()
        }
    });
};
// console.log(board)
doTheWork(puzzleInput);
console.log('tail positions: ', tailPositions.size);
//# sourceMappingURL=part1.js.map