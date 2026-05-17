export const nodes = [
    { id: "n1", text: "C" },
    { id: "n2", text: "About C" },
    { id: "n3", text: "I/O in C" },
    { id: "n4", text: "Datatypes and Variables" },
    { id: "n5", text: "Operators" },
    { id: "n6", text: "Conditionals" },
    { id: "n7", text: "Array" },
    { id: "n8", text: "Strings" },
    { id: "n9", text: "Iteration" },
    { id: "n10", text: "Functions" },
    { id: "n11", text: "Pointer" },
    { id: "n12", text: "User Defined Datatype" },
    { id: "n13", text: "Memory Allocation" },
    { id: "n14", text: "File Handling" },
];
export const subnodes = [
    {
        id: "s1",
        parentId: "n2",
        text: "Why C?",
        isSubnode: true,

        // YouTube links
        link: [
            "  https://youtu.be/EvlIWIu8_zk?si=RZuXSB6a2bUSU4A0 "
        ],

        // Long formatted content split into array of paragraphs
        content: [
            `The "Why C?" module aims to explain the importance of learning
    the C programming language and why it remains one of the most
    relevant languages in the world of computer science and software
    development. Although newer programming languages such as Python,
    Java, and C++ have gained popularity, C continues to be the
    foundation of programming because of its speed, efficiency, and
    direct access to memory.`,

            `C is often called the "mother of all programming languages" because
    most modern languages either derive concepts from C or are directly
    influenced by it. For example, the syntax of C-like languages such as
    C++, Java, and C# is heavily inspired by C. This means that learning C
    first makes it easier to transition to other languages in the future.`,

            `Another strong reason to learn C is performance. Programs written in
    C are compiled into machine code and run extremely fast compared
    to many interpreted languages. This is why operating systems like
    UNIX, Linux, and even parts of Windows are written in C. Embedded
    systems, firmware, drivers, and performance-critical applications
    continue to rely on C because of its control over hardware resources.`,

            `C also teaches programmers how computers work internally. By
    understanding concepts like pointers, memory allocation, and low-level
    operations, students gain insights into how data is stored and
    manipulated at the hardware level. This is an essential skill for
    aspiring system programmers, embedded engineers, or anyone
    interested in building efficient applications.`,

            `Moreover, C provides the perfect balance between high-level
    programming (readable and structured) and low-level programming
    (close to machine instructions). It helps students build a strong
    foundation in problem-solving and algorithmic thinking. Learning C
    first ensures that when you later learn higher-level languages, you
    have a deep understanding of what happens behind the scenes.`,

            `Finally, the simplicity of C makes it a great starting point for
    beginners. Despite its simplicity, it is powerful enough to handle
    complex tasks. By learning C, students not only acquire a programming
    language but also a way of thinking that will be useful throughout
    their careers in computer science and engineering.`
        ],

        // compiler disabled
        compiler: false,
        question: []
    }
    ,
    {
        id: "s2",
        parentId: "n2",
        text: "Insights of C",
        isSubnode: true,

        // YouTube link(s)
        link: [
            "  https://youtu.be/lMvFWKHhVZ0?si=VllQLia4xhS_bxQR"
        ],

        // Long formatted content (~1 page style)
        content: [`The "Insights of C" module provides a deeper understanding of
the internal workings and unique features of the C programming
language. While introductory modules such as "Why C?" focus on
motivation and "Basic C" teaches syntax and fundamentals, this
section is about exploring what makes C special, how it operates
under the hood, and why it remains essential even today.`,

            `One of the most important insights into C is its close connection
to hardware. Unlike many high-level languages that abstract away
memory and execution details, C exposes the programmer to
low-level concepts such as pointers, manual memory management,
and direct bit-level manipulation. This not only provides fine-grained
control but also helps programmers understand how a computer
actually processes data at the machine level.`,

            `Another powerful feature of C is its portability combined with speed.
C programs can be compiled and executed on a wide range of
platforms without significant modification. This is one of the reasons
why C is used in operating systems, device drivers, and embedded
systems. At the same time, the efficiency of compiled C code makes
it one of the fastest languages in practice.`, `

C also enforces disciplined programming habits. Because the
language is relatively minimalistic, programmers must pay attention
to details like memory allocation, type safety, and error handling.
Although this may appear challenging for beginners, it develops a
solid foundation for mastering advanced languages and software
engineering practices.
`, `
Another insight is that C encourages modular programming. Through
the use of functions, header files, and libraries, programs can be
organized into smaller, reusable components. This structure not only
makes code more readable but also aligns with industry practices
where maintainability and scalability are critical.
`, `
Finally, C’s simplicity is deceptive—it appears small and easy to
learn, yet mastering it requires a deep understanding of its concepts.
This dual nature makes it both a beginner-friendly language and a
powerful tool for expert-level programming. By learning the insights
of C, students gain the ability to appreciate its elegance, identify its
strengths, and apply its concepts effectively in both academic and
real-world projects. `, `

By the end of this module, you will not only understand how to write
programs in C but also why C behaves the way it does, giving you a
much clearer vision of programming at its core.`],

        // compiler disabled
        compiler: false,
        question: []
    }, {
        id: "s3",
        parentId: "n2",
        text: "How Languages Work",
        isSubnode: true,

        // YouTube link(s)
        link: [
            "https://youtu.be/97i2BAUw5Xc?si=8AvAZZI0uIsPdUJq"
        ],

        // Long formatted content (~1 page style)
        content: [`The "How Languages Work" module focuses on building an
understanding of the principles behind programming languages,
their design, and how they function internally. While learning
a specific language like C is important for writing code,
understanding the broader concept of how languages work
equips learners with the ability to adapt quickly to new
languages and frameworks.`,
            `Programming languages serve as the medium of communication
between humans and computers. At their core, they translate
human-readable instructions into machine code that the CPU can
execute. This module introduces the different levels of programming
languages, from low-level assembly and machine code to high-level
languages like C, Python, and Java. Students will learn how
compilers and interpreters bridge the gap between source code
and machine instructions.
`, `
Key concepts such as syntax, semantics, and grammar are
explored in detail. Syntax defines the structure of valid statements,
semantics defines the meaning of those statements, and grammar
rules ensure consistency. Through examples, learners will see how
similar constructs (like loops or conditionals) can exist across
different languages but with varying syntax. `, `

This module also provides insights into how languages manage
resources such as memory. For example, languages like C give
programmers explicit control, while higher-level languages handle
memory automatically through garbage collection. Understanding
these differences helps learners appreciate trade-offs between
control and convenience. `, `

Another important aspect is paradigms of programming. The
module introduces procedural, object-oriented, and functional
programming styles, showing how different languages emphasize
different problem-solving approaches. Recognizing these paradigms
prepares learners for real-world scenarios where choosing the right
language or paradigm can make development faster and more
efficient. `, `

By the end of this module, students will have gained a conceptual
map of programming languages, enabling them to see beyond
syntax and focus on the underlying logic of problem-solving. This
knowledge not only strengthens their grasp of C but also makes it
easier to learn and transition to other languages in the future.`],

        // compiler disabled
        compiler: false,
        question: []
    }
    ,
    {
        id: "s4",
        parentId: "n2",
        text: "Basic C",
        isSubnode: true,

        // multiple YouTube links
        link: [
            "https://youtu.be/PrVOM7M5nEY?si=Q0Rt94_sli05akYW",
            "https://youtu.be/PrVOM7M5nEY?si=Q0Rt94_sli05akYW"
        ],

        // long formatted content (~1 page style)
        content: [`The "Basic C" module is designed to provide learners with a
comprehensive introduction to one of the most powerful and widely
used programming languages in computer science. C has been the
foundation of countless modern programming languages, operating
systems, and software applications. By learning C at the basic level,
students develop a solid programming mindset that emphasizes
efficiency, logical structuring, and problem-solving skills. `, `

In this module, you will begin by exploring the fundamental building
blocks of the C language, starting with variables, constants, and data
types such as int, float, char, and double. We will cover operators,
including arithmetic, relational, logical, and bitwise operators, along
with practical examples to help you master their applications. `, `

Control structures form the heart of programming, and this module
guides you through conditional statements (if, if-else, nested if, and
switch) and looping constructs (for, while, and do-while). You will
learn not just their syntax, but also how to use them in solving
real-world computational problems. Functions, one of the most
important aspects of structured programming, will also be explored.
We will discuss function declaration, definition, calling, and
parameter passing (both by value and by reference). Recursion will
be introduced to help you understand how problems can be solved by
breaking them down into smaller sub-problems.
`, `
Another critical topic in this module is arrays. You will learn how to
declare, initialize, and manipulate arrays, including single-dimensional
and multi-dimensional arrays. Arrays are essential for handling large
volumes of data efficiently, and many exercises will focus on
practical use-cases like searching, sorting, and matrix operations.
`, `
Pointers, a defining feature of C, will also be introduced. Although
challenging at first, pointers are extremely powerful for memory
management and efficiency. We will study pointer basics, pointer
arithmetic, and their relation to arrays and functions. Dynamic
memory allocation using malloc, calloc, and free will be explained in
detail, preparing you for advanced programming concepts.
`, `
By the end of this module, you will be able to write, compile, and
debug C programs confidently. The goal is not only to make you
familiar with the syntax but also to train you in problem-solving using
C. The skills developed here will be crucial for learning advanced
topics such as data structures, algorithms, and system programming.
`, `
The exercises in this module are carefully designed to balance
theory and practice, ensuring that you not only understand the
concepts but also apply them effectively to real coding problems.`],

        // compiler enabled
        compiler: true,

        // only 1–2 coding questions
        question: [
            "Write a C program to calculate the factorial of a number using recursion.",
            "Implement a program to reverse a string without using built-in functions."
        ]
    },
    {
        id: "s5",
        parentId: "n3",
        text: "Output",
        isSubnode: true,

        // YouTube link(s)
        link: [
            "https://youtu.be/ycKZKDCMMzM?si=5J1tdUbvzj1DmO4C"
        ],

        // Long formatted content (~1 page style)
        content: [`The "Output" module introduces students to one of the most
fundamental aspects of programming in C—displaying information
to the user. Output operations are crucial because they provide a way
for programs to communicate results, messages, and data to the
outside world. Without output, a program would simply perform
internal computations without any visible result.`, `

In C, the most commonly used function for output is printf(), which
is part of the standard input-output library stdio.h. This module
explains the structure of the printf() function, including the format
string and placeholders for variables. Students will learn how to
display integers, floating-point numbers, characters, and strings
using appropriate format specifiers such as %d, %f, %c, and %s. `, `
A key part of mastering output in C is understanding formatting.
Learners will practice controlling the width, precision, and alignment
of output, which is especially important when displaying tabular
data or aligning values neatly. For instance, printing floating-point
numbers to two decimal places or right-aligning text in fixed-width
columns are common tasks that can be achieved with format
specifiers. `, `

This module also highlights escape sequences such as \n for
newline, \t for tab, and \\\\ for printing a backslash. These sequences
enable developers to control the layout of text output, making it
clearer and more user-friendly. `, `

In addition, students will explore how output functions are essential
for debugging. By inserting temporary printf() statements into a
program, developers can trace the values of variables at different
points, helping them identify logic errors or unexpected behavior.
`, `
By the end of this module, learners will be comfortable with using
printf() to display different types of data, apply formatting options,
and make programs more interactive and user-friendly. This
knowledge serves as the foundation for building larger applications
where structured and meaningful output is critical.`],

        // compiler enabled
        compiler: true,
        question: [
            "Write a C program to print a multiplication table of a given number.",
            "Write a C program that displays the sum, average, and product of three integers entered by the user."
        ]
    }
    , {
        id: "s6",
        parentId: "n3",
        text: "Input",
        isSubnode: true,

        // YouTube link(s)
        link: [
            "https://youtu.be/EA8K2d3USDc?si=7rESpSqH5lfm1x-f"
        ],

        // Long formatted content (~1 page style)
        content: [`The "Input" module focuses on teaching how to accept data
from the user in a C program. Input is just as important as output
because it allows users to provide values that can change the
behavior and results of a program dynamically. Without input,
programs would only run with hardcoded values, limiting their
usefulness and flexibility. `,

            `In C, the most commonly used function for input is scanf(), which
is part of the standard input-output library stdio.h. This module
explains how scanf() works, including the use of format specifiers
to match variable types. Students will learn how to take input for
integers, floating-point numbers, characters, and strings using %d,
%f, %c, and %s respectively. `,

            `A key concept in input handling is the use of the address-of operator
(&). Since scanf() needs to modify the values of variables, it requires
their memory addresses. Beginners often make mistakes by omitting
&, which leads to incorrect behavior. This module provides several
examples to help clarify this concept. `,

            `Students will also explore limitations of scanf(), such as difficulties
when reading strings with spaces, and will be introduced to safer
alternatives like fgets() for string input. Best practices for validating
user input and preventing errors or unexpected behavior will also
be discussed. `, `

Another important insight is how input and output work together.
For example, a program may ask the user to enter two numbers
(input), perform arithmetic operations on them (processing), and
then display the result (output). This cycle forms the basis of most
interactive applications. `, `

By the end of this module, learners will have a solid grasp of how
to use scanf() and related functions effectively, understand the
importance of using & correctly, and apply best practices for
handling different types of user input.`],

        // compiler enabled
        compiler: true,
        question: [
            "Write a C program to take two numbers as input from the user and display their sum and product.",
            "Write a C program to read a string from the user and print its length."
        ]
    }
    , {
        id: "s7",
        parentId: "n4",
        text: "Variables",
        isSubnode: true,

        // YouTube link(s)
        link: [
            "https://youtu.be/ghCbURMWBD8?si=R8RS5lFlwLCRCY99"
        ],

        // Long formatted content (~1 page style)
        content: [`The "Variables" module introduces one of the most fundamental
concepts in C programming—storing and managing data in memory
using variables. A variable acts as a named storage location that holds
a value which can be modified during program execution. Without
variables, programs would not be able to handle dynamic input or
store intermediate results.`, `

This module begins by explaining the rules for declaring variables
in C. Every variable must be declared with a type, such as int for
integers, float for decimal numbers, char for single characters, or
double for high-precision floating-point values. The type determines
the amount of memory allocated and the range of values that the
variable can hold. For example, an int typically occupies 4 bytes and
can store whole numbers within a fixed range.`, `

The importance of variable naming rules is emphasized. A valid
variable name must start with a letter or underscore, cannot contain
spaces or special symbols, and must not conflict with reserved
keywords in C. Meaningful variable names are encouraged for
readability and maintainability of code.`, `

The module also explains initialization of variables, which refers to
assigning an initial value at the time of declaration. If variables are
not initialized, they may hold garbage values, leading to unexpected
behavior. Learners will practice declaring and initializing different
types of variables with practical coding examples.`, `

Another important concept covered is scope and lifetime of
variables. The scope determines where a variable can be accessed
within a program, such as local variables inside functions or global
variables accessible across the entire program. Lifetime refers to how
long a variable exists in memory before being destroyed. These ideas
help programmers understand how memory is managed efficiently
in C.`, `

By the end of this module, students will understand the role of
variables in programming, how to declare and initialize them
properly, and how their scope and lifetime affect program behavior.
Mastering variables is the first step toward building more complex
logic, as they form the building blocks for storing and manipulating
data.`],

        // compiler enabled
        compiler: true,
        question: [
            "Write a C program to declare and initialize variables of different data types and display their values.",
            "Write a C program that swaps the values of two variables without using a third variable."
        ]
    }
    , {
        id: "s8",
        parentId: "n4",
        text: "Datatypes",
        isSubnode: true,
        // YouTube link(s)
        link: [
            "https://youtu.be/sARaqR0hRI4?si=TmYwpa8mY9Zt6OD9"
        ],

        // Long formatted content (~1 page style)
        content: [
            `The "Datatypes" module introduces one of the most fundamental concepts in the C programming language: how different types of data are represented, stored, and manipulated. Understanding datatypes is crucial because it determines the kind of operations that can be performed on variables, as well as the amount of memory they occupy.`,

            `In C, the basic data types include:
    - int: used to store integers (whole numbers). Typically requires 2 or 4 bytes depending on the system.
    - float: used for single-precision floating-point numbers (decimal values).
    - double: used for double-precision floating-point numbers, providing more accuracy than float.
    - char: used to store a single character, typically requiring 1 byte.
    - void: represents the absence of a value, often used in functions that do not return anything.`,

            `Modifiers such as short, long, signed, and unsigned can be applied to basic datatypes to change their range and storage size. For example, unsigned int allows only non-negative values but effectively doubles the upper range.`,

            `The module also explains the concept of type qualifiers like const, volatile, and static, which further control how variables behave and are stored.`,

            `Students will explore examples showing how different datatypes are declared and used, how memory requirements vary, and why choosing the right datatype is important for writing efficient and error-free programs. Misuse of datatypes can lead to overflow, precision errors, or unexpected program behavior.`,

            `By the end of this module, learners will be comfortable declaring variables with appropriate datatypes, understand how to select the right type for a given problem, and recognize common pitfalls related to datatypes in C programming.`
        ],

        // compiler enabled
        compiler: true,

        // Practice questions
        question: [
            "Write a C program to declare variables of int, float, char, and double types and print their sizes using sizeof().",
            "Write a C program to demonstrate the difference between signed and unsigned integers by printing their ranges."
        ]
    }
    , {
        id: "s9",
        parentId: "n5", text: "Operator",
        link: ["https://youtu.be/V4Wwuu05_t4?si=DpDH8VeZhly2mND7"],
        isSubnode: true,
        compiler: "yes",
        content: [
            "Operators are broadly classified into several categories based on their functionality. Arithmetic Operators (+, -, *, /, %) handle basic mathematical calculations such as addition, subtraction, multiplication, division, and modulus (which gives the remainder of a division). These are fundamental for performing numeric computations in programs.",
            "Relational Operators (==, !=, >, <, >=, <=) are used to compare values. The results of these operations are Boolean values - true (1) or false (0). These operators are essential for making decisions in control flow statements and loops.",
            "Logical Operators (&&, ||, !) combine or invert conditions and are widely used in decision-making constructs. The AND operator (&&) returns true only if both conditions are true, while the OR operator (||) returns true if at least one condition is true. The NOT operator (!) inverts the truth value of a condition.",
            "Assignment Operators (=, +=, -=, *=, /=, %=) are used to assign values to variables. The compound assignment operators combine arithmetic operations with assignment, providing shorthand notation for common operations like incrementing or modifying values.",
            "Increment and Decrement Operators (++ and --) provide a concise way to increase or decrease a variable's value by 1. These operators can be used in both prefix (before variable) and postfix (after variable) forms, with different evaluation behaviors in expressions.",
            "Bitwise Operators (&, |, ^, ~, <<, >>) perform operations at the binary level, making them crucial for low-level programming, device drivers, and optimization tasks. These operators work directly on the bits of integer values.",

            "The Conditional or Ternary Operator (?:) offers a compact alternative to if-else statements, allowing inline decision making. Special operators include sizeof for determining memory size, pointer operators (* and &) for memory management, and the comma operator for evaluating multiple expressions.",

            "Understanding operator precedence and associativity is crucial as it determines the evaluation order in complex expressions. Multiplication and division have higher precedence than addition and subtraction, and operators with the same precedence follow specific associativity rules.",

            "Mastering operators is essential for writing efficient and readable C programs, as they enable you to build conditions, control program flow, perform calculations, and handle data manipulation at various levels."
        ],
        question: [
            "Write a C program that takes two integers as input and prints their sum, difference, product, and quotient using arithmetic operators.",
            "Write a C program that checks if a given number is divisible by both 3 and 5 using logical and relational operators."
        ]
    }
    , {
        id: "s10",
        parentId: "n5",
        position: {
            top: 920,
            left: "27%"
        },
        text: "Control Statements",
        link: [
            "https://youtu.be/YiPoFeWrSYY"
        ],
        isSubnode: true,
        compiler: true,
        content: [
            "Control statements in C are constructs that give you the power to decide the flow of execution of your program. Without control statements, every program would just execute line by line in sequence, which is often not enough for solving real-world problems.",
            "Control statements help in making decisions, repeating tasks, and jumping to specific parts of code, thereby giving programmers full control over execution. They are broadly classified into three categories: decision-making statements, looping statements, and jump statements.",
            "Decision-making statements allow programs to take different paths based on conditions. The if statement executes a block of code if a given condition is true, while the if-else statement provides two alternative paths. Nested if statements allow more complex decision-making, and the if-else-if ladder provides a chain of conditions. The switch-case statement compares a variable against different constant values.",
            "Looping statements allow repetitive execution of a block of code. The for loop is used when the number of iterations is known beforehand, with syntax that includes initialization, condition, and update in one line. The while loop executes as long as a condition is true, useful when iterations aren't predetermined. The do-while loop ensures the loop body executes at least once before checking the condition.",
            "Jump statements allow control to jump to other parts of the program. The break statement exits from a loop or switch immediately. The continue statement skips the remaining code in the current iteration. The goto statement provides an unconditional jump, though its usage is discouraged. The return statement ends function execution and optionally returns a value.",
            "Understanding control statements is vital because they allow programs to react to input, repeat necessary tasks, and handle complex decision-making. A key concept is nesting control statements: combining loops inside conditions, or conditions inside loops, which gives programmers flexibility to model complex real-world logic.",
            "Control statements form the backbone of logic in C programming, transforming simple code into intelligent, decision-driven applications used in everything from banking systems to game development."
        ],
        question: [
            "Write a C program that takes an integer input and checks whether it is positive, negative, or zero using if-else statements.",
            "Write a C program that prints the multiplication table of a given number using a for loop."
        ]
    }
    , {
        id: "s11",
        parentId: "n6",
        text: "Switch Statement",
        isSubnode: true,
        link: [
            "https://youtu.be/-JMSaLRqsgo?si=D9B8rj-R6mEcJLD5"
        ],
        content: `The "Switch Statement" module introduces a powerful control flow mechanism in C programming that allows for efficient multi-way branching. Unlike if-else ladders which can become cumbersome with many conditions, the switch statement provides a cleaner and more readable way to handle multiple cases based on the value of an expression.

A switch statement evaluates an integer or character expression and compares it against constant case labels. When a match is found, the code block for that case is executed. The break statement is crucial within switch cases; it terminates the switch block and prevents fall-through to subsequent cases. Without break, execution will continue to the next case, which is sometimes intentionally used for multiple cases sharing the same code.

The syntax of a switch statement includes:
- The switch keyword followed by the controlling expression in parentheses
- Multiple case labels, each with a constant value and a colon
- A default case (optional) that handles values not matching any case

Key points covered in this module:
1. The expression in switch must be of integer type (int, char) or enumerated type
2. Case values must be compile-time constants and unique
3. The default case is executed if no other case matches
4. Nesting of switch statements is allowed but should be used judiciously

Common use cases include menu-driven programs, state machines, and handling command-line options. The module also covers best practices and common pitfalls to avoid when using switch statements.`,
        compiler: true,
        question: [
            "Write a C program that uses a switch statement to print the day of the week based on a number (1-7)",
            "Implement a simple calculator using switch case to perform addition, subtraction, multiplication, and division"
        ]
    }
    , {
        id: "s12",
        parentId: "n7",
        text: "Array",
        link: [
            "https://www.youtube.com/watch?v=qKFBtCPwjgI&list=PLu0W_9lII9aiXlHcLx-mDH1Qul38wD3aR&index=23"
        ],
        isSubnode: true,
        compiler: true,
        content: [
            "Arrays are declared by specifying the data type, array name, and size in square brackets. For example, 'int numbers[5];' declares an integer array that can store 5 elements. Array elements are accessed using indices starting from 0, making the first element at index 0 and the last at size-1.",

            "Arrays can be initialized during declaration using curly braces, such as 'int numbers[5] = {1, 2, 3, 4, 5};'. If fewer values are provided than the array size, remaining elements are automatically initialized to zero.",

            "Multi-dimensional arrays, particularly 2D arrays, are used to represent matrices and tables. They are declared with multiple sets of brackets, like 'int matrix[3][3];', and can be visualized as arrays of arrays.",

            "Arrays are particularly useful for storing and processing large amounts of data efficiently. They form the basis for many algorithms and data processing tasks, including sorting, searching, and mathematical operations on data sets.",

            "Understanding array bounds is crucial - C does not perform bounds checking, so accessing elements outside the declared size can lead to undefined behavior and memory corruption. Proper array handling is essential for writing safe and efficient C programs.",

            "Arrays work seamlessly with loops, allowing programmers to process multiple elements efficiently. This combination is fundamental for solving complex problems in data manipulation and algorithm implementation.",

            "Character arrays (strings) in C are null-terminated, meaning they end with a '\\0' character. This allows string manipulation functions to determine the end of the string without knowing its exact length in advance.",

            "Arrays can be passed to functions either by passing individual elements or by passing the entire array. When passing entire arrays, they are passed by reference, meaning any modifications made in the function affect the original array.",

            "Dynamic memory allocation functions like malloc() and calloc() allow creating arrays whose size is determined at runtime, providing flexibility when the required array size isn't known during compilation.",

            "Array names act as pointers to the first element of the array. This means array elements can be accessed using pointer arithmetic, providing an alternative to index-based access.",

            "Common array operations include traversing, inserting, deleting, searching, and sorting elements. Mastering these operations is essential for effective array manipulation in C programming."],
        question: [
            "Write a C program to find the largest element in an integer array",
            "Write a C program to reverse the elements of an array without using a second array"
        ]
    }
    ,
    {
        id: "s13",
        parentId: "n8",
        text: "String",
        link: [
            "https://youtu.be/fltaqGek-oA?si=n_ZvzlsFo_eKOwqh"
        ],
        isSubnode: true,
        compiler: true,
        content: [
            "Strings in C are implemented as arrays of characters terminated by a null character '\\0'. This null termination is crucial as it indicates the end of the string and allows string functions to work correctly.",

            "Strings can be declared and initialized in multiple ways: using character arrays like 'char str[6] = {'H','e','l','l','o','\\0'};' or using string literals like 'char str[] = \"Hello\";'. The compiler automatically adds the null terminator when using string literals.",

            "C provides a rich set of string handling functions in the string.h header file, including strlen() for length, strcpy() for copying, strcat() for concatenation, strcmp() for comparison, and strstr() for finding substrings.",

            "String input can be taken using functions like scanf(), gets(), and fgets(). However, gets() is unsafe as it doesn't check buffer boundaries, while fgets() is preferred for safe input as it limits the number of characters read.",

            "Strings in C are mutable - their individual characters can be modified after declaration. However, string literals stored in read-only memory cannot be modified and attempting to do so will cause runtime errors.",

            "Common string operations include finding length, copying, concatenating, comparing, reversing, converting case, and searching for substrings or characters. These operations form the basis of text processing in C.",

            "Understanding pointer arithmetic with strings is important since array names act as pointers to the first character. This allows efficient string manipulation using pointer operations instead of array indexing.",

            "Multi-byte characters and Unicode strings require special handling in C. The wchar_t data type and corresponding wide character functions are used for internationalization and handling extended character sets.",

            "String manipulation is fundamental for applications like text processing, file handling, user input validation, and data parsing. Proper string handling prevents common vulnerabilities like buffer overflows."
        ],
        question: [
            "Write a C program to find the length of a string without using strlen() function",
            "Write a C program to check if a string is palindrome"
        ]
    }, {
        id: "s14",
        parentId: "n8",
        text: "String Functions",
        link: [
            "https://youtu.be/L2aTSqTcJs8?si=Lial_wxMV_CXJuYf"
        ],
        isSubnode: true,
        compiler: true,
        content: [
            "String functions in C are essential built-in operations that help manipulate and work with character arrays (strings). Since C treats strings as null-terminated character arrays, these functions provide convenient ways to handle common string operations.",

            "The string.h header file contains most standard string functions. Some of the most commonly used functions include strlen() for finding string length, strcpy() for copying strings, strcat() for concatenating strings, and strcmp() for comparing two strings.",

            "strlen() returns the number of characters in a string excluding the null terminator. strcpy() copies the entire source string to the destination, including the null terminator. strcat() appends the source string to the end of the destination string.",

            "strcmp() compares two strings lexicographically and returns 0 if they are equal, a negative value if the first string is less than the second, and a positive value if the first string is greater.",

            "Other important functions include strchr() for finding the first occurrence of a character, strstr() for finding a substring within a string, and strtok() for tokenizing strings based on delimiters.",

            "These functions are crucial for efficient string manipulation and form the foundation of text processing in C programs. Understanding their proper usage helps prevent common errors like buffer overflows and memory corruption."
        ],
        question: [
            "Write a C program that uses string functions to concatenate two strings and find the length of the result",
            "Write a C program that compares two strings and displays which one comes first alphabetically"
        ]
    }, {
        id: "s15",
        parentId: "n9",
        text: "For loop",
        link: [
            "https://youtu.be/T5_qpdDtTZ0?si=zaCwiQe6vilrbUzZ"
        ],
        isSubnode: true,
        compiler: true,
        content: [
            "The for loop is one of the most fundamental and widely used looping constructs in C programming. It provides a compact way to execute a block of code repeatedly for a specific number of iterations.",

            "The syntax consists of three main parts: initialization, condition, and increment/decrement, all separated by semicolons and enclosed in parentheses. The initialization expression executes once at the beginning, the condition is checked before each iteration, and the increment expression executes after each iteration.",

            "For loops are particularly useful when the number of iterations is known in advance, such as when processing arrays, generating sequences, or performing mathematical calculations that require a fixed number of repetitions.",

            "Nested for loops allow handling multi-dimensional data structures like matrices and tables. The inner loop completes all its iterations for each iteration of the outer loop, making them essential for 2D array processing.",

            "The flexibility of for loops extends to various increment patterns - they can count upward, downward, or even use custom step values. This makes them suitable for diverse programming scenarios from simple counting to complex algorithmic implementations.",

            "For loops can be controlled using break and continue statements. The break statement exits the loop entirely, while continue skips the current iteration and moves to the next one, providing fine-grained control over loop execution.",

            "Understanding for loops is crucial for efficient programming as they form the backbone of many algorithms including sorting, searching, and mathematical computations that require repetitive operations on data sets."
        ],
        question: [
            "Write a C program to print all even numbers from 1 to 50 using a for loop",
            "Write a C program to calculate the factorial of a number using a for loop"
        ]
    }, {
        id: "s16",
        parentId: "n9",
        text: "While",
        link: [
            "https://youtu.be/0KzWpgMLDmk?si=j55W9RxwfgijewLd"
        ],
        isSubnode: true,
        compiler: true,
        content: [
            "The while loop in C is a fundamental control flow statement that allows repeated execution of a code block as long as a specified condition remains true. It is particularly useful when the number of iterations is not known in advance and depends on dynamic conditions.",

            "The syntax consists of the 'while' keyword followed by a condition in parentheses and a code block. The condition is evaluated before each iteration - if true, the loop body executes; if false, the loop terminates and control passes to the next statement.",

            "While loops are ideal for situations where you need to process data until a certain condition is met, such as reading input until a specific value is encountered, or processing elements until the end of a data stream is reached.",

            "It's crucial to ensure that the loop condition eventually becomes false to avoid infinite loops. This typically involves modifying variables within the loop body that affect the condition evaluation.",

            "While loops can be nested within other control structures and can also contain other control statements like break (to exit immediately) and continue (to skip to the next iteration).",

            "Unlike the for loop, the while loop doesn't have built-in initialization and update expressions, making it more flexible for complex looping conditions that don't follow a simple counter pattern.",

            "Proper use of while loops is essential for tasks like input validation, menu-driven programs, and processing data of unknown length, making them a versatile tool in C programming."
        ],
        question: [
            "Write a C program that uses a while loop to calculate the sum of digits of a given number",
            "Write a C program that uses a while loop to find the first 10 even numbers"
        ]
    }, {
        id: "s17",
        parentId: "n9",
        text: "Do While Loop",
        link: [
            "https://youtu.be/S2z0OTZoziI?si=Z-ejJCIeaZiSyV2t"
        ],
        isSubnode: true,
        compiler: true,
        content: [
            "The do-while loop in C is a post-test loop that guarantees at least one execution of the loop body before checking the condition. Unlike while and for loops that check conditions first, the do-while loop executes the code block first and then evaluates the condition.",

            "The syntax consists of the 'do' keyword followed by the loop body in curly braces, and then the 'while' keyword with a condition in parentheses followed by a semicolon. The loop continues executing as long as the condition remains true after each iteration.",

            "Do-while loops are particularly useful for menu-driven programs where you want to display a menu at least once and then continue based on user input. They're also ideal for input validation scenarios where you need to prompt the user for input and then validate it.",

            "This loop structure ensures that the loop body executes minimally once, even if the condition is initially false. This characteristic makes it different from other loops and determines its specific use cases in programming.",

            "Common applications include user interface interactions, game loops, and any scenario where an operation must be performed at least once before checking for continuation conditions.",

            "It's important to include a mechanism within the loop body that can eventually make the condition false to avoid infinite loops. This typically involves modifying variables used in the condition expression."
        ],
        question: [
            "Write a C program using do-while loop to print numbers from 1 to 10",
            "Create a menu-driven program using do-while that continues until user chooses to exit"
        ]
    }, {
        id: "s18",
        parentId: "n9",
        text: "Loop Basics",
        link: [
            "https://youtu.be/A_IgufxmIHk?si=0VgafVNpofeGGvn3"
        ],
        isSubnode: true,
        compiler: true,
        content: [
            "Loops in programming are control structures that allow you to execute a block of code repeatedly until a specific condition is met. They are essential for automating repetitive tasks and processing collections of data efficiently.",
            "There are three main types of loops in C: for loops, while loops, and do-while loops. Each type serves different purposes and has its own syntax and use cases.",
            "For loops are ideal when you know exactly how many times you want to execute a block of code. They consist of initialization, condition check, and increment/decrement expressions in a single line.",
            "While loops continue executing as long as a specified condition remains true. They are useful when the number of iterations is not known in advance and depends on dynamic conditions.",
            "Do-while loops are similar to while loops but guarantee that the code block executes at least once, as the condition is checked after the first execution.",
            "Loop control statements like break and exit the loop immediately, while continue skips the current iteration and moves to the next one. These statements provide additional control over loop execution.",
            "Nested loops (loops within loops) are used for handling multi-dimensional data structures and complex patterns. They are commonly used in matrix operations and pattern printing programs.",
            "Understanding loop efficiency is crucial for writing optimized code. Avoiding infinite loops and minimizing unnecessary iterations are key aspects of good loop design.",
            "Loops form the backbone of many algorithms including searching, sorting, and mathematical computations. Mastering loops is essential for solving complex programming problems."
        ],
        question: [
            "Write a C program to print numbers from 1 to 10 using a for loop",
            "Write a C program to calculate the sum of first N natural numbers using a while loop"
        ]
    }, {
        id: "s19",
        parentId: "n10",
        text: "Function",
        link: [
            "https://youtu.be/Npo1u37lcg8?si=I7iAICYODlUGRGMd"

        ],
        isSubnode: true,
        compiler: true,
        content: [
            "Functions in C are self-contained blocks of code that perform specific tasks and can be reused throughout a program. They help in organizing code into logical segments, making programs more modular, readable, and maintainable.",

            "Every C program has at least one function - the main() function, which serves as the program's entry point. Functions are declared with a return type, name, and parameters (if any), followed by a body containing the executable code.",

            "Functions can be categorized into two types: library functions (predefined in standard libraries like printf(), scanf()) and user-defined functions (created by programmers to meet specific requirements).",

            "Function parameters can be passed by value (where copies of values are passed) or by reference (where addresses of variables are passed). Pass by reference allows functions to modify the original variables.",

            "The return statement is used to send a value back from a function to the calling code. Functions can return any data type, including void for functions that don't return any value.",

            "Function prototypes (declarations) are used to inform the compiler about a function's signature before it's defined, enabling functions to be called before their actual definition in the code.",

            "Recursion is a powerful technique where a function calls itself to solve problems that can be broken down into smaller, similar sub-problems. Proper base cases are essential to prevent infinite recursion.",

            "Functions help in avoiding code duplication, improving code organization, and enabling teamwork by allowing different programmers to work on different functions simultaneously.",

            "Scope rules determine the visibility of variables within functions. Local variables are accessible only within their function, while global variables can be accessed throughout the program.",

            "Storage classes (auto, register, static, extern) define the scope, lifetime, and storage location of variables used in functions, affecting how variables behave across function calls."
        ],
        question: [
            "Write a C program with a function to calculate the factorial of a number using recursion",
            "Write a C program with a function to swap two numbers using call by reference"
        ]
    },
    {
        id: "s20",
        parentId: "n10",
        text: "Variable Scope",
        link: [
            "https://youtu.be/ej-GOnj7mj0?si=WXr2X7UVaR8JIa36"
        ],
        isSubnode: true,
        compiler: true,
        content: [
            "Variable scope in C refers to the region of a program where a variable can be accessed and modified. Understanding scope is crucial for writing organized, maintainable code and avoiding naming conflicts.",

            "There are three main types of variable scope in C: local scope (block scope), global scope, and formal parameter scope. Local variables are declared inside functions or blocks and can only be accessed within that specific block of code.",

            "Global variables are declared outside all functions, typically at the top of the program, and can be accessed from any part of the code. While convenient, excessive use of global variables can make code harder to debug and maintain.",

            "Formal parameters have function scope and behave like local variables within the function. They are created when the function is called and destroyed when the function returns.",

            "The concept of scope is closely related to variable lifetime. Local variables have automatic storage duration and are created/destroyed with block execution, while global variables have static storage duration and exist for the entire program execution.",

            "C also supports static local variables that retain their value between function calls while maintaining local scope. The extern keyword allows accessing global variables from different files in a multi-file program.",

            "Proper understanding of variable scope helps in memory management, prevents unintended variable modifications, and enables better program organization through modular design and information hiding."
        ],
        question: [
            "Write a C program demonstrating local and global variables with the same name",
            "Create a program showing how static local variables maintain their value between function calls"
        ]
    }, {
        id: "s21",
        parentId: "n10",
        text: "Inbuilt Functions",
        link: [
            "https://youtu.be/OJvwk3pLK34?si=PLycYu6RcjoOpPJj"
        ],
        isSubnode: true,
        compiler: true,
        content: [
            "Inbuilt functions in C are pre-defined functions provided by the standard library that perform common tasks, saving programmers time and effort. These functions are organized into header files that need to be included in your program using #include directives.",

            "The stdio.h header provides input/output functions like printf() for output, scanf() for input, getchar() and putchar() for character I/O, and gets()/puts() for string handling. These functions form the basis of user interaction in C programs.",

            "The math.h library contains mathematical functions such as sqrt() for square roots, pow() for exponents, sin(), cos(), tan() for trigonometric operations, log() for logarithms, and ceil()/floor() for rounding operations. These are essential for scientific and engineering computations.",

            "String handling functions from string.h include strlen() for string length, strcpy() for copying strings, strcat() for concatenation, strcmp() for comparison, and strstr() for finding substrings. These functions simplify complex string manipulation tasks.",

            "The ctype.h library provides character classification functions like isalpha(), isdigit(), isupper(), islower() that check character types, and conversion functions like toupper() and tolower() that change character cases.",

            "stdlib.h offers utility functions including rand() for random number generation, malloc() and free() for dynamic memory management, atoi() and atof() for string-to-number conversions, and exit() for program termination.",

            "Understanding and using these inbuilt functions effectively is crucial for writing efficient and maintainable C code. They help avoid reinventing common solutions and ensure code reliability through well-tested library implementations."
        ],
        question: [
            "Write a C program that uses math.h functions to calculate the area and circumference of a circle",
            "Write a C program that takes a string input and uses string.h functions to count vowels and consonants"
        ]
    }, {
        id: "s22",
        parentId: "n2",
        text: "Preprocessor and Macro",
        link: [
            "https://www.youtube.com/watch?v=w3iXBUbq4NY"
        ],
        isSubnode: true,
        compiler: true,
        content: [
            "The C preprocessor is a powerful tool that processes source code before compilation, handling directives that begin with #. It performs text substitution and file inclusion, making programs more modular and maintainable.",

            "Macros are defined using #define directive and come in two types: object-like macros (simple substitutions) and function-like macros (that accept parameters). They help in creating constants and inline code expansion.",

            "Common preprocessor directives include #include for file inclusion, #define for macro definition, #undef for removing macro definitions, #ifdef/#ifndef for conditional compilation, and #pragma for compiler-specific instructions.",

            "Macros with parameters provide a way to create code templates. However, they require careful use of parentheses to avoid operator precedence issues and should avoid side effects in arguments.",

            "Conditional compilation allows including or excluding code based on conditions, enabling platform-specific code, feature toggles, and debugging code that can be disabled in production.",

            "The preprocessor also supports operators like # (stringizing) and ## (token pasting) for advanced macro manipulation and metaprogramming techniques.",

            "Preprocessor macros are different from functions - they perform text substitution without type checking and can lead to unexpected behavior if not used carefully.",

            "Header files typically use #ifndef or #pragma once to prevent multiple inclusion, ensuring definitions are included only once during compilation.",

            "Predefined macros like __FILE__, __LINE__, __DATE__, and __TIME__ provide useful information about the compilation environment and can be used for debugging and logging.",

            "While powerful, macros should be used judiciously as they can make code harder to debug and understand. Modern C programming often prefers const variables and inline functions over macros when possible."
        ],
        question: [
            "Write a C program that uses macros to find the maximum of two numbers",
            "Create a program that uses conditional compilation to include debug prints only when DEBUG mode is enabled"
        ]
    }, {
        id: "s23",
        parentId: "n11",
        position: {
            top: 2000,
            left: "29%"
        },
        text: "Basics of Pointers",
        link: [
            "https://youtu.be/2ybLD6_2gKM?si=iTiLueSw27cJIkwN"
        ],
        isSubnode: true,
        compiler: true,
        content: [
            "Pointers in C are variables that store memory addresses instead of actual values. They provide direct access to memory locations, enabling efficient manipulation of data and complex data structures.",
            "Every pointer has a data type that specifies what type of data it points to. For example, int* points to integers, while char* points to characters. This typing helps in proper memory allocation and dereferencing operations.",
            "The address-of operator (&) returns the memory address of a variable, while the dereference operator (*) accesses the value stored at a pointer's memory address. These two operators form the foundation of pointer operations.",
            "Pointers are crucial for dynamic memory allocation using functions like malloc(), calloc(), and free(). This allows programs to request memory during runtime rather than at compile time, providing flexibility in memory management.",
            "Pointer arithmetic enables efficient array traversal and manipulation. When you increment a pointer, it moves to the next memory location based on the size of the data type it points to, making array operations more efficient.",
            "Pointers can point to other pointers, creating multiple levels of indirection. This is useful for complex data structures like linked lists, trees, and handling multi-dimensional arrays efficiently.",
            "Understanding pointers is essential for working with strings, arrays, and structures in C. They enable functions to modify arguments passed to them (simulating pass-by-reference) and help in creating flexible, memory-efficient programs.",
            "Proper pointer handling requires careful memory management to avoid issues like memory leaks, dangling pointers, and segmentation faults. Always initialize pointers and free dynamically allocated memory when no longer needed."
        ],
        question: [
            "Write a C program to swap two numbers using pointers",
            "Write a C program to find the length of a string using pointers"
        ]
    }, {
        id: "s24",
        parentId: "n11",
        position: {
            top: 1930,
            left: "65%"
        },
        text: "Wild Pointers",
        link: [
            "https://www.youtube.com/watch?v=PAgnCAMY4t8"
        ],
        isSubnode: true,
        compiler: true,
        content: [
            "Wild pointers in C are uninitialized pointers that do not point to any valid memory location. These pointers contain garbage addresses and can cause serious program errors if dereferenced.",
            "When a pointer is declared but not initialized, it contains an arbitrary memory address from whatever data was previously in that memory location. This makes wild pointers unpredictable and dangerous to use.",
            "Dereferencing a wild pointer leads to undefined behavior - the program may crash, produce incorrect results, or behave erratically. This is because the pointer might be pointing to memory that doesn't exist, is protected, or contains important system data.",
            "Wild pointers commonly occur when: pointers are declared but not initialized, pointers are used after the memory they point to has been freed, or when pointers are not properly set to NULL after memory deallocation.",
            "To prevent wild pointers, always initialize pointers either to a valid memory address or to NULL. Using NULL pointers allows for safe checking before dereferencing, as dereferencing a NULL pointer will typically cause a segmentation fault that's easier to debug.",
            "Good programming practices include: initializing pointers when declared, setting pointers to NULL after freeing memory, and always checking if a pointer is NULL before attempting to dereference it.",
            "Tools like valgrind and address sanitizers can help detect wild pointer usage during development. These tools monitor memory access and can identify when uninitialized or invalid pointers are being used.",
            "Understanding wild pointers is crucial for writing safe and reliable C programs, as improper pointer handling is one of the most common sources of bugs and security vulnerabilities in C code."
        ],
        question: [
            "Write a C program that demonstrates the danger of using wild pointers by showing undefined behavior",
            "Write a C program that shows how to properly initialize and check pointers to avoid wild pointer issues"
        ]
    }, {
        id: "s25",
        parentId: "n11",
        position: {
            top: 2100,
            left: "28%"
        },
        text: "Dangling Pointers",
        link: [
            "https://www.youtube.com/watch?v=A2DSzujPz5k"
        ],
        isSubnode: true,
        compiler: true,
        content: [
            "Dangling pointers are pointers that point to memory locations that have been freed or deallocated. These pointers become invalid because the memory they reference is no longer allocated to the program, leading to undefined behavior if accessed.",

            "Dangling pointers typically occur in three scenarios: when a pointer points to a local variable that has gone out of scope, when memory is explicitly deallocated using free() but the pointer is not set to NULL, or when a pointer points to a memory block that has been reallocated or reused.",

            "Accessing dangling pointers can cause serious issues including program crashes, security vulnerabilities, and unpredictable behavior. The program may appear to work correctly sometimes but fail unpredictably, making dangling pointer bugs difficult to debug.",

            "To prevent dangling pointers, always set pointers to NULL after freeing memory, avoid returning pointers to local variables from functions, and be cautious when using pointers that may become invalid during program execution.",

            "Tools like valgrind and address sanitizers can help detect dangling pointer issues during development. Proper pointer management is crucial for writing safe and reliable C programs that handle memory correctly."
        ],
        question: [
            "Write a C program that demonstrates a dangling pointer scenario and explain how to fix it",
            "Create a program that shows how to properly handle pointers to avoid dangling pointer issues"
        ]
    },
    {
        id: "s26",
        parentId: "n11",
        position: {
            top: 2100,
            left: "68%"
        },
        text: "Pointer Arithmetic",
        link: [
            "https://www.youtube.com/watch?v=RhLSYjDXB4Q"
        ],
        isSubnode: true,
        compiler: true,
        content: [
            "Pointer arithmetic is a powerful feature in C that allows performing arithmetic operations on pointer variables. Unlike regular arithmetic, pointer arithmetic operates in units of the data type size rather than bytes.",

            "When you increment a pointer, it moves to the next memory location of its base type. For example, incrementing an int pointer (4 bytes) advances by 4 bytes, while a char pointer (1 byte) advances by 1 byte. This automatic scaling makes array traversal efficient and intuitive.",

            "The main arithmetic operations allowed on pointers are: increment (++), decrement (--), addition (+), subtraction (-), and comparison (==, !=, <, >, <=, >=). These operations enable efficient array manipulation and memory navigation.",

            "Pointer subtraction is particularly useful for finding the number of elements between two pointers. The result represents the number of elements rather than bytes, making it ideal for calculating array lengths or positions.",

            "Pointer arithmetic forms the foundation for array indexing. The expression array[i] is equivalent to *(array + i), demonstrating how array access is implemented through pointer arithmetic behind the scenes.",

            "This concept is crucial for dynamic memory management, string manipulation, and efficient data structure implementation. It allows programmers to write compact and optimized code for memory operations.",

            "Understanding pointer arithmetic is essential for working with arrays, strings, and complex data structures in C, as it provides low-level memory access while maintaining type safety through automatic scaling."
        ],
        question: [
            "Write a C program that uses pointer arithmetic to reverse a string without using array indexing",
            "Write a C program that demonstrates the difference between pointer addition and integer addition"
        ]
    }, {
        id: "s27",
        parentId: "n12",
        position: {
            top: 2180,
            left: "28%"
        },
        text: "Struct",
        link: [
            "https://youtu.be/e9OXqEPF-5M?si=LPyueCNnlxnQGgL4"
        ],
        isSubnode: true,
        compiler: true,
        content: [
            "Structures (struct) in C are user-defined data types that allow grouping of variables of different types under a single name. They provide a way to create complex data types that can represent real-world entities with multiple attributes.",

            "A structure is defined using the struct keyword followed by a structure name and a block containing member variables. Each member can be of any valid C data type, including other structures, arrays, or pointers.",

            "Structure variables are declared similarly to primitive data types. Members are accessed using the dot operator (.) for regular variables and the arrow operator (->) for pointer variables.",

            "Structures are particularly useful for organizing related data together. For example, a Student structure might contain name, roll number, and marks - keeping all student information in one organized unit.",

            "Structures can be passed to functions by value or by reference. When passed by value, a copy of the entire structure is made, while passing by reference (using pointers) is more memory-efficient for large structures.",

            "Arrays of structures allow storing multiple records of the same type. This is commonly used in database-like applications where you need to manage collections of similar entities.",

            "Structures support nesting, meaning a structure can contain other structures as members. This enables creating hierarchical data models that can represent complex relationships.",

            "The typedef keyword is often used with structures to create aliases for structure types, making the code more readable and eliminating the need to use the struct keyword repeatedly.",

            "Structures are fundamental for data organization in C and form the basis for more advanced concepts like linked lists, trees, and other data structures. They provide the building blocks for object-oriented programming concepts in C.",

            "Memory allocation for structures follows the same rules as other variables, but padding may be added by the compiler to ensure proper alignment, which can affect the total size of the structure."
        ],
        question: [
            "Create a structure to store student information (name, roll number, marks) and write a program to input and display data for 5 students",
            "Write a program to create a structure for complex numbers and implement functions for addition and multiplication of complex numbers"
        ]
    },
    {
        id: "s28",
        parentId: "n12",
        position: {
            top: 2250,
            left: "68%"
        },
        text: "Enum",
        link: [
            "https://youtu.be/-N212LgGqik?si=KrdhatkmWPi-AY6R"
        ],
        isSubnode: true,
        compiler: true,
        content: [
            "Enums (enumerations) in C are user-defined data types that consist of integral constants. They provide a way to assign names to numerical values, making code more readable and maintainable.",
            "Enums are defined using the enum keyword followed by the enum name and a list of possible values enclosed in curly braces. Each value in the enum is automatically assigned an integer value starting from 0 by default.",
            "Enum values can be explicitly assigned specific integer values. If a value is explicitly assigned, subsequent values continue incrementing from that assigned value.",
            "Enums are particularly useful for representing states, options, or modes in a program where a variable can only take one of a predefined set of values.",
            "Enum variables are stored as integers and can be used in arithmetic operations, comparisons, and switch statements just like regular integers.",
            "Using enums improves code readability by replacing magic numbers with meaningful names, and helps prevent errors by restricting variables to valid predefined values.",
            "Enums can be declared with or without a tag name, and multiple variables can be declared of the same enum type once the enum is defined.",
            "Enum types are compatible with integer types, and enum values can be implicitly converted to integers, but integers cannot be implicitly converted to enum types without casting."
        ],
        question: [
            "Write a C program that uses an enum to represent days of the week and prints the day based on user input",
            "Create a program that uses an enum to represent traffic light states (RED, YELLOW, GREEN) and simulates light changes"
        ]
    },
    {
        id: "s29",
        parentId: "n12",
        position: {
            top: 2300,
            left: "28%"
        },
        text: "Typedef",
        link: [
            "https://youtu.be/CI9dRTvzgqE"
        ],
        isSubnode: true,
        compiler: true,
        content: [
            "The typedef keyword in C is used to create aliases or alternative names for existing data types. It helps improve code readability and makes complex type declarations easier to understand and maintain.",

            "typedef allows programmers to create shorter or more meaningful names for data types. For example, 'typedef unsigned long ulong;' creates a new name 'ulong' for 'unsigned long', making the code more concise and readable.",

            "One of the most common uses of typedef is with structures. Instead of repeatedly writing 'struct Student', you can create a typedef like 'typedef struct Student Student;' and then use just 'Student' throughout the code.",

            "typedef is particularly useful with complex types like function pointers and array types. It can simplify declarations that would otherwise be difficult to read and understand.",

            "Unlike #define macros, typedef is interpreted by the compiler rather than the preprocessor. This means it provides proper type checking and follows scope rules like other C declarations.",

            "typedef declarations follow the pattern: 'typedef existing_type new_type_name;'. The new type name can then be used anywhere the original type could be used, providing complete compatibility.",

            "Using typedef extensively can make code more portable. If you need to change a data type throughout your program, you only need to modify the typedef declaration rather than every instance of the type.",

            "Typedef is essential when working with complex data structures like linked lists, trees, and other abstract data types where meaningful type names significantly improve code clarity."
        ],
        question: [
            "Write a C program that uses typedef to create an alias for a structure representing a point with x and y coordinates",
            "Create a typedef for a function pointer that takes two integers and returns an integer, then demonstrate its usage"
        ]
    }, {
        id: "s30",
        parentId: "n13",
        position: {
            top: 2450,
            left: "28%"
        },
        text: "Dynamic Memory Allocation",
        link: ["https://youtu.be/R0qIYWo8igs?si=NV6FjIkujn0q1Mnr"],
        isSubnode: true,
        compiler: true,
        content: [
            "Dynamic Memory Allocation in C allows programs to request memory from the heap at runtime, providing flexibility when the exact memory requirements are not known during compilation.",
            "The four main functions for dynamic memory allocation are: malloc(), calloc(), realloc(), and free(). malloc() allocates a specified number of bytes, calloc() allocates and initializes memory to zero, realloc() resizes previously allocated memory, and free() releases allocated memory back to the system.",
            "Unlike stack memory which is automatically managed, dynamically allocated memory must be explicitly managed by the programmer. Proper memory management is crucial to prevent memory leaks and ensure efficient resource utilization.",
            "malloc() returns a void pointer to the allocated memory block, which must be cast to the appropriate data type. If allocation fails, it returns NULL, so always check the return value before using the allocated memory.",
            "calloc() is particularly useful for allocating arrays as it automatically initializes all bytes to zero and calculates the total size based on the number of elements and element size.",
            "realloc() allows resizing previously allocated memory blocks. It can either expand the existing block or allocate a new block and copy existing data, making it essential for dynamic data structures.",
            "The free() function is used to release allocated memory when it is no longer needed. Forgetting to free memory leads to memory leaks, while freeing memory twice or accessing freed memory causes undefined behavior.",
            "Dynamic memory allocation is essential for creating data structures like linked lists, trees, and dynamic arrays that can grow and shrink during program execution based on runtime requirements.",
            "Always ensure that every malloc()/calloc() has a corresponding free() to prevent memory leaks. Use tools like valgrind to detect memory management issues during development."
        ],
        question: [
            "Write a C program to dynamically allocate an integer array of size N (user input) and find the sum of all elements",
            "Write a C program to create a dynamic string that concatenates two user-input strings using dynamic memory allocation"
        ]
    }, {
        id: "s31",
        parentId: "n14",
        position: {
            top: 2650,
            left: "28%"
        },
        text: "File Handling",
        link: [
            "https://youtu.be/ltGqiqZJ3aI?si=0Bw7coHfWIqzxD3e"
        ],
        isSubnode: true,
        compiler: true,
        content: [
            "File handling in C allows programs to store data permanently on storage devices and retrieve it when needed. This is essential for creating applications that need to save user data, configuration settings, or process large datasets.",

            "C provides a comprehensive set of functions in the stdio.h library for file operations. The FILE structure is used to represent a file stream, and file pointers are used to access and manipulate files.",

            "Files can be opened in different modes: read mode ('r') for reading existing files, write mode ('w') for creating new files or overwriting existing ones, append mode ('a') for adding to existing files, and binary modes ('rb', 'wb', 'ab') for non-text files.",

            "Basic file operations include opening files with fopen(), closing files with fclose(), reading data with functions like fgetc(), fgets(), and fscanf(), and writing data with fputc(), fputs(), and fprintf().",

            "Binary file handling allows working with any type of data including structures and arrays. Functions like fread() and fwrite() are used for reading and writing blocks of data efficiently.",

            "File positioning functions such as fseek(), ftell(), and rewind() allow random access to different parts of a file, enabling efficient data retrieval and manipulation.",

            "Error handling is crucial in file operations. Functions like feof() check for end-of-file, while ferror() detects errors during file operations, ensuring robust file handling code.",

            "File handling is fundamental for applications like database systems, log files, configuration files, and any program that needs persistent data storage across multiple executions."
        ],
        question: [
            "Write a C program to create a file and write user input text into it",
            "Write a C program to read numbers from a file and calculate their sum"
        ]
    }]