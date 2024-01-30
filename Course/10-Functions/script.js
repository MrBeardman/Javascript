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
  console.log(planes);
};
