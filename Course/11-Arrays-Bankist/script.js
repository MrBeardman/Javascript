'use strict';

// let arr = ['a', 'b', 'c', 'd', 'e'];

// //Slice(start index, end index ) returns a new array, negative start index start form the end
// console.log(arr.slice(2, 4));
// console.log(arr.slice(-2, 4));
// console.log(arr.slice(-2, 4));
// console.log(arr.slice(-2, -1));
// console.log([...arr]);
// arr.splice(-1);
// console.log(arr);

// //Reverse mutates the original array
// const arr2 = ['j', 'i', 'h', 'g', 'f'];
// console.log(arr2.reverse());

// //Concat
// const letters = arr.concat(arr2);
// console.log(letters);
// console.log([...arr, ...arr2]);

// //Join
// console.log(letters.join(' - '));
// const arr = [23, 11, 64];
// console.log(arr[arr.length - 1]);
// console.log(arr.slice(-1)[0]);
// console.log(arr.at(-1));
// FOR OF VS FOREACH
// console.log('---FOROF---');
// for (const movement of movements)
// for (const [i, movement] of movements.entries()) {
//   if (movement > 0) {
//     console.log(`your movement Number ${i + 1} of ${movement}$`);
//   } else {
//     console.log(`You movement number ${i + 1} of ${Math.abs(movement)}$`);
//   }
// }
// console.log('---FOREACH---');
// movements.forEach((mov, i, arr) => {
//   if (mov > 0) {
//     console.log(`your movement Number ${i + 1} of ${mov}$`);
//   } else {
//     console.log(`You movement number ${i + 1} of ${Math.abs(mov)}$`);
//   }
// });
//Map
// currencies.forEach((value, key, map) => console.log(`${key} ${value}`));
//Set
// const currenciesUniqe = new Set(['GBP', 'USD', 'EUR', 'GBP', 'USD']);
// console.log(currenciesUniqe);
// currenciesUniqe.forEach(
//   (
//     value,
//     key,
//     map // key and value are the same
//   ) => console.log(`${key} ${value} ${map}`)
// );

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
