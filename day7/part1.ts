import * as fs from 'fs'
const day = 7
console.log('day ', day)

const file = process.argv[2] === 'sample' ? 'sample' : 'input'
const puzzleInput: string = fs.readFileSync(`./day${day}/${file}.txt`, 'utf8')

interface FileStructureNode {
  name: string,
  size: number,
  parentName: string,
  contents: string[]
}

let directories: FileStructureNode[] = []

const updateDirSize = (parentName: string, fileSize: number) => {
  directories.forEach((d, index, self) => {
    if (d.name === parentName) {
      directories[index].size += fileSize
      updateDirSize(d.parentName, fileSize)
    }
  })
}

const doTheWork = (input: string[], log?: (message?: any) => void) => {
  let directory = ''
  let parent = ''
  input.forEach(line => {
    log && log(`line: ${line}`)
    if (line.includes("$ cd ")) {
      const dirName = line.split('$ cd ')[1].trim()
      if (dirName === '..') {
        directory = parent ?? '/'
        parent = directories.find(element => element.name === directory)?.parentName ?? 'err'
      } else {
        parent = directory
        directory = dirName
      }
    } else if (line.includes("$ ls")) {
      // no-op
    } else {
      const fileSize = line.includes('dir') ? 0 : Number(line.split(' ')[0])
      const workingDir: FileStructureNode = directories.find(element => element.name === directory) ?? {
        name: directory,
        size: 0,
        parentName: parent,
        contents: []  
      }
      workingDir.contents.push(line)
      workingDir.size += fileSize
      updateDirSize(parent, fileSize)

      if(directories.some(d => d.name === directory)) {
        directories = directories.map(d => d.name === workingDir.name ? workingDir : d)
      } else {
        directories.push(workingDir)
      }
    }
    log && log(`directories: ${JSON.stringify(directories, null, 2)}`)
  })
}

doTheWork(puzzleInput.split('\n'))
// console.log(JSON.stringify(directories, null, 2))
console.log(directories.reduce((total, curr) => total + (curr.size <= 100000 ? curr.size : 0), 0))

interface FileSystemNode {
  name: string;
  parent?: FileSystemNode;
  size?: number;
  children?: Map<string, FileSystemNode>;
}
function solvePuzzle(input: string): number {
  // Parse the input and build the file system tree
  const lines = input.split('\n').filter(l => l.length > 0);
  const root: FileSystemNode = { name: '/', children: new Map() };
  let currentNode = root;
  for (const line of lines) {
    if (line.startsWith('$')) {
      // This is a command line
      const tokens = line.split(' ');
      if (tokens[1] === 'cd') {
        if (tokens[2] === '/') {
          currentNode = root;
        } else if (tokens[2] === '..') {
          currentNode = currentNode.parent || root;
        } else {
          const child = currentNode.children?.get(tokens[2]);
          if (child) {
            currentNode = child;
          }
        }
      } else if (tokens[1] === 'ls') {
        // This is a no-op, we don't care about the output of the ls command
      }
    } else {
      // This is an ls output line
      const tokens = line.split(' ');
      if (tokens[0] === 'dir') {
        const node: FileSystemNode = { name: tokens[1], parent: currentNode, children: new Map() };
        currentNode.children?.set(node.name, node);
      } else {
        // This is a file
        const size = parseInt(tokens[0]);
        currentNode.children?.set(tokens[1], { name: tokens[1], parent: currentNode, size });
      }
    }
  }

  // Traverse the file system tree and compute the total size of each directory
  const totalSizes = new Map<FileSystemNode, number>();
  const stack: FileSystemNode[] = [root];
  while (stack.length > 0) {
    const node = stack.pop()!;
    let totalSize = 0;
    for (const child of node.children!.values()) {
      if (child.children) {
        // This is a directory, add it to the stack for further processing
        stack.push(child);
      } else {
        // This is a file, add its size to the total size of the current directory
        totalSize += child.size ?? 0;
      }
    }
    totalSizes.set(node, totalSize);
  }

  // Find all directories with total size at most 100000 and return the sum of their sizes
  let sum = 0;
  for (const [node, totalSize] of totalSizes) {
    if (totalSize <= 100000) {
      sum += totalSize;
    }
  }
  return sum;
}

console.log(solvePuzzle(puzzleInput))

/*
$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k

Given the commands and output in the example above, you can determine that the filesystem looks visually like this:

- / (dir)
  - a (dir)
    - e (dir)
      - i (file, size=584)
    - f (file, size=29116)
    - g (file, size=2557)
    - h.lst (file, size=62596)
  - b.txt (file, size=14848514)
  - c.dat (file, size=8504156)
  - d (dir)
    - j (file, size=4060174)
    - d.log (file, size=8033020)
    - d.ext (file, size=5626152)
    - k (file, size=7214296)

    Here, there are four directories: / (the outermost directory), a and d (which are in /), and e (which is in a). These directories also contain files of various sizes.

Since the disk is full, your first step should probably be to find directories that are good candidates for deletion. To do this, you need to determine the total size of each directory. The total size of a directory is the sum of the sizes of the files it contains, directly or indirectly. (Directories themselves do not count as having any intrinsic size.)

The total sizes of the directories above can be found as follows:

The total size of directory e is 584 because it contains a single file i of size 584 and no other directories.
The directory a has total size 94853 because it contains files f (size 29116), g (size 2557), and h.lst (size 62596), plus file i indirectly (a contains e which contains i).
Directory d has total size 24933642.
As the outermost directory, / contains every file. Its total size is 48381165, the sum of the size of every file.
To begin, find all of the directories with a total size of at most 100000, then calculate the sum of their total sizes. In the example above, these directories are a and e; the sum of their total sizes is 95437 (94853 + 584). (As in this example, this process can count files more than once!)

Find all of the directories with a total size of at most 100000. What is the sum of the total sizes of those directories?
*/