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
const day = 8;
console.log('day ', day);
const file = process.argv[2] === 'sample' ? 'sample' : 'input';
const puzzleInput = fs.readFileSync(`./day${day}/${file}.txt`, 'utf8').split('\n').flatMap((row, rowIndex) => row.split('').map((n, columnIndex) => {
    return {
        x: columnIndex,
        y: rowIndex,
        z: Number(n)
    };
}));
// console.log(JSON.stringify(puzzleInput, null, 2))
const countVisibleTrees = (trees, log) => {
    let count = 0;
    trees.forEach((tree, index) => {
        log && console.log(`tree: ${JSON.stringify(tree)}`);
        if (tree.x === 0 || tree.y === 0) {
            count += 1;
        }
        else {
            const leftCandidates = trees.filter(t => t.y === tree.y && t.x < tree.x);
            const rightCandidates = trees.filter(t => t.y === tree.y && t.x > tree.x);
            const topCandidates = trees.filter(t => t.y < tree.y && t.x === tree.x);
            const bottomCandidates = trees.filter(t => t.y > tree.y && t.x === tree.x);
            const visFromLeft = isTreeVisibile(leftCandidates, tree.z);
            const visFromRight = isTreeVisibile(rightCandidates, tree.z);
            const visFromTop = isTreeVisibile(topCandidates, tree.z);
            const visFromBottom = isTreeVisibile(bottomCandidates, tree.z);
            if (visFromLeft || visFromRight || visFromBottom || visFromTop) {
                count += 1;
            }
            log && console.log(`count: ${count}`);
        }
    });
};
const isTreeVisibile = (candidates, treeHeight) => {
    return candidates.reduce((isVis, curr) => {
        return isVis && curr.z < treeHeight;
    }, true);
};
countVisibleTrees(puzzleInput);
/*
30373
25512
65332
33549
35390
*/ 
//# sourceMappingURL=part1.js.map