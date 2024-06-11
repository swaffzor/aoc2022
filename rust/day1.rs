use std::fs;
use std::io;

/*
The Result type has two variant enum constructors, Ok and Err, which are used to create Result values that represent success or failure, respectively. The Ok variant takes a single value of the type T, and the Err variant takes a single value of the type E

The ? operator is a convenient way to handle errors in Rust. It is used to propagate an Err value from a Result up the call stack to the caller of the function. This allows the caller to handle the error without having to explicitly check for errors in the function body.

The ? operator can only be used in functions that have a return type of Result or Option. When used in a Result value, the ? operator will automatically return an Err value if the Result is an Err, or it will return the Ok value if the Result is an Ok. This can make error-handling code cleaner and more concise.
*/
fn read_file(path: &str) -> io::Result<String> {
    let contents = fs::read_to_string(path)?; // ? at end will throw error up stack
    Ok(contents)
}

/*
1000
2000
3000

4000

5000
6000

7000
8000
9000

10000
This list represents the Calories of the food carried by five Elves:

The first Elf is carrying food with 1000, 2000, and 3000 Calories, a total of 6000 Calories.
The second Elf is carrying one food item with 4000 Calories.
The third Elf is carrying food with 5000 and 6000 Calories, a total of 11000 Calories.
The fourth Elf is carrying food with 7000, 8000, and 9000 Calories, a total of 24000 Calories.
The fifth Elf is carrying one food item with 10000 Calories.
In case the Elves get hungry and need extra snacks, they need to know which Elf to ask: they'd like to know how many Calories are being carried by the Elf carrying the most Calories. In the example above, this is 24000 (carried by the fourth Elf).

Find the Elf carrying the most Calories. How many total Calories is that Elf carrying?

Your puzzle answer was 70116.
*/

fn main() -> io::Result<()> {
    let contents = read_file("day1.input.txt")?; // will throw error to caller
    println!("part 1: {}", part1(&contents));
    Ok(())
}

/*
It is generally recommended to use reference types for function parameters in Rust if you don't need to modify the parameter value in the function body. Using reference types for function parameters allows you to avoid copying the parameter value, which can be more efficient and can also prevent problems with parameter values that are too large to be copied.

In Rust, a reference is a type of pointer that refers to the memory location of a value, rather than the value itself. You can create a reference to a value by using the & operator in front of the value. For example, if you have a variable x with the value 5, you can create a reference to x with the expression &x.
*/
fn part1(calories: &String) -> i32 {
    let elfs: Vec<&str> = calories.split("\n\n").collect(); // vector, see note A
    // println!("elfs: {:?}", elfs);

    let mut elf_calories: Vec<i32> = vec![0];
    for calories in elfs {
        let temp = calories
            .lines() // sugar for .split("\n"), creates an Iterator
            .map(|item| item.trim().parse::<i32>().unwrap()) // Iterator.map, see note B
            .sum::<i32>();
        elf_calories.push(temp);
        // println!("temp: {:?}", temp);
    }
    return *elf_calories.iter().max().unwrap(); // * borrow the value, convert to iterator, find the max value, return safe value
}
/* 
  Notes
  A:
  In Rust, Vec (short for vector) is a type that is used to store a sequence of values with a variable length. Vec values are allocated on the heap, which means that they are stored in a dynamically-allocated chunk of memory that is separate from the stack.

  Allocating a Vec value on the heap has several advantages over allocating it on the stack. For one, it allows the Vec value to grow and shrink in size dynamically, without having to specify a fixed size at the time it is created. This makes Vec values more flexible and easier to work with than other types that have a fixed size.

  Another advantage of allocating a Vec value on the heap is that it can store values of any size, whereas values that are allocated on the stack are limited in size by the amount of available stack space. This means that a Vec value can be used to store large amounts of data, such as a large collection of objects or a very long string.

  Finally, allocating a Vec value on the heap can make it easier to share the value between different parts of a program, since the value can be stored in a location that is accessible to all parts of the program.

  In general, it is recommended to use Vec values to store collections of data that are variable in size or that are large in size. Using Vec values can make your code more flexible and efficient, and it can also make it easier to work with large amounts of data.

  B:
  The map method is a higher-order function that is defined on the Iterator trait, which means that it can be called on any type that implements the Iterator trait. This includes many common types in Rust, such as Vec, String, and Range.

  The map method takes a function as its argument, and it applies that function to each element in the iterator. The function that is passed to map is called a closure, and it can be defined inline using the || syntax.
  */