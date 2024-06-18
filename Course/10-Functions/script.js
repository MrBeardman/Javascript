'use strict';

//*interaction with diferenet fucnions with the same object
const bookings = [];
// const createBooking = function (
//   flightNum = 'XX000',
//   numPassengers = 1,
//   price = 199 * numPassengers
// ) {
//   ES5
//    numPassengers = numPassengers || 1;
//   price = price || 1;
//   const booking = {
//     flightNum,
//     numPassengers,
//     price,
//   };
//   console.log(booking);
//   bookings.push(booking);
// };

// createBooking('LH123');
// createBooking('LH123', 2, 800);
// createBooking('AK456', undefined, 5);

// const flight = 'LH123';
// const john = {
//   name: 'Jan Matyas',
//   passport: 234524234235,
// };

// const checkIn = function (flightNum, passegner) {
//   flightNum = 'LH999';
//   passegner.name = 'Mr. ' + passegner.name;
//   if (passegner.passport === 234524234235) {
//     alert('Checked in');
//   } else {
//     alert('Wrong Passport!');
//   }
// };

// checkIn(flight, john);

// console.log(flight);
// console.log(john);

// const newPassport = function (person) {
//   person.passport = Math.trunc(Math.random() * 100000000);
// };
// newPassport(john);
// checkIn(flight, john);
//*FIRST CLASS VS HIGH-ORDER FUNCTIONS
//First class funcions means that fucnions are treated as values language wide, its only a CONCEPT
//Higher order funcions recives another function as an argument and returns a new fucnions or both

const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};
//Higher order funcions
const transformer = function (str, fn) {
  console.log(`The original string: ${str}`);
  console.log(`tranformed string: ${fn(str)}`);

  console.log(`Transformed by: ${fn.name}`);
};
// a callback function
transformer('Javasrcipt is the best!', upperFirstWord);
transformer('Javasrcipt is the best!', oneWord);

const camelCases = function (str) {
  const split = str.split(' ');
  console.log(split);
  for (const [firstLetter, ...others] of Object.values(split)) {
    console.log(firstLetter, others);
  }
};

camelCases('this word will have every first letter uppercased');

//*FUNCTIONS RETURNING FUNCIONS

const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

const greetHey = greet('Hey');
greetHey('Jonas');
//*FUNCTIONS RETURNING FUCNTIONS

const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

const greetWithHey = greet('Hey');
greetWithHey('Thomas');

greet('Hello')('John');

const greetArr = greeting => name => console.log(`${greeting} ${name}`);

greetArr('hey')('Jake');

//*THE CALL AN APPLY METHODS

const lufthansa = {
  airline: 'Lufthansa',
  IataCode: 'LH',
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
lufthansa.book(239, 'Jan Matyáš');
lufthansa.book(635, 'John Smith');

console.log(lufthansa);

const eurowings = {
  airline: 'Eurowings',
  IataCode: 'EW',
  bookings: [],
};
const book = lufthansa.book;

// book(23, "SARAH williams"); does not work

book.call(eurowings, 23, 'Sarah Williams');
console.log(eurowings);
book.call(lufthansa, 239, 'Mary Cooper');
console.log(lufthansa);

const swiss = {
  airline: 'Swiss Air Lines',
  IataCode: 'SX',
  bookings: [],
};

book.call(swiss, 145, 'Miranda Great');

//* APPLY METHOD
const flightData = [584, 'Gerogre Cooper'];
book.apply(swiss, flightData); // not used anymore
book.call(swiss, ...flightData); //because we have the spread operator

//*THE BIND METHOD
// book.call(eurowings, 23, "Sarah Williams");
const bookEW = book.bind(eurowings);
const bookSX = book.bind(swiss);
const bookLH = book.apply(lufthansa);
bookEW(83, 'Steven Williams');
console.log(eurowings);

const bookEW23 = book.bind(eurowings, 23);

bookEW23('Micheal Evans');
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
  question: 'What is your favourite programming language?',
  options: ['0: Javascript', '1: Python', '2: Rust', '3: C++'],
  answers: new Array(4).fill(0),
  registerNewAnswer() {
    let answer = Number(
      prompt(
        `${this.question} \n${this.options.join('\n')} \n(Write otpion numer)`
      )
    );
    console.log(answer);
    if (isNaN(answer)) {
      alert('This is not a number');
    } else if (answer >= 0 && answer < this.options.length) {
      poll.answers[answer]++;
      console.log(this.answers);
    } else {
      ('');
      alert('Number is too big');
    }
    this.displayResults();
    this.displayResults('string');
  },
  displayResults(type = 'array') {
    if (type === 'array') {
      console.log(this.answers);
    } else if (type === 'string') {
      console.log(`Poll resutls are: ${this.answers.join(', ')}`);
    }
  },
};

// document
//   .querySelector(".poll")
//   .addEventListener("click", poll.registerNewAnswer.bind(poll));

poll.displayResults.call({ answers: [5, 2, 3] }, 'string');

// [5, 2, 3]
// [1, 5, 3, 9, 6, 1]

//*IMIDIETLY INVOKED FUNCTION EXPRESSIONS(IIFE)

const runOnce = function () {
  console.log('Tis will run once');
};
runOnce();
//IIFE
(function () {
  console.log('Tis will run once');
})();

//Works for arrow fucnions
(() => console.log('Tis will run once'))();

{
  const isPriave = 23;
  var notPrivate = 'Hey Pussy';
}
//console.log(isPriave); //?Variable is not defined
console.log(notPrivate);

//*CLOSURES

const secureBooking = function () {
  let passageCount = 0;
  return function () {
    passageCount++;
    console.log(`${passageCount} passengers`);
  };
};
const booker = secureBooking();
booker();
booker();
booker();

//Example 1

let f;

const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};
g(); //nothing
f(); //46 can access the "a" variable

//Re-assigning the f fucnion
h(); //nothing
f(); // 1554

// Example 2
const boardPassengers = function (n, wait) {
  const perGroup = n / 3;
  setTimeout(function () {
    console.log(`we are now boarding all ${n} passengers`);
    console.log(`There are 3 groups, each with ${perGroup} passengers`);
  }, wait * 1000);
  console.log(`will start boarding in ${wait} seconds`);
};
const perGroup = 1000; // will be used if the perGroup in the fucntion woudl not exist
boardPassengers(180, 3);

///////////////////////////////////////
// Coding Challenge #2

/* 
This is more of a thinking challenge than a coding challenge 🤓

Take the IIFE below and at the end of the function, attach an event listener that changes the color of the selected h1 element ('header') to blue, each time the BODY element is clicked. Do NOT select the h1 element again!

And now explain to YOURSELF (or someone around you) WHY this worked! Take all the time you need. Think about WHEN exactly the callback function is executed, and what that means for the variables involved in this example.

GOOD LUCK 😀
*/

(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';
  document.body.addEventListener('click', function () {
    header.style.color = 'blue';
  });
})();
