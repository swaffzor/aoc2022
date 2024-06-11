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
var Moves;
(function (Moves) {
    Moves["A"] = "rock";
    Moves["X"] = "rock";
    Moves["B"] = "paper";
    Moves["Y"] = "paper";
    Moves["C"] = "scissors";
    Moves["Z"] = "scissors";
})(Moves || (Moves = {}));
var OppoMoves;
(function (OppoMoves) {
    OppoMoves["A"] = "rock";
    OppoMoves["B"] = "paper";
    OppoMoves["C"] = "scissors";
})(OppoMoves || (OppoMoves = {}));
var MyMoves;
(function (MyMoves) {
    MyMoves[MyMoves["X"] = 0] = "X";
    MyMoves[MyMoves["Y"] = 1] = "Y";
    MyMoves[MyMoves["Z"] = 2] = "Z";
})(MyMoves || (MyMoves = {}));
const points = (input) => {
    switch (input) {
        case "A":
            return 1;
        case "B":
            return 2;
        case "C":
            return 3;
        case "win":
            return 6;
        case "draw":
            return 3;
        case "lose":
        default:
            return 0;
    }
};
const inputArray = fs.readFileSync('./day2/sampleInput.txt', 'utf8')
    .split("\n")
    .map(line => {
    const [opponent, supposedOutcome] = line.split(' ');
    return { opponentMove: opponent, outcome: supposedOutcome };
});
const determineWinner = (input) => {
    let basePoints = 0;
    switch (input.outcome) {
        case 'X':
            // need to lose
            basePoints = points("lose");
            if (input.opponentMove === "A") {
                return basePoints + points("C");
            }
            if (input.opponentMove === "B") {
                return basePoints + points("A");
            }
            if (input.opponentMove === "C") {
                return basePoints + points('B');
            }
        case 'Y':
            // need to draw
            basePoints = points("draw");
            if (input.opponentMove === "A") {
                return basePoints + points("A");
            }
            if (input.opponentMove === "B") {
                return basePoints + points("B");
            }
            if (input.opponentMove === "C") {
                return basePoints + points('C');
            }
        case 'Z':
            // need to win
            basePoints = points("win");
            if (input.opponentMove === "A") {
                return basePoints + points("B");
            }
            if (input.opponentMove === "B") {
                return basePoints + points("C");
            }
            if (input.opponentMove === "C") {
                return basePoints + points('A');
            }
        default:
            return 0;
            break;
    }
};
const result = inputArray.reduce((prev, curr) => {
    const myPoints = determineWinner(curr);
    console.log(myPoints);
    return myPoints + prev;
}, 0);
console.log('total: ', result);
//# sourceMappingURL=part2.js.map