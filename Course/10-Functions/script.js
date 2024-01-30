"use strict";
//*FUNCTIONS RETURNING FUCNTIONS

const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

const greetWithHey = greet("Hey");
greetWithHey("Thomas");

greet("Hello")("John");

const greetArr = (greeting) => (name) => console.log(`${greeting} ${name}`);

greetArr("hey")("Jake");

//*THE CALL AN APPLY METHODS

const lufthansa = {
  airline: "Lufthansa",
  IataCode: "LH",
  bookings: [],
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.IataCode}${flightNum}`
    );
    this.bookings.push({
      flight: `${this.IataCode}${flightNum}`,
      passangerName: `${name}`,
    });
  },
};
lufthansa.book(239, "Jan Matyáš");
lufthansa.book(635, "John Smith");

console.log(lufthansa);

const eurowings = {
  airline: "Eurowings",
  IataCode: "EW",
  bookings: [],
};
const book = lufthansa.book;

// book(23, "SARAH williams"); does not work

book.call(eurowings, 23, "Sarah Williams");
console.log(eurowings);
book.call(lufthansa, 239, "Mary Cooper");
console.log(lufthansa);

const swiss = {
  airline: "Swiss Air Lines",
  IataCode: "SX",
  bookings: [],
};

book.call(swiss, 145, "Miranda Great");

//* APPLY METHOD
const flightData = [584, "Gerogre Cooper"];
book.apply(swiss, flightData); // not used anymore
book.call(swiss, ...flightData); //because we have the spread operator

//*THE BIND METHOD
// book.call(eurowings, 23, "Sarah Williams");
const bookEW = book.bind(eurowings);
const bookSX = book.bind(swiss);
const bookLH = book.apply(lufthansa);
bookEW(83, "Steven Williams");
console.log(eurowings);

const bookEW23 = book.bind(eurowings, 23);

bookEW23("Micheal Evans");
console.log(eurowings);

//* WITH EVENT LISTENERS
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};

// document
//   .querySelector(".buy")
//   .addEventListener("click", lufthansa.buyPlane.bind(lufthansa));

//*Partial application
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

const addVat = addTax.bind(null, 0.23); // bind 1st parameter is the "this" keyword, which does not mattere here and the first parameter of the fucntion si set to 0.23
console.log(addVat(200));

let addRateAndTax = function (rate) {
  return function (value) {
    console.log(value + value * rate);
  };
};

let addVater = addRateAndTax(0.1);
addVater(200);

///////////////////////////////////////
// Coding Challenge #1

/* 
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1". 
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀
*/
let promptOptions = [];
const poll = {
  question: "What is your favourite programming language?",
  options: ["0: Javascript", "1: Python", "2: Rust", "3: C++"],
  answers: new Array(4).fill(0),
  registerNewAnswer() {
    if (promptOptions.length <= 0) {
      for (let index = 0; index < poll.options.length; index++) {
        promptOptions = promptOptions + poll.options[index] + `\n`;
      }
    }
    let answer = Number(prompt(`${poll.question} \n${promptOptions}`));
    console.log(answer);
    if (isNaN(answer)) {
      alert("This is not a number");
    } else if (answer >= 0 && answer < this.options.length) {
      poll.answers[answer]++;
      console.log(poll.answers);
    } else {
      ("");
      alert("Number is too big");
    }
  },
};

document
  .querySelector(".poll")
  .addEventListener("click", poll.registerNewAnswer.bind(poll));
console.log(poll);
