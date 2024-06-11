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
        case "X":
            return 1;
        case "Y":
            return 2;
        case "Z":
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
const inputArray = fs.readFileSync('./day2/input.txt', 'utf8')
    .split("\n")
    .map(line => {
    const [opponent, mine] = line.split(' ');
    return { opponentMove: opponent, myMove: mine };
});
const determineWinner = (input) => {
    const basePoints = points(input.myMove);
    switch (input.myMove) {
        case 'X':
            if (input.opponentMove === "C") {
                return basePoints + points("win");
            }
            else if (input.opponentMove === "B") {
                return basePoints + points("lose");
            }
            else {
                return basePoints + points("draw");
            }
        case 'Y':
            if (input.opponentMove === "C") {
                return basePoints + points("lose");
            }
            else if (input.opponentMove === "A") {
                return basePoints + points("win");
            }
            else {
                return basePoints + points("draw");
            }
        case 'Z':
            if (input.opponentMove === "B") {
                return basePoints + points("win");
            }
            else if (input.opponentMove === "A") {
                return basePoints + points("lose");
            }
            else {
                return basePoints + points("draw");
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
//# sourceMappingURL=part1.js.map