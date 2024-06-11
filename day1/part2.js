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
const inputArray = fs.readFileSync('./day1/input.txt', 'utf8').split("\n").map(line => Number(line));
const elfs = [0];
const calculateCalories = () => {
    inputArray.forEach((food, index, self) => {
        if (self[index]) {
            elfs[elfs.length - 1] += food;
        }
        else {
            elfs.push(0);
        }
    });
    elfs.sort((a, b) => a > b ? -1 : 1);
    console.log(elfs.slice(0, 3));
    console.log();
    console.log(elfs.slice(0, 3).reduce((prev, curr) => prev + curr));
};
calculateCalories();
//# sourceMappingURL=part2.js.map