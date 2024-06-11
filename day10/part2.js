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
const day = 10;
console.log('day ', day);
const file = process.argv[2] === 'sample' ? 'sample' : 'input';
const puzzleInput = fs.readFileSync(`./day${day}/${file}.txt`, 'utf8').split('\n');
/*
noop
addx 3
addx -5
*/
const doTheWork = (input) => {
    let cycle = 0;
    let xPosition = 1;
    let inputIndex = 0;
    let busy = false;
    let proccessTime = 0;
    let addVal = 0;
    let printPixel = true;
    while (input[inputIndex]) {
        if (!busy) {
            const instruction = input[inputIndex].split(' ');
            addVal = instruction[1] ? Number(instruction[1]) : 0;
            proccessTime = instruction[0] === 'addx' ? 2 : 1;
        }
        const idk = cycle - Math.floor(cycle / 40) * 40;
        printPixel = xPosition === idk || xPosition - 1 === idk || xPosition + 1 === idk;
        if (cycle > 20 && cycle % 40 === 0) {
            console.log(cycle);
        }
        process.stdout.write(printPixel ? '#' : ' ');
        proccessTime -= 1;
        if (proccessTime === 0) {
            xPosition += addVal;
            inputIndex += 1;
        }
        busy = proccessTime > 0;
        cycle += 1;
    }
    return {
        x: xPosition,
        cycles: cycle - 1,
    };
};
// console.log('##..##..##..##..##..##..##..##..##..##..')
doTheWork(puzzleInput);
//# sourceMappingURL=part2.js.map