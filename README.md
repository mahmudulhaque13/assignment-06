1. What is the difference between var, let, and const?

answer : var: Function-scoped or globally scoped. Can be redeclared and updated. Hoisted to the top of its scope.

        let: Block-scoped. Can be updated but not redeclared within the same block. Hoisted but not initialized, will throw an error if accessed before declaration

        const: Block-scoped. Cannot be updated or redeclared. Must be initialized at the time of declaration. For objects and arrays, the reference cannot be changed, but the properties or elements can be modified.

2. What is the difference between map(), forEach(), and filter()?

answer : map(): Returns a new array with transformed elements.

          foEach(): Executes a provided function once for each array element. Does not return anything.

          filter(): Returns a new array with elements that satisfy a condition (true/false).

3. What are arrow functions in ES6?

answer : Arrow functions are a shorter syntax for writing functions.

         example- const add = (a, b) => a + b;

4. How does destructuring assignment work in ES6?

answer : Destructuring allows extracting values from arrays or objects into variables.Makes code cleaner and avoids repetitive property access.

5. Explain template literals in ES6. How are they different from string concatenation?

answer : Template literals are string literals that allow embedded expressions. They are enclosed by backticks (`) instead of single or double quotes. it can embed variables and expressions using ${}.

Template literals allow for multi-line strings and easier embedding of expressions, making them more readable compared to traditional string concatenation using the + operator.
Template literals are easier to read, write, and maintain compared to string concatenation.
