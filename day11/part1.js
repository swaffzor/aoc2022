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
const testExpected_1 = require("./testExpected");
const day = 11;
console.log("day ", day);
const file = process.argv[2] === "sample" ? "sample" : "input";
const puzzleInput = fs
    .readFileSync(`./day${day}/${file}.txt`, "utf8")
    .split("\n\n");
const generateOperation = (tokens) => {
    let theFn = (n) => n;
    switch (tokens[1]) {
        case "+":
            theFn = (worry) => (tokens[0] === "old" ? worry : parseInt(tokens[0])) +
                (tokens[2] === "old" ? worry : parseInt(tokens[2]));
            break;
        case "*":
            theFn = (oldWorry) => (tokens[0] === "old" ? oldWorry : parseInt(tokens[0])) *
                (tokens[2] === "old" ? oldWorry : parseInt(tokens[2]));
            break;
        default:
            break;
    }
    return theFn;
};
const generateTest = (tokens) => {
    let testLogic = (worry) => worry % productOfDivors === 0
        ? parseInt(tokens[1].trim())
        : parseInt(tokens[2].trim());
    return testLogic;
};
let productOfDivors = 0;
const parseInput = (input) => {
    const stuff = input.map((chunk, index) => {
        var _a, _b;
        const lines = chunk.split("\n");
        const values = lines[1].split(":")[1].trim();
        const tokens = lines[2].split("new = ")[1].split(" ");
        const testTokens = [
            lines[3].split("Test: divisible by")[1].trim(),
            (_a = lines[4].split("If true: throw to monkey ")[1]) === null || _a === void 0 ? void 0 : _a.trim(),
            (_b = lines[5].split("If false: throw to monkey ")[1]) === null || _b === void 0 ? void 0 : _b.trim(),
        ];
        productOfDivors =
            index === 1
                ? parseInt(testTokens[0])
                : productOfDivors * parseInt(testTokens[0]);
        return {
            id: parseInt(lines[0].split(" ")[1].replace(":", "")),
            items: values.includes(",")
                ? values.split(",").map((n) => parseInt(n.trim()))
                : [parseInt(values)],
            opertion: generateOperation(tokens),
            test: generateTest(testTokens),
            inspectCount: 0,
        };
    });
    return stuff;
};
const testResults = [];
const inspectItems = (monkeys) => {
    for (let round = 0; round < 20; round++) {
        console.log(round);
        monkeys.forEach((monkey) => {
            const tempy = monkey.items.map((worry) => {
                // perform inspection (operation) to change worry level
                const newWorry = monkey.opertion(worry);
                monkey.inspectCount += 1;
                // calculate relief (divide by 3, rounded down)
                const relief = Math.floor(newWorry / 3);
                // test to determine which monkey receives item
                const targetMonkey = monkey.test(relief);
                testResults.push({
                    worry: worry,
                    newWorry: newWorry,
                    relief: relief,
                    targetMonkey: targetMonkey,
                });
                // throw item to next monkey
                if (monkeys[targetMonkey]) {
                    monkeys[targetMonkey].items.push(relief);
                    // monkey.items.shift(); // bug?
                    return undefined;
                }
            });
        });
    }
    return monkeys;
};
const monkeys = parseInput(puzzleInput);
const part1 = inspectItems(monkeys);
console.log(part1.map((m) => m.inspectCount));
// console.log(JSON.stringify(inspectItems(monkeys), null, 2));
const result = testResults
    .map((testResult, index) => [
    testResult.worry === testExpected_1.testExpected[index].worry ? "pass" : "fail",
    testResult.newWorry === testExpected_1.testExpected[index].newWorry ? "pass" : "fail",
    testResult.relief === testExpected_1.testExpected[index].relief ? "pass" : "fail",
    testResult.targetMonkey === testExpected_1.testExpected[index].targetMonkey
        ? "pass"
        : "fail",
])
    .every((n) => n.every((m) => m === "pass"))
    ? "PASSED"
    : "FAILED";
console.log(result);
//# sourceMappingURL=part1.js.map