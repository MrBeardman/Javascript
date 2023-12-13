"use strict";

//* Data needed for a later exercise
const flights =
  "_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30";

//* Data needed for first part of the section
const restaurant = {
  name: "Classico Italiano",
  location: "Via Angelo Tavanti 23, Firenze, Italy",
  categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
  mainMenu: ["Pizza", "Pasta", "Risotto"],
  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
      kindaOpen: 5,
    },
  },
  orderPizza(mainIngredient, ...otherIngredients) {
    console.log(mainIngredient, otherIngredients);
  },
};

//* Continu of the REST elements

const [a, b, ...others] = [1, 2, 3, 4, 5];

console.log(a, b, others); //1 2 [3,4,5]

//Objects
const { sat, ...weekdays } = restaurant.openingHours;
console.log(sat, weekdays); // {open:0, close 24}{ thu: {Open:12, close :22} {fr:{ open:12, close 22} }}

//*Functions

const add = function (...numbers) {
  //Adding the numbers into an array of parameters
  console.log(numbers); // [2,3], [5,3,7,2] etc
  let sum = 0;
  for (let index = 0; index < numbers.length; index++) {
    sum += numbers[index];
    console.log(sum);
  }
};
add(2, 3);
add(5, 3, 7, 2);
add(5, 3, 5, 8, 9, 6, 7, 4, 1, 5);

const x = [23, 5, 7];

add(...x); //Spreading the x array to separate values
restaurant.orderPizza("Tomato", "Salami", "Cheese", "Schrooms");
restaurant.orderPizza("muschrooms");

//* && and || and Shortcircuting
//Logical operator can USE ANY DATA TYPE AND RETURN ANY DATA TYPE
//Short-circuting
//Use to set default values
// || returns the FIRST TRUTHY VALUE or the LAST ONE if all are FALSY
console.log(3 || "Jonas"); //3,
console.log("", "Jonas"); //'Jonas', empty string is falsy value
console.log(true || 0); // true
console.log(undefined || null); //null because undefined is falsy
//'Hello',because its the first truthy value, so it shortcircuits the operation and the evaluation does not go on

// const guests1 = restaurant.numbGuests ? restaurant.numbGuests : 10; //Check if the value exists and if not set it to 10
// console.log(guests1); //10

// restaurant.numbGuests = 23;
// const guests2 = restaurant.numbGuests || 10;
// console.log(guests2); //23 Initial value is truthy so short circuits and does not go to the 2nd value, does not work if number of guests is 0

//The End oeprator works in the exact opposite way than the OR oeprator
// && will return the FIRST FALSY VALUE or the lats one if all of them are TRUTHY
//Use to check if first value is true and execute the other operand
console.log(0 && "Jonas"); // 0
console.log(7 && "Jonas"); //Jonas
console.log("Hello" && 23 && null && "Jonas"); //null Ends on the first falsy, because there is no point in co

// Practical example
if (restaurant.orderPizza) {
  restaurant.orderPizza("muschrooms", "spinach");
}

restaurant.orderPizza && restaurant.orderPizza("muschrooms", "spinach");

//The NULLISH COALESCING OPERATOR
// works with nullish, not falsy values = null, undefined (NOT 0 or '')
restaurant.numbGuests = 0;

const guests2 = restaurant.numbGuests || 10;
console.log(guests2); //10

const guestCorrect = restaurant.numbGuests ?? 10; //Restaurant.numGuests would have to bee null or undefined in orde to be set to 10
console.log(guestCorrect); //0

//LOGICAL ASSIGMENT OPERATORS
const rest1 = {
  name: "Capri",
  numbGuests: 20,
};
const rest2 = {
  name: "La Piazza",
  owner: "Giovanni Rossi",
};

const rest3 = {
  name: "Capri",
  numbGuests: 0,
};

// OR assigment operator
//Assigns value to an variable if the currect value is falsy
rest1.numbGuests = rest1.numbGuests || 10;
console.log(rest1);
rest2.numbGuests = rest2.numbGuests || 10;
console.log(rest2);

rest1.numbGuests ||= 10; // same as  rest1.numbGuests = rest1.numbGuests || 10;
rest2.numbGuests ||= 10; // same as  rest2.numbGuests = rest2.numbGuests || 10;
rest3.numbGuests ||= 10;
console.log(rest3.numbGuests);
rest3.numbGuests ??= 10; // would leave it at 0
console.log(rest3.numbGuests);
//if owner exists, rename him to <ANONYMOUS>
rest1.owner &&= "<ANONYMOUS>";
rest2.owner &&= "<ANONYMOUS>";
console.log(rest1, rest2);

//* CONTINUE THE OPTIONAL CHAINING (?.)

//Normal example
if (restaurant.openingHours && restaurant.openingHours.mon)
  console.log(restaurant.openingHours.mon);

//Now with optional chaining
console.log(restaurant.openingHours.mon?.open); //Only if the property before ? exist(not null or undefined) then the parameter after it is read, currently .open Otherwise returns undefined imedietly
console.log(restaurant.openingHours?.mon?.open); // Checks for opening hours && mon at the same time

const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

for (const day of days) {
  console.log(day);
  const open = restaurant.openingHours[day]?.open ?? "closed"; //.openinghours.mon, tue, wed etc, and if that parameter has .open
  console.log(`On ${day} we open at ${open}`);
}

//OPTIONAL CHAINING FOR METHODS
console.log(restaurant.orderPizza?.("Orange") ?? "method does not exist");
restaurant.orderPizza(1, 2, 3);
//OPTIONAL CHAINING FOR ARRAYS

const users = [{ name: "John", email: "email" }, 5, "KOkotko"];

console.log(users[0]?.name ?? "USER ARRAY EMPTY"); //Check if array position has parameter .name, if its nullish write "USER ARRAY EMPTY"

//LOOPING OBJECTS KEYS, VAKUES AND ENTRIES

// property names /Keys

const properties = Object.keys(restaurant.openingHours);
console.log(properties);

let openDaysStr = `We are open on ${properties.length} days: `;
console.log(openDaysStr);

for (const day of properties) {
  openDaysStr += `${day}, `;
}
console.log(openDaysStr);

//Property Values
const values = Object.values(restaurant.openingHours);
console.log(values);

// Property Entries ( Keys + values ) together
const entries = Object.entries(restaurant.openingHours);
console.log(entries);
//Whole entry
for (const x of entries) {
  console.log(x[1]?.kindaOpen ?? "closed");
}
//Key and value entry
for (const [key, value] of entries) {
  console.log(`On ${key} we open at ${value.open} and close on ${value.close}`);
}
//key and then each parameter of value further deconstructed
for (const [key, { open, close }] of entries) {
  console.log(`On ${key} we open at ${open} and close on ${close}`);
}

//CODING CHALLENGE 2
/* 
Let's continue with our football betting app!

1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
      Odd of victory Bayern Munich: 1.33
      Odd of draw: 3.25
      Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉

BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
      {
        Gnarby: 1,
        Hummels: 1,
        Lewandowski: 2
      }

GOOD LUCK 😀
*/
const game = {
  team1: "Bayern Munich",
  team2: "Borrussia Dortmund",
  players: [
    [
      "Neuer",
      "Pavard",
      "Martinez",
      "Alaba",
      "Davies",
      "Kimmich",
      "Goretzka",
      "Coman",
      "Muller",
      "Gnarby",
      "Lewandowski",
    ],
    [
      "Burki",
      "Schulz",
      "Hummels",
      "Akanji",
      "Hakimi",
      "Weigl",
      "Witsel",
      "Hazard",
      "Brandt",
      "Sancho",
      "Gotze",
    ],
  ],
  score: "4:0",
  scored: ["Lewandowski", "Gnarby", "Lewandowski", "Hummels"],
  date: "Nov 9th, 2037",
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};
//1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")

for (const [goal, player] of game.scored.entries()) {
  console.log(`Goal ${goal + 1}: ${player}`);
}

//2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)

let total = 0;
for (const [key, value] of Object.entries(game.odds)) {
  let keys = Object.entries(game.odds);
  total += value;
  const average = total / keys.length;
  console.log(average);
}
//3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
//       Odd of victory Bayern Munich: 1.33
//       Odd of draw: 3.25
//       Odd of victory Borrussia Dortmund: 6.5
// Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉
for (const [key, value] of Object.entries(game.odds)) {
  console.log(
    `Odd of ${game[key] ? "victory" : "draw:"} ${
      game[key] ? game[key] + ":" : ""
    } ${value}`
  );
}
// BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
// {
//   Gnarby: 1,
//   Hummels: 1,
//   Lewandowski: 2
// }
let [scorers, { player, goal }] = [
  Object.entries(game.scored),
  Object.entries(game.odds),
];
console.log(scorers);
//SETS
//NO DUPLICATES ALLOWED

const ordersSet = new Set([
  "Pasta",
  "Pizza",
  "Pizza",
  "Rissotto",
  "Pasta",
  "Pizza",
]);

console.log(ordersSet); // {"Pasta", "Pizza", "Rissoto"}
console.log(new Set("Jonas"));
console.log(ordersSet.size);
console.log(ordersSet);
console.log(ordersSet.has("Pizza"));
ordersSet.add("Garlic Bread");
ordersSet.add("Garlic Bread");
ordersSet.delete("Rissotto");
console.log(ordersSet);
console.log(ordersSet[0]); //undefined, all data is uniqe and data does not matter
ordersSet;
//ordersSet.clear()
console.log(ordersSet);

//Example
const staff = ["Waiter", "Chef", "Waiter", "Manager", "Chef", "Waiter"];
console.log(staff);
const staffUniqe = [...new Set(staff)];
const staffUniqeSet = new Set(staff);
console.log(staffUniqeSet);
console.log(staffUniqe);
console.log(staffUniqeSet.size);

//MAPS
//Data structure to map keys to values
//In object, keys are strings
//In Map Key can have any type, like Objects, or other Maps

const rest = new Map();
rest.set("name", "Classico Italiano"); //Set the Key and Value
console.log(rest);
console.log(rest.set(1, "Firenze, Italy")); //Set Updates and RETURNS the map
rest.set(2, "Lisbon, Portugal");
rest
  .set("categories", ["Italian", "Pizzeria", "Vegetarian", "Organic"])
  .set("open", 11)
  .set("close", 23)
  .set(true, "we are open")
  .set(false, "we are closed");
console.log(rest);
console.log(rest.get(1));
console.log(rest.get(true));

const time = 21;

console.log(rest.get(time > rest.get("open") && time < rest.get("close")));
console.log(rest.get("o" + "p" + "e" + "n"));

console.log(rest.has("categories"));
rest.delete(2);
rest;
console.log(rest.size);
//rest.clear()

rest.set([1, 2, 3, 4], "test");
console.log(rest);

console.log(rest.get([1, 2, 3, 4])); //undefined these arrays are not the same object in the HEAP, the key is exactly the object in memory. we would have to save it in memory
const arr = [1, 2, 3, 4];
rest.set(arr, "test");
console.log(rest.get(arr));
// "test"
//MAP ITERATION

const question = new Map([
  ["question", "What is the best programing language in the world?"],
  [1, "c"],
  [2, "Java"],
  [3, "Javacript"],
  ["correct", 3],
  [true, "Correct 🎉"],
  [false, "try again! 🛑"],
]);
//SAME structure as calling Object.entries()
console.log(question.get("question"));
const answer = 3;
//const answer = Number(prompt("Your answer"));
// let response = "";
// for (const [key, value] of question) {
//   if (typeof key === "number") {
//     console.log(`Answer ${key}: ${value}`);
//   }
//   if ((response = question.get("correct") === answer)) {
//     console.log(`Answer ${key}: ${value} is ${question.get(response)}`);
//   }
// }

//Convert Map to an array
console.log([...question]);

//Which data to use
