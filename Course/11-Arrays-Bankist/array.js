let arr = ['a', 'b', 'c', 'd', 'e'];
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);
//Slice(start index, end index ) returns a new array, negative start index start form the end
console.log(arr.slice(2, 4));
console.log(arr.slice(-2, 4));
console.log(arr.slice(-2, 4));
console.log(arr.slice(-2, -1));
console.log([...arr]);
arr.splice(-1);
console.log(arr);

//Reverse mutates the original array
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());

//Concat
const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]);

//Join
console.log(letters.join(' - '));
const arr1 = [23, 11, 64];
console.log(arr1[arr.length - 1]);
console.log(arr1.slice(-1)[0]);
console.log(arr1.at(-1));
// FOR OF VS FOREACH
console.log('---FOROF---');
for (const movement of movements)
  for (const [i, movement] of movements.entries()) {
    if (movement > 0) {
      console.log(`your movement Number ${i + 1} of ${movement}$`);
    } else {
      console.log(`You movement number ${i + 1} of ${Math.abs(movement)}$`);
    }
  }
console.log('---FOREACH---');
movements.forEach((mov, i, arr) => {
  if (mov > 0) {
    console.log(`your movement Number ${i + 1} of ${mov}$`);
  } else {
    console.log(`You movement number ${i + 1} of ${Math.abs(mov)}$`);
  }
});
// Map
currencies.forEach((value, key, map) => console.log(`${key} ${value}`));
// Set;
const currenciesUniqe = new Set(['GBP', 'USD', 'EUR', 'GBP', 'USD']);
console.log(currenciesUniqe);
currenciesUniqe.forEach(
  (
    value,
    key,
    map // key and value are the same
  ) => console.log(`${key} ${value} ${map}`)
);

// Map
//Convert Eur to US dollar
const eurTousd = 1.1;
const movemetsUSD = movements.map(mov => mov * eurTousd);

// const movementsUSDfor = [];
// for (const mov of movements) movementsUSDfor.push(mov * eurTousd);
// console.log(movementsUSDfor);

const movementsDescriptions = movements.map((mov, i) => {
  let transactionOp = mov > 0 ? 'deposited' : 'withdrew';
  return `Movement ${i + 1} you ${transactionOp} ${transactionOp === 'deposited' ? mov : Math.abs(mov)}$`;
});
// Filter
const deposits = movements.filter(mov => mov > 0);
const withdrawals = movements.filter(mov => mov < 0);

// Reduce
// accumultare -> snowball
const balance = movements.reduce((acc, cur, i, arr) => {
  console.log(`Iteration${i}: ${acc}`);
  return acc + cur;
}, 0);
console.log(balance);
