import * as fs from "fs";
import { testExpected } from "./testExpected";
const day = 11;
console.log("day ", day);

const file = process.argv[2] === "sample" ? "sample" : "input";
const puzzleInput: string[] = fs
  .readFileSync(`./day${day}/${file}.txt`, "utf8")
  .split("\n\n");

interface Monkey {
  items: number[];
  opertion: (oldWorry: number) => number;
  test: (testCase: number) => number;
  inspectCount: number;
}

const generateOperation = (tokens: string[]) => {
  let theFn: (worry: number) => number = (n: number) => n;
  switch (tokens[1]) {
    case "+":
      theFn = (worry: number) =>
        (tokens[0] === "old" ? worry : parseInt(tokens[0])) +
        (tokens[2] === "old" ? worry : parseInt(tokens[2]));
      break;
    case "*":
      theFn = (oldWorry: number) =>
        (tokens[0] === "old" ? oldWorry : parseInt(tokens[0])) *
        (tokens[2] === "old" ? oldWorry : parseInt(tokens[2]));
      break;
    default:
      break;
  }
  return theFn;
};

const generateTest = (tokens: string[]) => {
  let testLogic = (worry: number) =>
    worry % productOfDivors === 0
      ? parseInt(tokens[1].trim())
      : parseInt(tokens[2].trim());

  return testLogic;
};

let productOfDivors = 0;
const parseInput = (input: string[]): Monkey[] => {
  const stuff: Monkey[] = input.map((chunk, index) => {
    const lines = chunk.split("\n");
    const values = lines[1].split(":")[1].trim();
    const tokens = lines[2].split("new = ")[1].split(" ");
    const testTokens = [
      lines[3].split("Test: divisible by")[1].trim(),
      lines[4].split("If true: throw to monkey ")[1]?.trim(),
      lines[5].split("If false: throw to monkey ")[1]?.trim(),
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

interface TestResult {
  worry: number;
  newWorry: number;
  relief: number;
  targetMonkey: number;
}
const testResults: TestResult[] = [];
const inspectItems = (monkeys: Monkey[]) => {
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
    testResult.worry === testExpected[index].worry ? "pass" : "fail",
    testResult.newWorry === testExpected[index].newWorry ? "pass" : "fail",
    testResult.relief === testExpected[index].relief ? "pass" : "fail",
    testResult.targetMonkey === testExpected[index].targetMonkey
      ? "pass"
      : "fail",
  ])
  .every((n) => n.every((m) => m === "pass"))
  ? "PASSED"
  : "FAILED";

console.log(result);
